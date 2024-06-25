import { MoreOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { Dropdown, DropdownMenuItem } from '../../AntCustom';

export interface Props {
  items: Array<DropdownMenuItem & { hidden?: boolean }>;
}

export const TableActions = ({ items }: Props) => {
  const items_ = useMemo(() => {
    return items.filter(item => !item.hidden);
  }, [items]);
  return (
    <Dropdown items={items_}>
      <div className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border border-solid border-neutral-400">
        <MoreOutlined />
      </div>
    </Dropdown>
  );
};
