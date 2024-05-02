import { AxiosResponse } from 'axios';
import { City } from '../models/Location';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: City[];
  headers: ServiceHeaderResponse;
}

interface GetCountries {}
export const getCountries = async (_: GetCountries) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/locations/countries',
  });

  return response.data;
};
