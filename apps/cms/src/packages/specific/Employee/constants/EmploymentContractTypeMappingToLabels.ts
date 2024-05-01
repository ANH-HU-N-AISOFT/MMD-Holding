import { TFunction } from 'i18next';
import { EmploymentContractType } from '../models/Employee';

export const getEmploymentContractTypeMappingToLabels = (
  t: TFunction<['common', 'employee']>,
): Record<EmploymentContractType, string> => {
  return {
    [EmploymentContractType.FULL_TIME]: t('employee:contractTypeLabels.FULL_TIME'),
    [EmploymentContractType.PART_TIME]: t('employee:contractTypeLabels.PART_TIME'),
  };
};
