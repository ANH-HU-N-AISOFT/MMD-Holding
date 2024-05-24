import { UrlSearchParamsUtils } from 'utilities';
import { any, number, object, enum as enum_, string } from 'zod';
import { PromotionStatus } from '~/packages/common/SelectVariants/PromotionStatus/constants/PromotionStatus';
import { PromotionType } from '~/packages/common/SelectVariants/PromotionType/constants/PromotionType';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  status: enum_([PromotionStatus.Active, PromotionStatus.InActive]).optional(),
  promotionType: enum_([PromotionType.FeeDiscount, PromotionType.Gift, PromotionType.PercentageDiscount]).optional(),
  startDate: string().optional(),
  endDate: string().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
