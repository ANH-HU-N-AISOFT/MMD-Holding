import { ContractTemplate } from '../models/ContractTemplate';
import { contractTemplates } from './data';

export type ResponseSuccess = ContractTemplate;

interface GetContractTemplate {
  id: ContractTemplate['id'];
}

export const getContractTemplate = async ({ id }: GetContractTemplate) => {
  // const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
  //   method: 'GET',
  //   url: `/contract-templates/${id}`,
  // });
  // return response.data;

  // Find the contract template by ID
  const contractTemplate = contractTemplates.find(template => template.id === id);

  if (!contractTemplate) {
    throw new Error('Contact template not exist');
  }

  return contractTemplate;
};
