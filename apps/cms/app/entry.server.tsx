import { createReadableStreamFromReadable } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { createInstance } from 'i18next';
import Backend from 'i18next-fs-backend';
import isbot from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { resolve } from 'node:path';
import { PassThrough } from 'node:stream';
import { i18nConfigure } from './packages/common/I18n/i18nConfigure';
import { i18next } from './packages/common/I18n/i18next.server';
import { getPublicEnv } from './utils/enviroment/getPublicEnv';
import type { AppLoadContext, EntryContext } from '@remix-run/node';

const ABORT_DELAY = 5_000;

const handleBotRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) => {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
};

const handleBrowserRequest = async (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  callbackName: string,
) => {
  const i18nInstance = createInstance();
  const lng = getPublicEnv('PUBLIC_DEFAULT_LANGUAGE') ?? (await i18next.getLocale(request));
  const ns = i18next.getRouteNamespaces(remixContext);
  await i18nInstance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18nConfigure,
      lng,
      ns,
      backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') },
    });
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const didError = false;
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18nInstance}>
        <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />
      </I18nextProvider>,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set('Content-Type', 'text/html');
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
};

const handleRequest = async (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext,
) => {
  const callbackName = isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady';

  return isbot(request.headers.get('user-agent'))
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext, callbackName);
};

export default handleRequest;
