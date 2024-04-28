import { Leaf } from './Leaf';

export interface AntTreeNodeData {
  key: Leaf['_id'];
  title: Leaf['label'];
  children: AntTreeNodeData[];
}
