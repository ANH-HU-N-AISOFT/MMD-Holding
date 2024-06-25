import { TFunction } from 'i18next';
import { AppointmentStatus } from '../models/AppointmentStatus';

export const getAppointmentStatusMappingToLabels = (
  t: TFunction<['appointment']>,
): Record<AppointmentStatus, string> => {
  return {
    [AppointmentStatus.SCHEDULED]: t('appointment:scheduled'),
    [AppointmentStatus.ARRIVED_AT_CENTER]: t('appointment:arrived_at_center'),
    [AppointmentStatus.LEVEL_TESTED]: t('appointment:level_tested'),
    [AppointmentStatus.CONFIRMED]: t('appointment:confirmed'),
    [AppointmentStatus.CANCELED]: t('appointment:cancelled'),
  };
};
