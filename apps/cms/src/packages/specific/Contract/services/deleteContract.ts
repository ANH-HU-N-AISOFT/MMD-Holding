import { delay } from 'utilities';
import { Contract } from '../models/Contract';
import { contracts, remove } from './data';

export interface DeleteContract {
  id: Contract['id'];
}

export const deleteContract = async ({ id }: DeleteContract) => {
  await delay(500);

  const index = contracts.findIndex(template => template.id === id);

  if (index === -1) {
    return { success: false, message: 'Contract not found' };
  }

  remove(index);

  return { success: true, message: 'Contract deleted successfully' };
};
