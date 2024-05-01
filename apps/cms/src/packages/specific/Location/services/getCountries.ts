import { AxiosResponse } from 'axios';
import { City } from '../models/Location';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: City[];
  headers: {
    'x-page': number;
    'x-total-count': number;
    'x-pages-count': number;
    'x-per-page': number;
    'x-next-page': number;
  };
}

interface GetCountries {}
export const getCountries = async (_: GetCountries) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/locations/countries',
  });

  return response.data;
};
