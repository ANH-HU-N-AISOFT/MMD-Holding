import { TFunction } from 'i18next';
import { EmployeeStatus } from '../models/Employee';

export const getEmployeeStatusMappingToLabels = (
  t: TFunction<['common', 'employee']>,
): Record<EmployeeStatus, string> => {
  return {
    [EmployeeStatus.WORKING]: t('employee:workStatusLabels.WORKING'),
    [EmployeeStatus.MATERNITY_LEAVE]: t('employee:workStatusLabels.MATERNITY_LEAVE'),
    [EmployeeStatus.UNPAID_LEAVE]: t('employee:workStatusLabels.UNPAID_LEAVE'),
    [EmployeeStatus.TERMINATED]: t('employee:workStatusLabels.TERMINATED'),
  };
};
