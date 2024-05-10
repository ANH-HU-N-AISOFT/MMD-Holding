import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as AppointmentList from './src/_dashboard.appointment';
import * as DeleteAppointment from './src/_dashboard.appointment.$id.delete';
import * as AppointmentDetail from './src/_dashboard.appointment.$id.detail';
import * as EditAppointment from './src/_dashboard.appointment.$id.edit';
import * as CreateAppointment from './src/_dashboard.appointment.create';
import * as ExportAppointments from './src/_dashboard.appointment.export';

const AppointmentRoutes: RouteObject[] = [
  {
    path: '/appointment',
    loader: AppointmentList.loader,
    shouldRevalidate: AppointmentList.shouldRevalidate,
    errorElement: <AppointmentList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <AppointmentList.Page />
      </Suspense>
    ),
  },
  {
    path: '/appointment/:id/detail',
    loader: AppointmentDetail.loader,
    element: <AppointmentDetail.Page />,
    errorElement: <AppointmentDetail.ErrorBoundary />,
  },
  {
    path: '/appointment/:id/edit',
    loader: EditAppointment.loader,
    action: EditAppointment.action,
    shouldRevalidate: EditAppointment.shouldRevalidate,
    element: <EditAppointment.Page />,
    errorElement: <EditAppointment.ErrorBoundary />,
  },
  {
    path: '/appointment/create',
    loader: CreateAppointment.loader,
    action: CreateAppointment.action,
    element: <CreateAppointment.Page />,
    errorElement: <CreateAppointment.ErrorBoundary />,
  },
  {
    path: '/appointment/export',
    action: ExportAppointments.action,
  },
  {
    path: '/appointment/:id/delete',
    action: DeleteAppointment.action,
  },
];

export default AppointmentRoutes;
