import { Promotion } from '../models/Promotion';
import { PromotionScope } from '~/packages/common/SelectVariants/PromotionScope/constants/PromotionScope';
import { PromotionStatus } from '~/packages/common/SelectVariants/PromotionStatus/constants/PromotionStatus';
import { PromotionType } from '~/packages/common/SelectVariants/PromotionType/constants/PromotionType';
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
