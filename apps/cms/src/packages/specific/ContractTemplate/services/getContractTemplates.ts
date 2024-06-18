import { AxiosResponse } from 'axios';
import { ContractTemplate } from '../models/ContractTemplate';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: ContractTemplate[];
  headers: ServiceHeaderResponse;
}

interface GetContractTemplates {
  query?: string;
  page?: number;
  perPage?: number;
}
export const getContractTemplates = async ({ page, query, perPage }: GetContractTemplates) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/contract-templates',
    params: {
      page,
      query,
      perPage,
    },
  });

  return response.data;
};
