import { AxiosResponse } from 'axios';
import { City } from '../models/Location';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: City[];
  headers: ServiceHeaderResponse;
}

interface GetCountries {
  perPage?: number;
  page?: number;
}
export const getCountries = async ({ page, perPage }: GetCountries) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/locations/countries',
    params: { page, perPage },
  });

  return response.data;
};
