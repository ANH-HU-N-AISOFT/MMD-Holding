import { Tree } from 'antd';
import { nth } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { AntTreeNodeData } from './types/AntTreeNodeData';
import { Leaf } from './types/Leaf';
import { getIdOfParent } from './utils/getIdOfParent';
import { getRoot } from './utils/getRoot';
import { leavesToTreeDataNode } from './utils/leavesToTreeDataNode';
import type { TreeDataNode, TreeProps } from 'antd';

export interface OrganizationStructureProps {
  data: Leaf[];
  onChange?: (id: Leaf['_id']) => void;
  selectedKey?: Leaf['_id'];
}

export const OrganizationStructure = ({ data, selectedKey, onChange }: OrganizationStructureProps) => {
  const [expandedKeys, setExpandedKeys] = useState<Array<Leaf['_id']> | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState<AntTreeNodeData[]>([]);
  const [selectedKeyState, setSelectedKeyState] = useState<Leaf['_id'] | undefined>(selectedKey);

  const treeDataHighlighted = useMemo(() => {
    const loop = (data: AntTreeNodeData[]): TreeDataNode[] => {
      return data.map(item => {
        const title = <Highlighter textToHighlight={item.title} searchWords={[searchValue]} />;
        return { title, key: item.key, children: loop(item.children) };
      });
    };
    return loop(treeData);
  }, [searchValue, treeData]);

  const handleExpand = (newExpandedKeys: Array<Leaf['_id']>) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  // const handleSearch: InputProps['onChange'] = event => setSearchValue(event.target.value);

  const handleSelect: TreeProps['onSelect'] = keys => {
    const key = nth(0, keys);
    if (key) {
      setSelectedKeyState(key.toString());
      onChange?.(key.toString());
    }
  };

  useEffect(() => {
    const newExpandedKeys = data
      .map(item => {
        if (item.label.indexOf(searchValue) > -1) {
          return getIdOfParent(item._id, treeData);
        }
        return null;
      })
      .filter((item, i, self): item is Leaf['_id'] => !!(item && self.indexOf(item) === i));
    setExpandedKeys(newExpandedKeys);
    setSearchValue(searchValue);
    setAutoExpandParent(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, treeData]);

  useEffect(() => {
    setTreeData(leavesToTreeDataNode(data));
    if (!selectedKey) {
      setSelectedKeyState(getRoot(data)?._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setSelectedKeyState(selectedKey);
  }, [selectedKey]);

  return (
    <div>
      {/* <Input prefix={<SearchOutlined />} style={{ marginBottom: 8 }} placeholder="Search" onChange={handleSearch} /> */}
      <Tree<AntTreeNodeData>
        onExpand={handleExpand as any}
        onSelect={handleSelect}
        selectedKeys={selectedKeyState ? [selectedKeyState] : undefined}
        expandedKeys={expandedKeys ?? undefined}
        autoExpandParent={autoExpandParent}
        treeData={treeDataHighlighted as any}
      />
    </div>
  );
};
