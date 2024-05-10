import { TFunction } from 'i18next';
import { AppointmentStatus } from './AppointmentStatus';

export const getAppointmentStatusMappingToLabels = (
  t: TFunction<['common', 'enum']>,
): Record<AppointmentStatus, string> => {
  return {
    [AppointmentStatus.SCHEDULED]: t('enum:appointmentStatus.options.scheduled'),
    [AppointmentStatus.ARRIVED_AT_CENTER]: t('enum:appointmentStatus.options.arrived_at_center'),
    [AppointmentStatus.LEVEL_TESTED]: t('enum:appointmentStatus.options.level_tested'),
    [AppointmentStatus.CONFIRMED]: t('enum:appointmentStatus.options.confirmed'),
    [AppointmentStatus.CANCELED]: t('enum:appointmentStatus.options.cancelled'),
  };
};
