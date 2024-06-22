import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as RegistrationFormList from './src/_dashboard.registration-form';
import * as DeleteRegistrationForm from './src/_dashboard.registration-form.$id.delete';
import * as RegistrationFormDetail from './src/_dashboard.registration-form.$id.detail';
import * as EditRegistrationForm from './src/_dashboard.registration-form.$id.edit';
import * as CreateRegistrationForm from './src/_dashboard.registration-form.create';

const RegistrationFormRoutes: RouteObject[] = [
  {
    path: '/registration-form',
    loader: RegistrationFormList.loader,
    shouldRevalidate: RegistrationFormList.shouldRevalidate,
    errorElement: <RegistrationFormList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <RegistrationFormList.Page />
      </Suspense>
    ),
  },
  {
    path: '/registration-form/:id/detail',
    loader: RegistrationFormDetail.loader,
    shouldRevalidate: RegistrationFormDetail.shouldRevalidate,
    element: <RegistrationFormDetail.Page />,
    errorElement: <RegistrationFormDetail.ErrorBoundary />,
  },
  {
    path: '/registration-form/:id/edit',
    loader: EditRegistrationForm.loader,
    action: EditRegistrationForm.action,
    shouldRevalidate: EditRegistrationForm.shouldRevalidate,
    element: <EditRegistrationForm.Page />,
    errorElement: <EditRegistrationForm.ErrorBoundary />,
  },
  {
    path: '/registration-form/create',
    action: CreateRegistrationForm.action,
    shouldRevalidate: CreateRegistrationForm.shouldRevalidate,
    element: <CreateRegistrationForm.Page />,
    errorElement: <CreateRegistrationForm.ErrorBoundary />,
  },
  {
    path: '/registration-form/:id/delete',
    action: DeleteRegistrationForm.action,
  },
];

export default RegistrationFormRoutes;
