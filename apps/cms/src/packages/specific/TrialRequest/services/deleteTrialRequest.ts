import { TrialRequest } from '../models/TrialRequest';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteTrialRequest {
  id: TrialRequest['id'];
}

export const deleteTrialRequest = async ({ id }: DeleteTrialRequest) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/trial-requests/${id}`,
  });
  return response.data;
};
