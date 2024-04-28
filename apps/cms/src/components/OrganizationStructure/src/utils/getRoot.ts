import { Leaf } from '../types/Leaf';

export const getRoot = (data: Leaf[]) => {
  return data.find(item => item.parentId === null);
};
