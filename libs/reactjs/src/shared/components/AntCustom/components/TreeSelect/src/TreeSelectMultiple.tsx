import { Tree as AntTree, TreeProps as AntTreeProps } from 'antd';
import { SwitcherIcon } from 'antd/es/tree/Tree';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ReactNode, useMemo } from 'react';
import { useInitializeContext } from '../../../base';
import { Leaf } from './types/Leaf';
import { TreeDataNode } from './types/TreeDataNode';
import { leavesToAntTreeData } from './utils/leavesToAntTreeData';

export interface Props<Model> extends Pick<AntTreeProps, 'className' | 'disabled' | 'height' | 'defaultExpandAll'> {
  /** The array of leaf nodes that make up the tree data */
  data: Leaf<Model>[];
  /** Callback function triggered when a node's selected state changes. */
  onSelect?: (
    keys: undefined | string[],
    options: undefined | Array<Omit<Leaf<Model>, 'disabled' | 'hidden' | 'parent'>>,
  ) => void;
  /** Customize expand/collapse icons for tree nodes (With default rotate angular style). */
  iconExpand?: (props: { expanded: boolean }) => ReactNode;
  /** The keys of the currently selected nodes. */
  selectedKeys?: string[];
  /** The keys of the currently expanded nodes. */
  expandedKeys?: string[];
  /** Callback function triggered when a node's expanded state changes. */
  onExpand?: (keys: string[]) => void;
}

/**
 * TreeSelectMultiple component that extends the functionality of the Ant Design Tree component
 * by providing additional customization and support for stricter type safety.
 *
 * @template Model - The type of the raw data associated with each leaf.
 * @param {Props<Model>} props - The props for the TreeSelectMultiple component.
 * @param {string} [props.className] - The CSS class for styling the tree component.
 * @param {Leaf<Model>[]} props.data - The array of leaf nodes that make up the tree data.
 * @param {string[]} [props.selectedKeys] - The keys of the currently selected nodes.
 * @param {boolean} [props.disabled] - Whether the entire tree is disabled.
 * @param {number} [props.height] - The height of the tree component.
 * @param {number} [props.defaultExpandAll] - Whether to expand all treeNodes by default.
 * @param {Function} [props.onSelect] - Callback function triggered when a node's selected state changes.
 * @param {Function} [props.iconExpand] - Customize expand/collapse icons for tree nodes (With default rotate angular style).
 * @param {Function} [props.expandedKeys] - The keys of the currently expanded nodes.
 * @param {Function} [props.onExpand] - Callback function triggered when a node's expanded state changes.
 * @returns {ReactNode} The rendered TreeSelectMultiple component.
 */
export const TreeSelectMultiple = <Model,>({
  className,
  data,
  selectedKeys,
  disabled,
  height,
  onSelect,
  iconExpand,
  defaultExpandAll = true,
  expandedKeys,
  onExpand,
}: Props<Model>): ReactNode => {
  useInitializeContext();

  const treeData = useMemo(() => {
    return leavesToAntTreeData(data);
  }, [data]);

  const handleCheck: AntTreeProps<TreeDataNode>['onSelect'] = (keys, info) => {
    const isUndefined = isEmpty(keys) || null;
    onSelect?.(
      isUndefined ? undefined : (keys as string[]),
      isUndefined
        ? undefined
        : info.selectedNodes.map(node => ({
            label: node.optionLabel,
            rawData: node.rawData,
            value: node.optionValue,
            isLeaf: node.isLeaf,
          })),
    );
  };

  const switcherIcon: SwitcherIcon = ({ expanded }) => {
    return iconExpand?.({ expanded: !!expanded });
  };

  return (
    <AntTree<TreeDataNode>
      // Fixed props
      autoExpandParent
      blockNode
      checkable={false}
      draggable={false}
      focusable
      multiple
      selectable
      showIcon={false}
      showLine={false}
      virtual
      // Customizable props
      defaultExpandAll={defaultExpandAll}
      {...(expandedKeys ? { expandedKeys } : {})}
      onExpand={data => onExpand?.(data as string[])}
      switcherIcon={switcherIcon}
      selectedKeys={selectedKeys}
      disabled={disabled}
      className={classNames('TreeSelectMultiple__container', className)}
      height={height}
      treeData={treeData}
      onSelect={handleCheck}
      fieldNames={{
        title: 'optionLabel',
        key: 'optionValue',
      }}
    />
  );
};
