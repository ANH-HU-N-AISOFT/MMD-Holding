import { Contract } from '../models/Contract';
import { update } from './data';

export interface UpdateContract {
  id: Contract['id'];
  data: Omit<Contract, 'id' | 'createdAt'>;
}

export interface ResponseSuccess {}

export const updateContract = async ({ data, id }: UpdateContract) => {
  return update(id, data);
};
