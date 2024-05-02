import { TFunction } from 'i18next';
import { EmployeeAccessStatus } from './EmployeeAccessStatus';

export const getEmployeeAccessStatusMappingToLabels = (
  t: TFunction<['common', 'enum']>,
): Record<EmployeeAccessStatus, string> => {
  return {
    [EmployeeAccessStatus.BLOCKED]: t('enum:employeeAccessStatus.options.BLOCKED'),
    [EmployeeAccessStatus.GRANTED]: t('enum:employeeAccessStatus.options.GRANTED'),
  };
};
