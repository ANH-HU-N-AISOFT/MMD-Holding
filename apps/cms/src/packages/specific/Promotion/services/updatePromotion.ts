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
    organizationIds: string[] | undefined | null;
    notes: string | undefined | null;
    feeDiscount: number | undefined | null;
    giftDiscount: string | undefined | null;
    percentageDiscount: number | undefined | null;
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
