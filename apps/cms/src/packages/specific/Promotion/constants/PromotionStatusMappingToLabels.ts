import { TFunction } from 'i18next';
import { PromotionStatus } from '../models/PromotionStatus';

export const getPromotionStatusMappingToLabels = (
  t: TFunction<['common', 'enum']>,
): Record<PromotionStatus, string> => {
  return {
    [PromotionStatus.Active]: t('enum:promotionStatus.options.Active'),
    [PromotionStatus.InActive]: t('enum:promotionStatus.options.InActive'),
  };
};
