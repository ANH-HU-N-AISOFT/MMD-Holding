import { TFunction } from 'i18next';
import { PromotionScope } from '../models/PromotionScope';

export const getPromotionScopeMappingToLabels = (t: TFunction<['promotion']>): Record<PromotionScope, string> => {
  return {
    [PromotionScope.All]: t('promotion:All'),
    [PromotionScope.Special]: t('promotion:Special'),
  };
};
