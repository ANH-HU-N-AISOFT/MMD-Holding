import { Department } from '../../../models/Department';

export interface TreeNodeData {
  generalInformation: Department;
  children: TreeNodeData[];
}

export const leavesToTreeDataNode = (data: Department[]): TreeNodeData[] => {
  const map: { [key: string]: TreeNodeData } = {};
  const treeData: TreeNodeData[] = [];

  data.forEach(node => {
    map[node.id] = {
      generalInformation: node,
      children: [],
    };
  });

  // Build the tree structure
  data.forEach(node => {
    const treeNode = map[node.id];
    if (!node.managementUnit?.id) {
      treeData.push(treeNode); // Add root nodes directly to treeData
    } else {
      const parentTreeNode = map[node.managementUnit?.id];
      if (parentTreeNode) {
        parentTreeNode.children = parentTreeNode.children ?? [];
        parentTreeNode.children?.push(treeNode); // Add children to their respective parent nodes
      }
    }
  });

  return treeData;
};
