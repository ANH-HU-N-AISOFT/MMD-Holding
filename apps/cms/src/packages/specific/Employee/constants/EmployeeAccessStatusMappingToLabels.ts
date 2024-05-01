import { TFunction } from 'i18next';
import { EmployeeAccessStatus } from '../models/Employee';

export const getEmployeeAccessStatusMappingToLabels = (
  t: TFunction<['common', 'employee']>,
): Record<EmployeeAccessStatus, string> => {
  return {
    [EmployeeAccessStatus.BLOCKED]: t('employee:employeeAccessStatusLabels.BLOCKED'),
    [EmployeeAccessStatus.GRANTED]: t('employee:employeeAccessStatusLabels.GRANTED'),
  };
};
