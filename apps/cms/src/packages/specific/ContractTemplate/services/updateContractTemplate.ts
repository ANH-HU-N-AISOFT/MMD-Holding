import { ContractTemplate } from '../models/ContractTemplate';
import { update } from './data';

export interface UpdateContractTemplate {
  id: ContractTemplate['id'];
  data: {
    id: ContractTemplate['id'];
    name: string;
    description: string | undefined | null;
    file: string;
  };
}

export interface ResponseSuccess {}

export const updateContractTemplate = async ({ data, id }: UpdateContractTemplate) => {
  // const response = await fetchApi.request({
  //   method: 'PUT',
  //   url: `/contract-templates/${id}`,
  //   data: data,
  // });
  // return response.data;
  return update(id, data);
};
