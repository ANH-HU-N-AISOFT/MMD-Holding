import { TagProps } from 'reactjs';
import { AppointmentStatus } from '../models/AppointmentStatus';

export const AppointmentStatusMappingToColors: Record<AppointmentStatus, TagProps['color']> = {
  [AppointmentStatus.CONFIRMED]: 'success',
  [AppointmentStatus.SCHEDULED]: 'processing',
  [AppointmentStatus.CANCELED]: 'error',
  [AppointmentStatus.ARRIVED_AT_CENTER]: 'warning',
  [AppointmentStatus.LEVEL_TESTED]: 'orange',
};
