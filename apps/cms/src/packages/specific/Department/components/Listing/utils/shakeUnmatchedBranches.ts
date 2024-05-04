import { TreeNodeData } from './leavesToTreeDataNode';

// Quả này hơi khó nên bắt buộc phải mutate
export const shakeUnmatchedBranches = (
  tree: TreeNodeData[],
): { treeShaked: TreeNodeData[]; nodeMatchedIds: string[] } => {
  const nodeMatchedIds: string[] = [];
  const shakeBranch = (node: TreeNodeData): TreeNodeData | null => {
    // Recursively check and shake children
    node.children = node.children.map(shakeBranch).filter(child => child !== null) as TreeNodeData[];

    // If the current node is not matched and has no matched children,
    // return null to indicate this branch should be removed
    if (!node.matched && node.children.every(child => !child.matched)) {
      return null;
    }
    nodeMatchedIds.push(node.generalInformation.id);

    return node;
  };

  // Iterate over the tree and shake each branch
  return {
    treeShaked: tree.map(shakeBranch).filter(node => node !== null) as TreeNodeData[],
    nodeMatchedIds,
  };
};
