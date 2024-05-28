import { Trial } from '../models/Trial';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteTrial {
  id: Trial['id'];
}

export const deleteTrial = async ({ id }: DeleteTrial) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/trials/${id}`,
  });
  return response.data;
};
