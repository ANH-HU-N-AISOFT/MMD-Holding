import { AxiosResponse } from 'axios';
import { City } from '../models/Location';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: City[];
  headers: ServiceHeaderResponse;
}

interface GetCities {
  perPage?: number;
  page?: number;
}
export const getCities = async ({ page, perPage }: GetCities) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/locations/provinces',
    params: { page, perPage },
  });

  return response.data;
};
