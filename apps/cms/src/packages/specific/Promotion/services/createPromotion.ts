import { PromotionType } from '../constants/PromotionType';
import { Promotion } from '../models/Promotion';
import { PromotionScope } from '../models/PromotionScope';
import { PromotionStatus } from '../models/PromotionStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreatePromotion {
  name: string;
  code: string;
  status: PromotionStatus;
  startDate: string;
  endDate: string;
  programType: PromotionType;
  scope: PromotionScope;
  organizationIds: string[] | null;
  notes: string | null;
  feeDiscount: number | null;
  giftDiscount: string | null;
  percentageDiscount: number | null;
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
