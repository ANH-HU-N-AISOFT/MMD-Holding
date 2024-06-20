import { FC, Suspense } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import * as Forbidden from './routes/403';
import * as NotFound from './routes/404';
import * as InternalError from './routes/500';
import * as AuthLayout from './routes/_auth';
import * as Login from './routes/_auth.login';
import * as DashboardLayout from './routes/_dashboard';
import * as Dashboard from './routes/_dashboard.dashboard';
import * as InputCheck from './routes/_dashboard.input-check';
import * as RootLayout from './routes/_index';
import AppointmentRoutes from './routes/Appointment';
import ConsultantFormRoutes from './routes/ConsultantForm';
import CourseRoutes from './routes/Course';
import CourseComboRoutes from './routes/CourseCombo';
import CourseRoadmapRoutes from './routes/CourseRoadmap';
import DepartmentRoutes from './routes/Department';
import DocumentTemplateRoutes from './routes/DocumentTemplate';
import EmployeeRoutes from './routes/Employee';
import * as Logout from './routes/logout';
import PromotionRoutes from './routes/Promotion';
import RegistrationFormRoutes from './routes/RegistrationForm';
import StudentRoutes from './routes/Student';
import TrialRequestRoutes from './routes/TrialRequest';

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
            path: '/input-check',
            errorElement: <InputCheck.ErrorBoundary />,
            element: (
              <Suspense fallback={null}>
                <InputCheck.Page />
              </Suspense>
            ),
          },
          ...DepartmentRoutes,
          ...EmployeeRoutes,
          ...StudentRoutes,
          ...AppointmentRoutes,
          ...CourseRoutes,
          ...CourseRoadmapRoutes,
          ...CourseComboRoutes,
          ...PromotionRoutes,
          ...ConsultantFormRoutes,
          ...TrialRequestRoutes,
          ...DocumentTemplateRoutes,
          ...RegistrationFormRoutes,
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
