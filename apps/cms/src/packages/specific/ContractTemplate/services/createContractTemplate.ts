import { ContractTemplate } from '../models/ContractTemplate';
import { add, contractTemplates } from './data';

export interface CreateContractTemplate {
  name: string;
  description: string | undefined | null;
  file: string;
}

export type ResponseSuccess = ContractTemplate;

export const createContractTemplate = async (data: CreateContractTemplate) => {
  // const response = await fetchApi.request({
  //   method: 'POST',
  //   url: '/contract-templates',
  //   data: data,
  // });
  // return response.data;

  // Find the maximum id in the current contract templates
  const maxId = contractTemplates.reduce((max, template) => Math.max(max, parseInt(template.id)), 0);

  const newContractTemplate: ContractTemplate = {
    id: (maxId + 1).toString(), // Generating a new id based on the max id + 1
    name: data.name,
    description: data.description || '',
    createdAt: new Date().toISOString(),
    file: data.file,
  };

  add(newContractTemplate);

  return newContractTemplate;
};
