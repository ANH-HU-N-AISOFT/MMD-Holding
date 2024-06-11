import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useMemo } from 'react';

export interface TableActionsProps {
  items: Array<ItemType & { hidden?: boolean }>;
}

export const TableActions = ({ items }: TableActionsProps) => {
  const items_ = useMemo(() => {
    return items.filter(item => !item.hidden);
  }, [items]);
  return (
    <Dropdown menu={{ items: items_ }}>
      <div className="w-6 h-6 rounded-lg inline-flex items-center justify-center border border-solid border-neutral-400 cursor-pointer">
        <MoreOutlined />
      </div>
    </Dropdown>
  );
};
