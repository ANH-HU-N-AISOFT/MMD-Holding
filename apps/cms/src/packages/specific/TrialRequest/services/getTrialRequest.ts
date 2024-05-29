import { AxiosResponse } from 'axios';
import { TrialRequest } from '../models/TrialRequest';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = TrialRequest;

interface GetTrialRequest {
  id: TrialRequest['id'];
}

export const getTrialRequest = async ({ id }: GetTrialRequest) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/trial-requests/${id}`,
  });
  return response.data;
};
