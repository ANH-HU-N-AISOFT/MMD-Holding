import { Tree as AntTree, TreeProps as AntTreeProps } from 'antd';
import { SwitcherIcon } from 'antd/es/tree/Tree';
import classNames from 'classnames';
import { isEmpty, nth } from 'ramda';
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
    keys: undefined | string,
    option: undefined | Omit<Leaf<Model>, 'disabled' | 'hidden' | 'parent'>,
  ) => void;
  /** Customize expand/collapse icons for tree nodes (With default rotate angular style). */
  iconExpand?: (props: { expanded: boolean }) => ReactNode;
  /** The keys of the currently selected node. */
  selectedKey?: string;
  /** The keys of the currently expanded nodes. */
  expandedKeys?: string[];
  /** Callback function triggered when a node's expanded state changes. */
  onExpand?: (keys: string[]) => void;
}

/**
 * TreeSelectSingle component that extends the functionality of the Ant Design Tree component
 * by providing additional customization and support for stricter type safety.
 *
 * @template Model - The type of the raw data associated with each leaf.
 * @param {Props<Model>} props - The props for the TreeSelectSingle component.
 * @param {string} [props.className] - The CSS class for styling the tree component.
 * @param {Leaf<Model>[]} props.data - The array of leaf nodes that make up the tree data.
 * @param {string[]} [props.selectedKey] - The keys of the currently selected node.
 * @param {boolean} [props.disabled] - Whether the entire tree is disabled.
 * @param {number} [props.height] - The height of the tree component.
 * @param {number} [props.defaultExpandAll] - Whether to expand all treeNodes by default.
 * @param {Function} [props.onSelect] - Callback function triggered when a node's selected state changes.
 * @param {Function} [props.iconExpand] - Customize expand/collapse icons for tree nodes (With default rotate angular style).
 * @param {Function} [props.expandedKeys] - The keys of the currently expanded nodes.
 * @param {Function} [props.onExpand] - Callback function triggered when a node's expanded state changes.
 * @returns {ReactNode} The rendered TreeSelectSingle component.
 */
export const TreeSelectSingle = <Model,>({
  className,
  data,
  selectedKey,
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
    const value_ = isUndefined ? undefined : (nth(0, keys) as string);
    const option_ = isUndefined ? undefined : nth(0, info.selectedNodes);
    onSelect?.(
      value_,
      option_ ? { label: option_.optionLabel, rawData: option_.rawData, value: option_.optionValue } : undefined,
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
      multiple={false}
      selectable
      showIcon={false}
      showLine={false}
      virtual
      // Customizable props
      defaultExpandAll={defaultExpandAll}
      {...(expandedKeys ? { expandedKeys } : {})}
      onExpand={data => onExpand?.(data as string[])}
      switcherIcon={switcherIcon}
      selectedKeys={selectedKey ? [selectedKey] : []}
      disabled={disabled}
      className={classNames('TreeSelectSingle__container', className)}
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
