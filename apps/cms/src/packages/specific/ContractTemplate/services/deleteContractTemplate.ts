import { delay } from 'utilities';
import { ContractTemplate } from '../models/ContractTemplate';
import { contractTemplates, remove } from './data';

export interface DeleteContractTemplate {
  id: ContractTemplate['id'];
}

export const deleteContractTemplate = async ({ id }: DeleteContractTemplate) => {
  // const response = await fetchApi.request({
  //   method: 'DELETE',
  //   url: `/contract-templates/${id}`,
  // });
  // return response.data;

  await delay(500);

  // Find the index of the contract template by ID
  const index = contractTemplates.findIndex(template => template.id === id);

  if (index === -1) {
    return { success: false, message: 'Contract template not found' }; // Return an error message if the contract template is not found
  }

  // Remove the contract template from the array
  remove(index);

  return { success: true, message: 'Contract template deleted successfully' };
};
