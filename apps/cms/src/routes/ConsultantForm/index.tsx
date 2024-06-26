import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as ConsultantFormList from './src/_dashboard.consultant-form';
import * as DeleteConsultantForm from './src/_dashboard.consultant-form.$id.delete';
import * as ConsultantFormDetail from './src/_dashboard.consultant-form.$id.detail';
import * as EditConsultantForm from './src/_dashboard.consultant-form.$id.edit';
import * as CreateConsultantForm from './src/_dashboard.consultant-form.create';
import * as ExportConsultantForm from './src/_dashboard.consultant-form.export';

const ConsultantFormRoutes: RouteObject[] = [
  {
    path: '/consultant-form',
    loader: ConsultantFormList.loader,
    shouldRevalidate: ConsultantFormList.shouldRevalidate,
    errorElement: <ConsultantFormList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <ConsultantFormList.Page />
      </Suspense>
    ),
  },
  {
    path: '/consultant-form/:id/detail',
    loader: ConsultantFormDetail.loader,
    shouldRevalidate: ConsultantFormDetail.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <ConsultantFormDetail.Page />
      </Suspense>
    ),
    errorElement: <ConsultantFormDetail.ErrorBoundary />,
  },
  {
    path: '/consultant-form/:id/edit',
    loader: EditConsultantForm.loader,
    action: EditConsultantForm.action,
    shouldRevalidate: EditConsultantForm.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <EditConsultantForm.Page />
      </Suspense>
    ),
    errorElement: <EditConsultantForm.ErrorBoundary />,
  },
  {
    path: '/consultant-form/create',
    action: CreateConsultantForm.action,
    loader: CreateConsultantForm.loader,
    shouldRevalidate: CreateConsultantForm.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <CreateConsultantForm.Page />
      </Suspense>
    ),
    errorElement: <CreateConsultantForm.ErrorBoundary />,
  },
  {
    path: '/consultant-form/:id/delete',
    action: DeleteConsultantForm.action,
  },
  {
    path: '/consultant-form/export',
    action: ExportConsultantForm.action,
  },
];

export default ConsultantFormRoutes;
