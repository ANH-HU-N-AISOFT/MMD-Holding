import { ContractTemplate } from '../models/ContractTemplate';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteContractTemplate {
  id: ContractTemplate['id'];
}

export const deleteContractTemplate = async ({ id }: DeleteContractTemplate) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/contract-templates/${id}`,
  });
  return response.data;
};
