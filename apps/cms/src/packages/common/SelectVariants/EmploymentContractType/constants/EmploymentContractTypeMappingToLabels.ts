import { TFunction } from 'i18next';
import { EmploymentContractType } from './EmploymentContractType';

export const getEmploymentContractTypeMappingToLabels = (
  t: TFunction<['enum']>,
): Record<EmploymentContractType, string> => {
  return {
    [EmploymentContractType.FULL_TIME]: t('enum:contractType.options.FULL_TIME'),
    [EmploymentContractType.PART_TIME]: t('enum:contractType.options.PART_TIME'),
  };
};
