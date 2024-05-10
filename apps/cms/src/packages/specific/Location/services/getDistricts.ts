import { AxiosResponse } from 'axios';
import { City } from '../models/Location';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: City[];
  headers: ServiceHeaderResponse;
}

interface GetDistricts {
  provinceCode?: string;
  perPage?: number;
  page?: number;
}
export const getDistricts = async ({ provinceCode, page, perPage }: GetDistricts) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/locations/districts/getByProvince',
    params: {
      provinceCode,
      page,
      perPage,
    },
  });

  return response.data;
};
