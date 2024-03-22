import { cssBundleHref } from '@remix-run/css-bundle';
import { LinksFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate,
  useNavigation,
  useRouteError,
  useSearchParams,
} from '@remix-run/react';
import classNames from 'classnames';
import { keys, pick } from 'ramda';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FixedProgressLoader, useDeepCompareEffect } from 'reactjs';
import { useChangeLanguage } from 'remix-i18next';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import antdCss from './css/antd.min.css';
import resetCss from './css/reset.css';
import tailwindCss from './css/tailwind.css';
import { usePrevious } from './hooks/usePrevious';
import { authSessionStorage } from './packages/common/Auth/auth.server';
import { KeyOfI18nInSearchParams } from './packages/common/I18n/constants';
import { i18nCookie, i18next } from './packages/common/I18n/i18next.server';
import { fetchApiClient } from './utils/functions/fetchApi/fetchApi.client';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindCss },
  { rel: 'stylesheet', href: antdCss },
  { rel: 'stylesheet', href: resetCss },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),

  // Font
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
];

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  useEffect(() => {
    navigate('/500');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await authSessionStorage.getSession(request);
  const locale = await i18next.getLocale(request);
  const publicEnv = keys(pick(['PUBLIC_DEFAULT_LANGUAGE'], process.env)).reduce<Record<string, string>>(
    (result, item) => {
      const value = process.env[item];
      if (value) {
        return {
          ...result,
          [item]: value,
        };
      }
      return result;
    },
    {},
  );

  return json(
    {
      session,
      locale,
      env: publicEnv,
    },
    { headers: { 'Set-Cookie': await i18nCookie.serialize(locale) } },
  );
}
export const handle = {
  i18n: [
    // common
    'common',
    'error-message',
    'auth',
    'components',
    'page403',
    'page404',
    'page500',
    'dashboard_layout',

    // specific
  ],
};

export const meta: MetaFunction = () => {
  return [
    {
      charset: 'utf-8',
      title: 'CMS',
      viewport: 'width=device-width,initial-scale=1',
    },
  ];
};

const App: FC = () => {
  const navigation = useNavigation();
  const prevFormAction = usePrevious(navigation);
  const { locale, env, session } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const [currentUrlSearchParams] = useSearchParams();

  useDeepCompareEffect(() => {
    fetchApiClient.setAccessToken = () => {
      return session.data.sessionData?.token.accessToken ?? '';
    };
    fetchApiClient.setRefreshToken = () => {
      return session.data.sessionData?.token.refreshToken ?? '';
    };
  }, [session]);

  useChangeLanguage(locale);

  useEffect(() => {
    const isI18nParams = currentUrlSearchParams.get(KeyOfI18nInSearchParams);
    if (isI18nParams) {
      currentUrlSearchParams.delete(KeyOfI18nInSearchParams);
      updateURLSearchParamsOfBrowserWithoutNavigation(currentUrlSearchParams);
    }
  }, [currentUrlSearchParams]);

  return (
    <html lang={i18n.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {/* FIXME: Thẻ script làm hydrate server & client khác nhau */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)}`,
          }}
        />
      </head>
      <body className="min-w-[768px]">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <FixedProgressLoader
          containerClassName={classNames({
            '!hidden': !!prevFormAction?.formAction || !!navigation.formAction,
          })}
          done={navigation.state === 'idle'}
        />
      </body>
    </html>
  );
};

export default App;
