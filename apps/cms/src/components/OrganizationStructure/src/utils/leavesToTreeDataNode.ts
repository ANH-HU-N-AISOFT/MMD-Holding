import { AntTreeNodeData } from '../types/AntTreeNodeData';
import { Leaf } from '../types/Leaf';

export const leavesToTreeDataNode = (data: Leaf[]): AntTreeNodeData[] => {
  const map: { [key: string]: AntTreeNodeData } = {};
  const treeData: AntTreeNodeData[] = [];

  // Create a mapping of IDs to AntTreeNodeData objects
  data.forEach(node => {
    map[node._id] = {
      key: node._id,
      title: node.label,
      children: [],
    };
  });

  // Build the tree structure
  data.forEach(node => {
    const treeNode = map[node._id];
    if (node.parentId === null) {
      treeData.push(treeNode); // Add root nodes directly to treeData
    } else {
      const parentTreeNode = map[node.parentId];
      if (parentTreeNode) {
        parentTreeNode.children = parentTreeNode.children ?? [];
        parentTreeNode.children?.push(treeNode); // Add children to their respective parent nodes
      }
    }
  });

  return treeData;
};
