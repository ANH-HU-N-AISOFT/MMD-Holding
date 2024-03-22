import { getPublicEnv } from '~/utils/enviroment/getPublicEnv';

export const i18nConfigure = {
  ns: ['error-message', 'common'],
  // This is the list of languages your application supports
  supportedLngs: ['en'],
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: getPublicEnv('PUBLIC_DEFAULT_LANGUAGE') ?? 'en',
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: 'common',
  // Disabling suspense is recommended
  react: { useSuspense: false },
  interpolation: {
    escapeValue: false,
  },
  lng: getPublicEnv('PUBLIC_DEFAULT_LANGUAGE'),
};
