import { AxiosResponse } from 'axios';
import { Promotion } from '../models/Promotion';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = Promotion;

interface GetPromotion {
  id: Promotion['id'];
}

export const getPromotion = async ({ id }: GetPromotion) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/promotions/${id}`,
  });
  return response.data;
};
