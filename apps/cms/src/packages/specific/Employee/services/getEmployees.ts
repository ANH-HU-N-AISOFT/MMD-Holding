import { AxiosResponse } from 'axios';
import { Employee } from '../models/Employee';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Employee[];
  headers: {
    'x-page': number;
    'x-total-count': number;
    'x-pages-count': number;
    'x-per-page': number;
    'x-next-page': number;
  };
}

interface GetEmployees {
  query?: string;
  page?: number;
  perPage?: number;
}
export const getEmployees = async ({ page, query, perPage }: GetEmployees) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/employees',
    params: {
      page,
      query,
      perPage,
    },
  });

  return response.data;
};
