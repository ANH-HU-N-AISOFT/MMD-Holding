import { TFunction } from 'i18next';
import { WorkStatus } from '../models/WorkStatus';

export const getWorkStatusMappingToLabels = (t: TFunction<['employee']>): Record<WorkStatus, string> => {
  return {
    [WorkStatus.WORKING]: t('employee:WORKING'),
    [WorkStatus.MATERNITY_LEAVE]: t('employee:MATERNITY_LEAVE'),
    [WorkStatus.UNPAID_LEAVE]: t('employee:UNPAID_LEAVE'),
    [WorkStatus.TERMINATED]: t('employee:TERMINATED'),
  };
};
