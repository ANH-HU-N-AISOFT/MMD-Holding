import { Promotion } from '../models/Promotion';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeletePromotion {
  id: Promotion['id'];
}

export const deletePromotion = async ({ id }: DeletePromotion) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/promotions/${id}`,
  });
  return response.data;
};
