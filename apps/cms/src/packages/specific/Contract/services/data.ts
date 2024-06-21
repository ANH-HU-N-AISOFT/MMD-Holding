import { localStorage } from 'utilities';
import { Contract } from '../models/Contract';

const KEY = 'contracts';

const defaultRecords: Contract[] = [];
export let contracts: Contract[] = [];

const initialize = () => {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) ?? '');
    contracts = data;
  } catch {
    contracts = defaultRecords;
    localStorage.setItem(KEY, JSON.stringify(defaultRecords));
  }
};
initialize();

export const remove = (index: number) => {
  contracts = [...contracts.slice(0, index), ...contracts.slice(index + 1)];
  localStorage.setItem(KEY, JSON.stringify(contracts));
};

export const add = (record: Contract) => {
  contracts = [record, ...contracts];
  localStorage.setItem(KEY, JSON.stringify(contracts));
};

export const update = (id: Contract['id'], data: Omit<Contract, 'id' | 'createdAt'>) => {
  const index = contracts.findIndex(template => template.id === id);

  if (index === -1) {
    return null;
  }

  const updatedTemplate: Contract = {
    ...contracts[index],
    ...data,
  };

  contracts[index] = updatedTemplate;

  localStorage.setItem(KEY, JSON.stringify(contracts));

  return contracts[index];
};
