import { AxiosResponse } from 'axios';
import { City } from '../models/Location';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: City[];
  headers: ServiceHeaderResponse;
}

interface GetCities {}
export const getCities = async (_: GetCities) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/locations/provinces',
    params: {
      perPage: 1000,
    },
  });

  return response.data;
};
