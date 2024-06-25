import { sum } from 'ramda';
import { PromotionType } from '../../Promotion/constants/PromotionType';
import { FormValues } from '../components/FormMutation/FormMutation';

export const calculateSalePrice = (data: Pick<FormValues, 'calculatePromotions' | 'calculateNDisplayOriginPrice'>) => {
  const promotions = data.calculatePromotions ?? [];
  const originPrice = data.calculateNDisplayOriginPrice;
  if (!originPrice) {
    return 0;
  }
  const { isIncludesFeeDiscount, isIncludesPercentageDiscount } = promotions.reduce<{
    isIncludesFeeDiscount: boolean;
    isIncludesPercentageDiscount: boolean;
  }>(
    (result, item) => {
      return {
        ...result,
        isIncludesFeeDiscount: result.isIncludesFeeDiscount || item.programType === PromotionType.FeeDiscount,
        isIncludesPercentageDiscount:
          result.isIncludesPercentageDiscount || item.programType === PromotionType.PercentageDiscount,
      };
    },
    { isIncludesFeeDiscount: false, isIncludesPercentageDiscount: false },
  );
  const isMixed = isIncludesFeeDiscount && isIncludesPercentageDiscount;
  if (!isMixed && isIncludesFeeDiscount) {
    const promotionPrice = sum(promotions.map(promotion => promotion.feeDiscount ?? 0));
    return Math.max(0, originPrice - promotionPrice);
  }
  if (!isMixed && isIncludesPercentageDiscount) {
    const promotionPercentage = sum(promotions.map(promotion => promotion.percentageDiscount ?? 0));
    const promotionPercentageStrict = Math.min(promotionPercentage, 100);
    const promotionPrice = (originPrice * promotionPercentageStrict) / 100;
    return Math.max(0, originPrice - promotionPrice);
  }
  if (isMixed) {
    const promotionPriceByFeeDiscounts = sum(promotions.map(promotion => promotion.feeDiscount ?? 0));
    const priceAfterFeeDiscounts = originPrice - promotionPriceByFeeDiscounts;
    const promotionPercentage = sum(promotions.map(promotion => promotion.percentageDiscount ?? 0));
    const promotionPercentageStrict = Math.min(promotionPercentage, 100);
    const promotionByPercentageDiscounts = (priceAfterFeeDiscounts * promotionPercentageStrict) / 100;
    return Math.max(0, priceAfterFeeDiscounts - promotionByPercentageDiscounts);
  }
  return originPrice;
};
