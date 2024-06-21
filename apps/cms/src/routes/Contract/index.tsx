import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as ContractList from './src/_dashboard.contract';
import * as DeleteContract from './src/_dashboard.contract.$id.delete';
import * as ContractDetail from './src/_dashboard.contract.$id.detail';
import * as EditContract from './src/_dashboard.contract.$id.edit';
import * as CreateContract from './src/_dashboard.contract.create';

const ContractRoutes: RouteObject[] = [
  {
    path: '/contract',
    loader: ContractList.loader,
    shouldRevalidate: ContractList.shouldRevalidate,
    errorElement: <ContractList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <ContractList.Page />
      </Suspense>
    ),
  },
  {
    path: '/contract/:id/detail',
    loader: ContractDetail.loader,
    element: <ContractDetail.Page />,
    errorElement: <ContractDetail.ErrorBoundary />,
  },
  {
    path: '/contract/:id/edit',
    loader: EditContract.loader,
    action: EditContract.action,
    shouldRevalidate: EditContract.shouldRevalidate,
    element: <EditContract.Page />,
    errorElement: <EditContract.ErrorBoundary />,
  },
  {
    path: '/contract/create',
    action: CreateContract.action,
    element: <CreateContract.Page />,
    errorElement: <CreateContract.ErrorBoundary />,
  },
  {
    path: '/contract/:id/delete',
    action: DeleteContract.action,
  },
];

export default ContractRoutes;
