import { TFunction } from 'i18next';
import { PromotionStatus } from '../models/PromotionStatus';

export const getPromotionStatusMappingToLabels = (t: TFunction<['promotion']>): Record<PromotionStatus, string> => {
  return {
    [PromotionStatus.Active]: t('promotion:Active'),
    [PromotionStatus.InActive]: t('promotion:InActive'),
  };
};
