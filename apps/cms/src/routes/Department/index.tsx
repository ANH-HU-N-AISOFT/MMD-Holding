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
    element: <DepartmentDetail.Page />,
    errorElement: <DepartmentDetail.ErrorBoundary />,
  },
  {
    path: '/department/:id/edit',
    loader: EditDepartment.loader,
    action: EditDepartment.action,
    element: <EditDepartment.Page />,
    errorElement: <EditDepartment.ErrorBoundary />,
  },
  {
    path: '/department/create',
    loader: CreateDepartment.loader,
    action: CreateDepartment.action,
    element: <CreateDepartment.Page />,
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
