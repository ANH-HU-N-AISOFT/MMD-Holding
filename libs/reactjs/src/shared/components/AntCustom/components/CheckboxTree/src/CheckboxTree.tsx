import { Tree as AntTree, TreeProps as AntTreeProps } from 'antd';
import { SwitcherIcon } from 'antd/es/tree/Tree';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ReactNode, useMemo } from 'react';
import { useInitializeContext } from '../../../base';
import { Leaf } from './types/Leaf';
import { TreeDataNode } from './types/TreeDataNode';
import { leavesToAntTreeData } from './utils/leavesToAntTreeData';

export interface Props<Model>
  extends Pick<AntTreeProps, 'className' | 'checkedKeys' | 'disabled' | 'height' | 'defaultExpandAll'> {
  /** The array of leaf nodes that make up the tree data */
  data: Leaf<Model>[];
  /** Callback function triggered when a node's checked state changes. */
  onCheck?: (
    keys: undefined | string[],
    options: undefined | Array<Omit<Leaf<Model>, 'disabled' | 'hidden' | 'parent'>>,
  ) => void;
  /** Customize expand/collapse icons for tree nodes (With default rotate angular style). */
  iconExpand?: (props: { expanded: boolean }) => ReactNode;
  /** The keys of the currently expanded nodes. */
  expandedKeys?: string[];
  /** Callback function triggered when a node's expanded state changes. */
  onExpand?: (keys: string[]) => void;
}

/**
 * CheckboxTree component that extends the functionality of the Ant Design Tree component
 * by providing additional customization and support for stricter type safety.
 *
 * @template Model - The type of the raw data associated with each leaf.
 * @param {Props<Model>} props - The props for the CheckboxTree component.
 * @param {string} [props.className] - The CSS class for styling the tree component.
 * @param {Leaf<Model>[]} props.data - The array of leaf nodes that make up the tree data.
 * @param {string[]} [props.checkedKeys] - The keys of the currently checked nodes.
 * @param {boolean} [props.disabled] - Whether the entire tree is disabled.
 * @param {number} [props.height] - The height of the tree component.
 * @param {number} [props.defaultExpandAll] - Whether to expand all treeNodes by default.
 * @param {Function} [props.onCheck] - Callback function triggered when a node's checked state changes.
 * @param {Function} [props.iconExpand] - Customize expand/collapse icons for tree nodes (With default rotate angular style).
 * @param {Function} [props.expandedKeys] - The keys of the currently expanded nodes.
 * @param {Function} [props.onExpand] - Callback function triggered when a node's expanded state changes.
 * @returns {ReactNode} The rendered CheckboxTree component.
 */
export const CheckboxTree = <Model,>({
  className,
  data,
  checkedKeys,
  disabled,
  height,
  onCheck,
  iconExpand,
  expandedKeys,
  onExpand,
  defaultExpandAll = true,
}: Props<Model>): ReactNode => {
  useInitializeContext();

  const treeData = useMemo(() => {
    return leavesToAntTreeData(data);
  }, [data]);

  const handleCheck: AntTreeProps<TreeDataNode>['onCheck'] = (keys, info) => {
    const isUndefined = isEmpty(keys) || null;
    onCheck?.(
      isUndefined ? undefined : (keys as string[]),
      isUndefined
        ? undefined
        : info.checkedNodes.map(node => ({
            label: node.checkboxLabel,
            rawData: node.rawData,
            value: node.checkboxValue,
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
      checkable
      draggable={false}
      focusable
      multiple={false}
      selectable={false}
      showIcon={false}
      showLine={false}
      virtual
      // Customizable props
      defaultExpandAll={defaultExpandAll}
      {...(expandedKeys ? { expandedKeys } : {})}
      onExpand={data => onExpand?.(data as string[])}
      switcherIcon={switcherIcon}
      checkedKeys={checkedKeys}
      disabled={disabled}
      className={classNames('CheckboxTree__container', className)}
      height={height}
      treeData={treeData}
      onCheck={handleCheck}
      fieldNames={{
        title: 'checkboxLabel',
        key: 'checkboxValue',
      }}
    />
  );
};
