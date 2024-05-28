import { AxiosResponse } from 'axios';
import { Trial } from '../models/Trial';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Trial[];
  headers: ServiceHeaderResponse;
}

interface GetTrials {
  page?: number;
  perPage?: number;
  sortByName?: -1 | 1;
  query?: string;

  status?: string;
}
export const getTrials = async ({ page, query, perPage, status, sortByName }: GetTrials) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/trials',
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
