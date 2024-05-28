import { AxiosResponse } from 'axios';
import { Trial } from '../models/Trial';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = Trial;

interface GetTrial {
  id: Trial['id'];
}

export const getTrial = async ({ id }: GetTrial) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/trials/${id}`,
  });
  return response.data;
};
