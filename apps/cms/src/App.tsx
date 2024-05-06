import { FC, Suspense } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import * as Appointment from './routes/_dashboard.input-assessment-schedule';
import * as InputCheck from './routes/_dashboard.input-check';
import * as PromotionProgramManagement from './routes/_dashboard.promotion-program-management';
import * as TestStudy from './routes/_dashboard.test-study';
import * as RootLayout from './routes/_index';
import AppointmentRoutes from './routes/Appointment';
import DepartmentRoutes from './routes/Department';
import EmployeeRoutes from './routes/Employee';
import * as Logout from './routes/logout';
import StudentRoutes from './routes/Student';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout.Page />,
    loader: RootLayout.loader,
    errorElement: <Navigate to="/404" />,
    children: [
      {
        element: <AuthLayout.Page />,
        loader: AuthLayout.loader,
        errorElement: <AuthLayout.ErrorBoundary />,
        children: [
          {
            path: '/login',
            action: Login.action,
            errorElement: <Login.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <Login.Page />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <DashboardLayout.Page />,
        shouldRevalidate: DashboardLayout.shouldRevalidate,
        loader: DashboardLayout.loader,
        errorElement: <DashboardLayout.ErrorBoundary />,
        children: [
          {
            path: '/dashboard',
            errorElement: <Dashboard.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <Dashboard.Page />
              </Suspense>
            ),
          },
          {
            path: '/appointment-booking',
            errorElement: <AppointmentBooking.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <AppointmentBooking.Page />
              </Suspense>
            ),
          },
          {
            path: '/contract-management',
            errorElement: <ContractManagement.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <ContractManagement.Page />
              </Suspense>
            ),
          },
          {
            path: '/contract-template-management',
            errorElement: <ContractTemplateManagement.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <ContractTemplateManagement.Page />
              </Suspense>
            ),
          },
          {
            path: '/course-combo-management',
            errorElement: <CourseComboManagement.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <CourseComboManagement.Page />
              </Suspense>
            ),
          },
          {
            path: '/course-management-individual',
            errorElement: <CourseManagementIndividual.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <CourseManagementIndividual.Page />
              </Suspense>
            ),
          },
          {
            path: '/course-registration-for-customer',
            errorElement: <CourseRegistrationForCustomer.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <CourseRegistrationForCustomer.Page />
              </Suspense>
            ),
          },
          {
            path: '/customer-management',
            errorElement: <CustomerManagement.ErrorBoundary />,
            loader: CustomerManagement.loader,
            element: (
              <Suspense fallback={null}>
                <CustomerManagement.Page />
              </Suspense>
            ),
          },
          {
            path: '/input-assessment-schedule',
            errorElement: <Appointment.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <Appointment.Page />
              </Suspense>
            ),
          },
          {
            path: '/input-check',
            errorElement: <InputCheck.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <InputCheck.Page />
              </Suspense>
            ),
          },
          {
            path: '/promotion-program-management',
            errorElement: <PromotionProgramManagement.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <PromotionProgramManagement.Page />
              </Suspense>
            ),
          },
          {
            path: '/test-study',
            errorElement: <TestStudy.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <TestStudy.Page />
              </Suspense>
            ),
          },
          ...DepartmentRoutes,
          ...EmployeeRoutes,
          ...StudentRoutes,
          ...AppointmentRoutes,
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
