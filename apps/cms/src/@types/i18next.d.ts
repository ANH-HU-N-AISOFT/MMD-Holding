import 'i18next';
import type auth from 'public/locales/en/auth.json';
import type common from 'public/locales/en/common.json';
import type components from 'public/locales/en/components.json';
import type customer_management from 'public/locales/en/customer_management.json';
import type dashboard_layout from 'public/locales/en/dashboard_layout.json';
import type department from 'public/locales/en/department.json';
import type employee from 'public/locales/en/employee.json';
import type enum_ from 'public/locales/en/enum.json';
import type error_message from 'public/locales/en/error_message.json';
import type location from 'public/locales/en/location.json';
import type page403 from 'public/locales/en/page403.json';
import type page404 from 'public/locales/en/page404.json';
import type page500 from 'public/locales/en/page500.json';
import type student from 'public/locales/en/student.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      auth: typeof auth;
      common: typeof common;
      components: typeof components;
      enum: typeof enum_;
      page404: typeof page404;
      page403: typeof page403;
      page500: typeof page500;
      dashboard_layout: typeof dashboard_layout;
      customer_management: typeof customer_management;
      department: typeof department;
      error_message: typeof error_message;
      location: typeof location;
      employee: typeof employee;
      student: typeof student;
    };
  }
}
