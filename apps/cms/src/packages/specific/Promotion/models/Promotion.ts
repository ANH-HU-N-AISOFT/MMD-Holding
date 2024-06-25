import { PromotionType } from '../constants/PromotionType';
import { PromotionScope } from './PromotionScope';
import { PromotionStatus } from './PromotionStatus';

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
