import { AxiosResponse } from 'axios';
import { ConsultantForm } from '../models/ConsultantForm';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: ConsultantForm[];
  headers: ServiceHeaderResponse;
}

interface GetConsultantForms {
  page?: number;
  perPage?: number;
  sortByName?: -1 | 1;
  query?: string;
}
export const getConsultantForms = async ({ page, query, perPage, sortByName }: GetConsultantForms) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/courses',
    params: {
      page,
      query,
      perPage,
      sortByName,
    },
  });

  return response.data;
};
