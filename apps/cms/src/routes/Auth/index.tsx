import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as AuthLayout from './src/_auth';
import * as Login from './src/_auth.login';

export const AuthRoutes: RouteObject[] = [
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
];
