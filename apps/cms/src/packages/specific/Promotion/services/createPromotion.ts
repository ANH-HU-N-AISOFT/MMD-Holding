import { Promotion } from '../models/Promotion';
import { PromotionScope } from '~/packages/common/SelectVariants/PromotionScope/constants/PromotionScope';
import { PromotionStatus } from '~/packages/common/SelectVariants/PromotionStatus/constants/PromotionStatus';
import { PromotionType } from '~/packages/common/SelectVariants/PromotionType/constants/PromotionType';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreatePromotion {
  name: string;
  code: string;
  status: PromotionStatus;
  startDate: string;
  endDate: string;
  programType: PromotionType;
  scope: PromotionScope;
  organizationIds: string[] | undefined | null;
  notes: string | undefined | null;
  feeDiscount: number | undefined | null;
  giftDiscount: string | undefined | null;
  percentageDiscount: number | undefined | null;
}

export type ResponseSuccess = Promotion;

export const createPromotion = async (data: CreatePromotion) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/promotions',
    data: data,
  });
  return response.data;
};
