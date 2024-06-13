import { TFunction } from 'i18next';
import { BusinessStatusEnum } from './BusinessStatusEnum';

export const getBusinessStatusMappingToLabels = (t: TFunction<['enum']>): Record<BusinessStatusEnum, string> => {
  return {
    [BusinessStatusEnum.ACTIVE]: t('enum:businessStatus.options.ACTIVE'),
    [BusinessStatusEnum.COMING_SOON]: t('enum:businessStatus.options.COMING_SOON'),
    [BusinessStatusEnum.PERMANENTLY_CLOSED]: t('enum:businessStatus.options.PERMANENTLY_CLOSED'),
    [BusinessStatusEnum.TEMPORARILY_CLOSED]: t('enum:businessStatus.options.TEMPORARILY_CLOSED'),
  };
};
