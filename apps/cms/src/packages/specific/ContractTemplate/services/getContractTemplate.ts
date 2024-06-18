import { AxiosResponse } from 'axios';
import { ContractTemplate } from '../models/ContractTemplate';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = ContractTemplate;

interface GetContractTemplate {
  id: ContractTemplate['id'];
}

export const getContractTemplate = async ({ id }: GetContractTemplate) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/contract-templates/${id}`,
  });
  return response.data;
};
