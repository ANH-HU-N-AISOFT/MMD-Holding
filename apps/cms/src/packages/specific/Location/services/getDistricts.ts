import { AxiosResponse } from 'axios';
import { City } from '../models/Location';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: City[];
  headers: ServiceHeaderResponse;
}

interface GetDistricts {
  provinceCode: string;
}
export const getDistricts = async ({ provinceCode }: GetDistricts) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/locations/districts/getByProvince',
    params: {
      provinceCode,
      perPage: 1000,
    },
  });

  return response.data;
};
