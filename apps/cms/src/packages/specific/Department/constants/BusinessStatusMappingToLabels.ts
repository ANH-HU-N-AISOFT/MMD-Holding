import { TFunction } from 'i18next';
import { BusinessStatusEnum } from '../models/BusinessStatusEnum';

export const getBusinessStatusMappingToLabels = (t: TFunction<['department']>): Record<BusinessStatusEnum, string> => {
  return {
    [BusinessStatusEnum.ACTIVE]: t('department:ACTIVE'),
    [BusinessStatusEnum.COMING_SOON]: t('department:COMING_SOON'),
    [BusinessStatusEnum.PERMANENTLY_CLOSED]: t('department:PERMANENTLY_CLOSED'),
    [BusinessStatusEnum.TEMPORARILY_CLOSED]: t('department:TEMPORARILY_CLOSED'),
  };
};
