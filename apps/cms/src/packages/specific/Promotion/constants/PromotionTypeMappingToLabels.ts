import { TFunction } from 'i18next';
import { PromotionType } from './PromotionType';

export const getPromotionTypeMappingToLabels = (t: TFunction<['common', 'enum']>): Record<PromotionType, string> => {
  return {
    [PromotionType.FeeDiscount]: t('enum:promotionType.options.FeeDiscount'),
    [PromotionType.Gift]: t('enum:promotionType.options.Gift'),
    [PromotionType.PercentageDiscount]: t('enum:promotionType.options.PercentageDiscount'),
  };
};
