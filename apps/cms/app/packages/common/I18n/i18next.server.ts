import { createCookie } from '@remix-run/node';
import Backend from 'i18next-fs-backend';
import { RemixI18Next } from 'remix-i18next';
import { resolve } from 'node:path';
import { KeyOfI18nInCookie, KeyOfI18nInSearchParams } from './constants';
import { i18nConfigure } from './i18nConfigure';

export const i18nCookie = createCookie(KeyOfI18nInCookie, {
  sameSite: 'lax',
  path: '/',
});

export const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18nConfigure.supportedLngs,
    fallbackLanguage: i18nConfigure.fallbackLng,
    cookie: i18nCookie,
    order: ['searchParams', 'cookie'],
    searchParamKey: KeyOfI18nInSearchParams,
  },

  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18nConfigure,
    ns: ['error-message', 'common'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
    },
  },
  // The backend you want to use to load the translations
  // Tip: You could pass `resources` to the `i18next` configuration and avoid
  // a backend here
  backend: Backend,
});
