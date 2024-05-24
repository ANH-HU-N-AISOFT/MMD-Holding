import { AxiosResponse } from 'axios';
import { Promotion } from '../models/Promotion';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { PromotionStatus } from '~/packages/common/SelectVariants/PromotionStatus/constants/PromotionStatus';
import { PromotionType } from '~/packages/common/SelectVariants/PromotionType/constants/PromotionType';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Promotion[];
  headers: ServiceHeaderResponse;
}

interface GetPromotions {
  page?: number;
  perPage?: number;
  query?: string;
  status?: PromotionStatus;
  promotionType?: PromotionType;
  sortByName?: -1 | 1;
  startDate?: string;
  endDate?: string;
}
export const getPromotions = async ({
  page,
  query,
  perPage,
  status,
  sortByName,
  endDate,
  promotionType,
  startDate,
}: GetPromotions) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/promotions',
    params: {
      page,
      query,
      perPage,
      status,
      sortByName,
      endDate,
      promotionType,
      startDate,
    },
  });

  return response.data;
};
