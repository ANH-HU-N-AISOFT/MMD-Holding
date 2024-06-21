import { FormValues } from '../components/FormMutation/FormMutation';
import { Contract } from '../models/Contract';
import { add, contracts } from './data';

export interface CreateContract {
  data: FormValues;
}

export type ResponseSuccess = Contract;

export const createContract = async ({ data }: CreateContract) => {
  const maxId = contracts.reduce((max, template) => Math.max(max, parseInt(template.id)), 0);

  const newDocumentTemplate: Contract = {
    ...data,
    id: (maxId + 1).toString(),
    createdAt: new Date().toISOString(),
  };

  add(newDocumentTemplate);

  return newDocumentTemplate;
};
