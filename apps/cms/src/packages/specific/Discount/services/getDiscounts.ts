import { AxiosResponse } from 'axios';
import { Discount } from '../models/Discount';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Discount[];
  headers: ServiceHeaderResponse;
}

interface GetDiscounts {
  page?: number;
  perPage?: number;
  sortByName?: -1 | 1;
  query?: string;
  status?: string;
}
export const getDiscounts = async ({ page, query, perPage, status, sortByName }: GetDiscounts) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/courses',
    params: {
      page,
      query,
      perPage,
      status,
      sortByName,
    },
  });

  return response.data;
};
