import 'i18next';
import type auth from 'public/locales/en/auth.json';
import type common from 'public/locales/en/common.json';
import type components from 'public/locales/en/components.json';
import type courses from 'public/locales/en/courses.json';
import type dashboard_layout from 'public/locales/en/dashboard_layout.json';
import type page403 from 'public/locales/en/page403.json';
import type page404 from 'public/locales/en/page404.json';
import type page500 from 'public/locales/en/page500.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      auth: typeof auth;
      common: typeof common;
      components: typeof components;
      courses: typeof courses;
      page404: typeof page404;
      page403: typeof page403;
      page500: typeof page500;
      dashboard_layout: typeof dashboard_layout;
    };
  }
}
