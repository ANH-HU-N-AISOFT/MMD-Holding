import { FC } from 'react';
import { ScrollRestoration, Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import * as Forbidden from './routes/403';
import * as NotFound from './routes/404';
import * as InternalError from './routes/500';
import * as AuthLayout from './routes/_auth';
import * as Login from './routes/_auth.login';
import * as DashboardLayout from './routes/_dashboard';
import * as AppointmentBooking from './routes/_dashboard.appointment-booking';
import * as ContractManagement from './routes/_dashboard.contract-management';
import * as ContractTemplateManagement from './routes/_dashboard.contract-template-management';
import * as CourseComboManagement from './routes/_dashboard.course-combo-management';
import * as CourseManagementIndividual from './routes/_dashboard.course-management-individual';
import * as CourseRegistrationForCustomer from './routes/_dashboard.course-registration-for-customer';
import * as CustomerManagement from './routes/_dashboard.customer-management';
import * as Dashboard from './routes/_dashboard.dashboard';
import * as InputAssessmentSchedule from './routes/_dashboard.input-assessment-schedule';
import * as InputCheck from './routes/_dashboard.input-check';
import * as PromotionProgramManagement from './routes/_dashboard.promotion-program-management';
import * as TestStudy from './routes/_dashboard.test-study';
import * as UnitList from './routes/_dashboard.unit-list';
import * as UserList from './routes/_dashboard.user-list';
import * as Root from './routes/_index';
import * as Logout from './routes/logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Outlet />
        <ScrollRestoration />
      </>
    ),
    loader: Root.loader,
    errorElement: <Navigate to="/404" />,
    children: [
      {
        element: <AuthLayout.Page />,
        loader: AuthLayout.loader,
        children: [
          {
            path: '/login',
            action: Login.action,
            element: <Login.Page />,
          },
        ],
      },
      {
        element: <DashboardLayout.Page />,
        loader: DashboardLayout.loader,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard.Page />,
          },
          {
            path: '/appointment-booking',
            element: <AppointmentBooking.Page />,
          },
          {
            path: '/contract-management',
            element: <ContractManagement.Page />,
          },
          {
            path: '/contract-template-management',
            element: <ContractTemplateManagement.Page />,
          },
          {
            path: '/course-combo-management',
            element: <CourseComboManagement.Page />,
          },
          {
            path: '/course-management-individual',
            element: <CourseManagementIndividual.Page />,
          },
          {
            path: '/course-registration-for-customer',
            element: <CourseRegistrationForCustomer.Page />,
          },
          {
            path: '/customer-management',
            element: <CustomerManagement.Page />,
          },
          {
            path: '/input-assessment-schedule',
            element: <InputAssessmentSchedule.Page />,
          },
          {
            path: '/input-check',
            element: <InputCheck.Page />,
          },
          {
            path: '/promotion-program-management',
            element: <PromotionProgramManagement.Page />,
          },
          {
            path: '/test-study',
            element: <TestStudy.Page />,
          },
          {
            path: '/unit-list',
            element: <UnitList.Page />,
          },
          {
            path: '/user-list',
            element: <UserList.Page />,
          },
        ],
      },
    ],
  },
  {
    path: '/500',
    element: <InternalError.Page />,
  },
  {
    path: '/404',
    element: <NotFound.Page />,
  },
  {
    path: '/403',
    element: <Forbidden.Page />,
  },
  {
    path: '/logout',
    element: null,
    action: Logout.action,
    loader: Logout.loader,
  },
]);

export const App: FC = () => {
  return <RouterProvider router={router} />;
};
