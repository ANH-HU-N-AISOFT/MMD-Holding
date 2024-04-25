import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

interface Props {
  items: ItemType[];
}

export const TableActions = ({ items }: Props) => {
  return (
    <Dropdown menu={{ items }}>
      <div className="w-6 h-6 rounded-lg inline-flex items-center justify-center border border-solid border-neutral-400 cursor-pointer">
        <MoreOutlined />
      </div>
    </Dropdown>
  );
};
