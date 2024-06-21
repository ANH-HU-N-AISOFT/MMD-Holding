import { Contract } from '../models/Contract';
import { contracts } from './data';

export type ResponseSuccess = Contract;

interface GetContract {
  id: Contract['id'];
}

export const getContract = async ({ id }: GetContract) => {
  const documentTemplate = contracts.find(item => item.id === id);

  if (!documentTemplate) {
    throw new Error('Registration form not exist');
  }

  return documentTemplate;
};
