import { TFunction } from 'i18next';
import { BusinessStatusEnum } from '../models/Department';

export const getBusinessStatusMappingToLabels = (
  t: TFunction<['common', 'department']>,
): Record<BusinessStatusEnum, string> => {
  return {
    [BusinessStatusEnum.ACTIVE]: t('department:businessStatus_labels.ACTIVE'),
    [BusinessStatusEnum.COMING_SOON]: t('department:businessStatus_labels.COMING_SOON'),
    [BusinessStatusEnum.PERMANENTLY_CLOSED]: t('department:businessStatus_labels.PERMANENTLY_CLOSED'),
    [BusinessStatusEnum.TEMPORARILY_CLOSED]: t('department:businessStatus_labels.TEMPORARILY_CLOSED'),
  };
};
