import { TFunction } from 'i18next';
import { PromotionType } from './PromotionType';

export const getPromotionTypeMappingToLabels = (t: TFunction<['promotion']>): Record<PromotionType, string> => {
  return {
    [PromotionType.FeeDiscount]: t('promotion:FeeDiscount'),
    [PromotionType.Gift]: t('promotion:Gift'),
    [PromotionType.PercentageDiscount]: t('promotion:PercentageDiscount'),
  };
};
