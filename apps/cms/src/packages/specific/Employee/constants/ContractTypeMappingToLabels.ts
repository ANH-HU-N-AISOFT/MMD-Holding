import { TFunction } from 'i18next';
import { ContractType } from '../models/ContractType';

export const getContractTypeMappingToLabels = (t: TFunction<['employee']>): Record<ContractType, string> => {
  return {
    [ContractType.FULL_TIME]: t('employee:FULL_TIME'),
    [ContractType.PART_TIME]: t('employee:PART_TIME'),
  };
};
