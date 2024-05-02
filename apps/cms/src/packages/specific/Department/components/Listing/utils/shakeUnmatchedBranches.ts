import { TreeNodeData } from './leavesToTreeDataNode';

// Quả này hơi khó nên bắt buộc phải mutate
export const shakeUnmatchedBranches = (tree: TreeNodeData[]): TreeNodeData[] => {
  const shakeBranch = (node: TreeNodeData): TreeNodeData | null => {
    // Recursively check and shake children
    node.children = node.children.map(shakeBranch).filter(child => child !== null) as TreeNodeData[];

    // If the current node is not matched and has no matched children,
    // return null to indicate this branch should be removed
    if (!node.matched && node.children.every(child => !child.matched)) {
      return null;
    }

    return node;
  };

  // Iterate over the tree and shake each branch
  return tree.map(shakeBranch).filter(node => node !== null) as TreeNodeData[];
};
