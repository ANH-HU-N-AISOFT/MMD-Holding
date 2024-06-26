import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DepartmentList from './src/_dashboard.department';
import * as DeleteDepartment from './src/_dashboard.department.$id.delete';
import * as DepartmentDetail from './src/_dashboard.department.$id.detail';
import * as EditDepartment from './src/_dashboard.department.$id.edit';
import * as CreateDepartment from './src/_dashboard.department.create';
import * as ExportDepartments from './src/_dashboard.department.export';

const DepartmentRoutes: RouteObject[] = [
  {
    path: '/department',
    loader: DepartmentList.loader,
    shouldRevalidate: DepartmentList.shouldRevalidate,
    errorElement: <DepartmentList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <DepartmentList.Page />
      </Suspense>
    ),
  },
  {
    path: '/department/:id/detail',
    loader: DepartmentDetail.loader,
    shouldRevalidate: DepartmentDetail.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <DepartmentDetail.Page />
      </Suspense>
    ),
    errorElement: <DepartmentDetail.ErrorBoundary />,
  },
  {
    path: '/department/:id/edit',
    loader: EditDepartment.loader,
    action: EditDepartment.action,
    shouldRevalidate: EditDepartment.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <EditDepartment.Page />
      </Suspense>
    ),
    errorElement: <EditDepartment.ErrorBoundary />,
  },
  {
    path: '/department/create',
    loader: CreateDepartment.loader,
    action: CreateDepartment.action,
    shouldRevalidate: CreateDepartment.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <CreateDepartment.Page />
      </Suspense>
    ),
    errorElement: <CreateDepartment.ErrorBoundary />,
  },
  {
    path: '/department/export',
    action: ExportDepartments.action,
  },
  {
    path: '/department/:id/delete',
    action: DeleteDepartment.action,
  },
];

export default DepartmentRoutes;
