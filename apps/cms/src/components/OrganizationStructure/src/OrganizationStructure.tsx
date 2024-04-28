import { SearchOutlined } from '@ant-design/icons';
import { Input, Tree } from 'antd';
import { nth } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { AntTreeNodeData } from './types/AntTreeNodeData';
import { Leaf } from './types/Leaf';
import { getIdOfParent } from './utils/getIdOfParent';
import { getRoot } from './utils/getRoot';
import { leavesToTreeDataNode } from './utils/leavesToTreeDataNode';
import type { InputProps, TreeDataNode, TreeProps } from 'antd';

const dataList: Leaf[] = [
  {
    _id: '0-0',
    label: '0-0',
    parentId: null,
  },
  {
    _id: '0-0-0',
    label: '0-0-0',
    parentId: '0-0',
  },
  {
    _id: '0-0-0-0',
    label: '0-0-0-0',
    parentId: '0-0-0',
  },
  {
    _id: '0-0-0-1',
    label: '0-0-0-1',
    parentId: '0-0-0',
  },
  {
    _id: '0-0-0-2',
    label: '0-0-0-2',
    parentId: '0-0-0',
  },
  {
    _id: '0-0-1',
    label: '0-0-1',
    parentId: '0-0',
  },
  {
    _id: '0-0-1-0',
    label: '0-0-1-0',
    parentId: '0-0-1',
  },
  {
    _id: '0-0-1-1',
    label: '0-0-1-1',
    parentId: '0-0-1',
  },
  {
    _id: '0-0-1-2',
    label: '0-0-1-2',
    parentId: '0-0-1',
  },
  {
    _id: '0-0-2',
    label: '0-0-2',
    parentId: '0-0',
  },
];

export const OrganizationStructure = () => {
  const [expandedKeys, setExpandedKeys] = useState<Array<Leaf['_id']> | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState<AntTreeNodeData[]>([]);
  const [selectedKey, setSelectedKey] = useState<Leaf['_id']>();

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

  const handleSearch: InputProps['onChange'] = event => setSearchValue(event.target.value);

  const handleSelect: TreeProps['onSelect'] = keys => {
    const key = nth(0, keys);
    if (key) {
      setSelectedKey(key.toString());
    }
  };

  useEffect(() => {
    const newExpandedKeys = dataList
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
  }, [searchValue, treeData]);

  /** FIXME: Get from api */
  useEffect(() => {
    setTreeData(leavesToTreeDataNode(dataList));
    setSelectedKey(getRoot(dataList)?._id);
  }, [dataList]);

  return (
    <div>
      <Input prefix={<SearchOutlined />} style={{ marginBottom: 8 }} placeholder="Search" onChange={handleSearch} />
      <Tree<AntTreeNodeData>
        onExpand={handleExpand as any}
        onSelect={handleSelect}
        selectedKeys={selectedKey ? [selectedKey] : undefined}
        expandedKeys={expandedKeys ?? undefined}
        autoExpandParent={autoExpandParent}
        treeData={treeDataHighlighted as any}
      />
    </div>
  );
};
