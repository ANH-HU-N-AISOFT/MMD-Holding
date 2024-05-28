import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as TrialList from './src/_dashboard.trial';
import * as DeleteTrial from './src/_dashboard.trial.$id.delete';
import * as TrialDetail from './src/_dashboard.trial.$id.detail';
import * as EditTrial from './src/_dashboard.trial.$id.edit';
import * as CreateTrial from './src/_dashboard.trial.create';

const TrialRoutes: RouteObject[] = [
  {
    path: '/trial',
    loader: TrialList.loader,
    shouldRevalidate: TrialList.shouldRevalidate,
    errorElement: <TrialList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <TrialList.Page />
      </Suspense>
    ),
  },
  {
    path: '/trial/:id/detail',
    loader: TrialDetail.loader,
    element: <TrialDetail.Page />,
    errorElement: <TrialDetail.ErrorBoundary />,
  },
  {
    path: '/trial/:id/edit',
    loader: EditTrial.loader,
    action: EditTrial.action,
    shouldRevalidate: EditTrial.shouldRevalidate,
    element: <EditTrial.Page />,
    errorElement: <EditTrial.ErrorBoundary />,
  },
  {
    path: '/trial/create',
    loader: CreateTrial.loader,
    action: CreateTrial.action,
    element: <CreateTrial.Page />,
    errorElement: <CreateTrial.ErrorBoundary />,
  },
  {
    path: '/trial/:id/delete',
    action: DeleteTrial.action,
  },
];

export default TrialRoutes;
