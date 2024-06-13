import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as TrialRequestList from './src/_dashboard.trial-request';
import * as DeleteTrialRequest from './src/_dashboard.trial-request.$id.delete';
import * as TrialRequestDetail from './src/_dashboard.trial-request.$id.detail';
import * as EditTrialRequest from './src/_dashboard.trial-request.$id.edit';
import * as CreateTrialRequest from './src/_dashboard.trial-request.create';
import * as ExportTrialRequest from './src/_dashboard.trial-request.export';

const TrialRequestRoutes: RouteObject[] = [
  {
    path: '/trial-request',
    loader: TrialRequestList.loader,
    shouldRevalidate: TrialRequestList.shouldRevalidate,
    errorElement: <TrialRequestList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <TrialRequestList.Page />
      </Suspense>
    ),
  },
  {
    path: '/trial-request/:id/detail',
    loader: TrialRequestDetail.loader,
    element: <TrialRequestDetail.Page />,
    errorElement: <TrialRequestDetail.ErrorBoundary />,
  },
  {
    path: '/trial-request/:id/edit',
    loader: EditTrialRequest.loader,
    action: EditTrialRequest.action,
    shouldRevalidate: EditTrialRequest.shouldRevalidate,
    element: <EditTrialRequest.Page />,
    errorElement: <EditTrialRequest.ErrorBoundary />,
  },
  {
    path: '/trial-request/create',
    loader: CreateTrialRequest.loader,
    action: CreateTrialRequest.action,
    element: <CreateTrialRequest.Page />,
    errorElement: <CreateTrialRequest.ErrorBoundary />,
  },
  {
    path: '/trial-request/:id/delete',
    action: DeleteTrialRequest.action,
  },
  {
    path: '/trial-request/export',
    action: ExportTrialRequest.action,
  },
];

export default TrialRequestRoutes;
