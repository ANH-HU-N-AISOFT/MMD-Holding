import i18n from 'i18next';
import Languagedetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Languagedetector)
  .use(HttpApi)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ns: [
      'auth',
      'common',
      'components',
      'enum',
      'page404',
      'page403',
      'page500',
      'dashboard_layout',
      'department',
      'error_message',
      'location',
      'employee',
      'student',
      'appointment',
      'course',
      'course_roadmap',
      'course_combo',
      'discount',
      'consultant_form',
    ],
    supportedLngs: ['en'],
    fallbackNS: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });
