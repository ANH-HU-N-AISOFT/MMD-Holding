import { FC, Suspense } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import * as Forbidden from './routes/403';
import * as NotFound from './routes/404';
import * as InternalError from './routes/500';
import * as DashboardLayout from './routes/_dashboard';
import * as Dashboard from './routes/_dashboard.dashboard';
import * as InputCheck from './routes/_dashboard.input-check';
import * as RootLayout from './routes/_index';
import AppointmentRoutes from './routes/Appointment';
import { AuthRoutes } from './routes/Auth';
import ConsultantFormRoutes from './routes/ConsultantForm';
import ContractRoutes from './routes/Contract';
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
    element: (
      <Suspense fallback={null}>
        <RootLayout.Page />
      </Suspense>
    ),
    loader: RootLayout.loader,
    errorElement: <Navigate to="/404" />,
    children: [
      ...AuthRoutes,
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
          ...ContractRoutes,
        ],
      },
    ],
  },
  {
    path: '/500',
    element: (
      <Suspense fallback={null}>
        <InternalError.Page />
      </Suspense>
    ),
  },
  {
    path: '/404',
    element: (
      <Suspense fallback={null}>
        <NotFound.Page />
      </Suspense>
    ),
  },
  {
    path: '/403',
    element: (
      <Suspense fallback={null}>
        <Forbidden.Page />
      </Suspense>
    ),
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
