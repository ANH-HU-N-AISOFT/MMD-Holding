import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as EmployeeList from './src/_dashboard.employee';
import * as DeleteEmployee from './src/_dashboard.employee.$id.delete';
import * as EmployeeDetail from './src/_dashboard.employee.$id.detail';
import * as EditEmployee from './src/_dashboard.employee.$id.edit';
import * as ResetPasswordEmployee from './src/_dashboard.employee.$id.reset-password';
import * as CreateEmployee from './src/_dashboard.employee.create';
import * as ExportEmployees from './src/_dashboard.employee.export';

const EmployeeRoutes: RouteObject[] = [
  {
    path: '/employee',
    loader: EmployeeList.loader,
    shouldRevalidate: EmployeeList.shouldRevalidate,
    errorElement: <EmployeeList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <EmployeeList.Page />
      </Suspense>
    ),
  },
  {
    path: '/employee/:id/detail',
    loader: EmployeeDetail.loader,
    shouldRevalidate: EmployeeDetail.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <EmployeeDetail.Page />
      </Suspense>
    ),
    errorElement: <EmployeeDetail.ErrorBoundary />,
  },
  {
    path: '/employee/:id/edit',
    loader: EditEmployee.loader,
    action: EditEmployee.action,
    shouldRevalidate: EditEmployee.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <EditEmployee.Page />
      </Suspense>
    ),
    errorElement: <EditEmployee.ErrorBoundary />,
  },
  {
    path: '/employee/create',
    loader: CreateEmployee.loader,
    action: CreateEmployee.action,
    shouldRevalidate: CreateEmployee.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <CreateEmployee.Page />
      </Suspense>
    ),
    errorElement: <CreateEmployee.ErrorBoundary />,
  },
  {
    path: '/employee/export',
    action: ExportEmployees.action,
  },
  {
    path: '/employee/:id/delete',
    action: DeleteEmployee.action,
  },
  {
    path: '/employee/:id/reset-password',
    action: ResetPasswordEmployee.action,
  },
];

export default EmployeeRoutes;
