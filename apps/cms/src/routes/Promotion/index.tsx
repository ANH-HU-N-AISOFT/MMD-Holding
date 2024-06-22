import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as PromotionList from './src/_dashboard.promotion';
import * as DeletePromotion from './src/_dashboard.promotion.$id.delete';
import * as PromotionDetail from './src/_dashboard.promotion.$id.detail';
import * as EditPromotion from './src/_dashboard.promotion.$id.edit';
import * as CreatePromotion from './src/_dashboard.promotion.create';

const PromotionRoutes: RouteObject[] = [
  {
    path: '/promotion',
    loader: PromotionList.loader,
    shouldRevalidate: PromotionList.shouldRevalidate,
    errorElement: <PromotionList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <PromotionList.Page />
      </Suspense>
    ),
  },
  {
    path: '/promotion/:id/detail',
    loader: PromotionDetail.loader,
    shouldRevalidate: PromotionDetail.shouldRevalidate,
    element: <PromotionDetail.Page />,
    errorElement: <PromotionDetail.ErrorBoundary />,
  },
  {
    path: '/promotion/:id/edit',
    loader: EditPromotion.loader,
    action: EditPromotion.action,
    shouldRevalidate: EditPromotion.shouldRevalidate,
    element: <EditPromotion.Page />,
    errorElement: <EditPromotion.ErrorBoundary />,
  },
  {
    path: '/promotion/create',
    action: CreatePromotion.action,
    shouldRevalidate: CreatePromotion.shouldRevalidate,
    element: <CreatePromotion.Page />,
    errorElement: <CreatePromotion.ErrorBoundary />,
  },
  {
    path: '/promotion/:id/delete',
    action: DeletePromotion.action,
  },
];

export default PromotionRoutes;
