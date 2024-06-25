import { TFunction } from 'i18next';
import { EmployeeContractType } from '../models/EmployeeContractType';

export const getEmployeeContractTypeMappingToLabels = (
  t: TFunction<['enum']>,
): Record<EmployeeContractType, string> => {
  return {
    [EmployeeContractType.FULL_TIME]: t('enum:contractType.options.FULL_TIME'),
    [EmployeeContractType.PART_TIME]: t('enum:contractType.options.PART_TIME'),
  };
};
