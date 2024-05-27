import { AxiosResponse } from 'axios';
import { Promotion } from '../models/Promotion';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { PromotionStatus } from '~/packages/common/SelectVariants/PromotionStatus/constants/PromotionStatus';
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
  promotionTypes?: string;
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
  promotionTypes,
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
      promotionTypes,
      startDate,
    },
  });

  return response.data;
};
