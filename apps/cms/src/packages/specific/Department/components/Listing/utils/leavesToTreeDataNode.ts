import { Department } from '../../../models/Department';
import { ListingSearchParams } from '../../../types/ListingSearchParams';

export interface TreeNodeData {
  generalInformation: Department;
  children: TreeNodeData[];
  matched: boolean;
}

export const leavesToTreeDataNode = (data: Department[], searchParams: ListingSearchParams): TreeNodeData[] => {
  const inSearchOrFilterMode = searchParams.businessStatus || searchParams.search;
  const map: { [key: string]: TreeNodeData } = {};
  const treeData: TreeNodeData[] = [];

  data.forEach(node => {
    map[node.id] = {
      generalInformation: node,
      children: [],
      matched: inSearchOrFilterMode ? false : true,
    };
  });

  // Build the tree structure
  data.forEach(node => {
    const treeNode = map[node.id];
    // Xét nút đang xét thoả mãn điều kiện search hay không
    if (searchParams.businessStatus && treeNode.generalInformation.businessStatus === searchParams.businessStatus) {
      treeNode.matched = true;
    }
    if (
      searchParams.search &&
      (treeNode.generalInformation.name.includes(searchParams.search) ||
        treeNode.generalInformation.code.includes(searchParams.search))
    ) {
      treeNode.matched = true;
    }

    if (!node.managementUnit?.id || node.code === 'ROOT') {
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
