import { AxiosResponse } from 'axios';
import { City } from '../models/Location';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: City[];
  headers: ServiceHeaderResponse;
}

interface GetSchools {
  provinceCode?: string;
  perPage?: number;
  page?: number;
}
export const getSchools = async ({ provinceCode, page, perPage }: GetSchools) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/schools',
    params: {
      provinceCode,
      page,
      perPage,
    },
  });

  return response.data;
};
