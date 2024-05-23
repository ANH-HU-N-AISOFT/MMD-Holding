import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DiscountList from './src/_dashboard.discount';
import * as DeleteDiscount from './src/_dashboard.discount.$id.delete';
import * as CreateDiscount from './src/_dashboard.discount.create';
import * as ExportDiscounts from './src/_dashboard.discount.export';
// import * as DiscountDetail from './src/_dashboard.discount.$id.detail';
// import * as EditDiscount from './src/_dashboard.discount.$id.edit';

const DiscountRoutes: RouteObject[] = [
  {
    path: '/discount',
    loader: DiscountList.loader,
    shouldRevalidate: DiscountList.shouldRevalidate,
    errorElement: <DiscountList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <DiscountList.Page />
      </Suspense>
    ),
  },
  // {
  //   path: '/discount/:id/detail',
  //   loader: DiscountDetail.loader,
  //   element: <DiscountDetail.Page />,
  //   errorElement: <DiscountDetail.ErrorBoundary />,
  // },
  // {
  //   path: '/discount/:id/edit',
  //   loader: EditDiscount.loader,
  //   action: EditDiscount.action,
  //   shouldRevalidate: EditDiscount.shouldRevalidate,
  //   element: <EditDiscount.Page />,
  //   errorElement: <EditDiscount.ErrorBoundary />,
  // },
  {
    path: '/discount/create',
    action: CreateDiscount.action,
    element: <CreateDiscount.Page />,
    errorElement: <CreateDiscount.ErrorBoundary />,
  },
  {
    path: '/discount/export',
    action: ExportDiscounts.action,
  },
  {
    path: '/discount/:id/delete',
    action: DeleteDiscount.action,
  },
];

export default DiscountRoutes;
