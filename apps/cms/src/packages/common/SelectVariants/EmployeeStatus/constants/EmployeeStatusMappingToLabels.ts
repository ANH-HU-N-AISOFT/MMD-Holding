import { TFunction } from 'i18next';
import { EmployeeStatus } from './EmployeeStatus';

export const getEmployeeStatusMappingToLabels = (t: TFunction<['common', 'enum']>): Record<EmployeeStatus, string> => {
  return {
    [EmployeeStatus.WORKING]: t('enum:workStatus.options.WORKING'),
    [EmployeeStatus.MATERNITY_LEAVE]: t('enum:workStatus.options.MATERNITY_LEAVE'),
    [EmployeeStatus.UNPAID_LEAVE]: t('enum:workStatus.options.UNPAID_LEAVE'),
    [EmployeeStatus.TERMINATED]: t('enum:workStatus.options.TERMINATED'),
  };
};
