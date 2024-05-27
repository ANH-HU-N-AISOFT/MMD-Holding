import { PromotionScope } from '~/packages/common/SelectVariants/PromotionScope/constants/PromotionScope';
import { PromotionStatus } from '~/packages/common/SelectVariants/PromotionStatus/constants/PromotionStatus';
import { PromotionType } from '~/packages/common/SelectVariants/PromotionType/constants/PromotionType';

export interface Promotion {
  id: string;
  name: string;
  code: string;
  status: PromotionStatus;
  startDate: string;
  endDate: string;
  scope: PromotionScope;
  organizationIds: string[];
  notes: string;
  giftDiscount: string;
  createdAt: string;
  programType: PromotionType;
  feeDiscount: number;
  percentageDiscount: number;
}
