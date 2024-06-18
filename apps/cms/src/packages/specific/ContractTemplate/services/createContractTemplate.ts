import { ContractTemplate } from '../models/ContractTemplate';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateContractTemplate {
  name: string;
  description: string | undefined | null;
  file: string;
}

export type ResponseSuccess = ContractTemplate;

export const createContractTemplate = async (data: CreateContractTemplate) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/contract-templates',
    data: data,
  });
  return response.data;
};
