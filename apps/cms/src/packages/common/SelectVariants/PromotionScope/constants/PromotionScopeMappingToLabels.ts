import { TFunction } from 'i18next';
import { PromotionScope } from './PromotionScope';

export const getPromotionScopeMappingToLabels = (t: TFunction<['common', 'enum']>): Record<PromotionScope, string> => {
  return {
    [PromotionScope.All]: t('enum:promotionScope.options.All'),
    [PromotionScope.Special]: t('enum:promotionScope.options.Special'),
  };
};
