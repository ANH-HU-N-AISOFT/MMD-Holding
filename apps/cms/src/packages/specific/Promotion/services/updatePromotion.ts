import { PromotionType } from '../constants/PromotionType';
import { Promotion } from '../models/Promotion';
import { PromotionScope } from '../models/PromotionScope';
import { PromotionStatus } from '../models/PromotionStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UpdatePromotion {
  id: Promotion['id'];
  data: {
    id: string;
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
  };
}

export interface ResponseSuccess {}

export const updatePromotion = async ({ data, id }: UpdatePromotion) => {
  const response = await fetchApi.request({
    method: 'PUT',
    url: `/promotions/${id}`,
    data: data,
  });
  return response.data;
};
