import { AxiosResponse } from 'axios';
import { Location } from '../models/Location';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Location[];
  headers: {
    'x-page': number;
    'x-total-count': number;
    'x-pages-count': number;
    'x-per-page': number;
    'x-next-page': number;
  };
}

interface GetCities {}
export const getCities = async (_: GetCities) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/locations/provinces',
  });

  return response.data;
};
