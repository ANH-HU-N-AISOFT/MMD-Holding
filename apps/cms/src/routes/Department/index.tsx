import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DepartmentList from './src/_dashboard.department-list';
import * as DeleteDepartment from './src/_dashboard.department-list.$id.delete';
import * as DepartmentDetail from './src/_dashboard.department-list.$id.detail';
import * as EditDepartment from './src/_dashboard.department-list.$id.edit';
import * as CreateDepartment from './src/_dashboard.department-list.create';
import * as ExportDepartments from './src/_dashboard.department-list.export';

const DepartmentRoutes: RouteObject[] = [
  {
    path: '/department-list',
    loader: DepartmentList.loader,
    errorElement: <DepartmentList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <DepartmentList.Page />
      </Suspense>
    ),
  },
  {
    path: '/department-list/:id/detail',
    loader: DepartmentDetail.loader,
    element: <DepartmentDetail.Page />,
    errorElement: <DepartmentDetail.ErrorBoundary />,
  },
  {
    path: '/department-list/:id/edit',
    loader: EditDepartment.loader,
    action: EditDepartment.action,
    element: <EditDepartment.Page />,
    errorElement: <EditDepartment.ErrorBoundary />,
  },
  {
    path: '/department-list/create',
    action: CreateDepartment.action,
    element: <CreateDepartment.Page />,
    errorElement: <CreateDepartment.ErrorBoundary />,
  },
  {
    path: '/department-list/export',
    action: ExportDepartments.action,
  },
  {
    path: '/department-list/:id/delete',
    action: DeleteDepartment.action,
  },
];

export default DepartmentRoutes;
