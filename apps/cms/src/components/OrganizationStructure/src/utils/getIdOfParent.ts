import { TreeDataNode } from 'antd';
import { Leaf } from '../types/Leaf';

export const getIdOfParent = (_id: Leaf['_id'], tree: TreeDataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === _id)) {
        parentKey = node.key;
      } else if (getIdOfParent(_id, node.children)) {
        parentKey = getIdOfParent(_id, node.children);
      }
    }
  }
  return parentKey!;
};
