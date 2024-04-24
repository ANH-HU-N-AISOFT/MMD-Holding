import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Typography } from 'antd';
import { useGetAvatarDropdown } from '../hooks/useGetAvatarDropdown';

export const UserDropdown = () => {
  const avatarDropdownItems = useGetAvatarDropdown();
  return (
    <Dropdown menu={{ items: avatarDropdownItems }}>
      <div className="flex items-center gap-2 cursor-pointer">
        <Avatar src="/assets/images/avatar.png" size="large" icon={<UserOutlined />} />
        <div className="flex flex-col">
          <Typography.Text className="font-semibold text-sm">Admin</Typography.Text>
          <Typography.Text className="text-sm">Văn phòng 01</Typography.Text>
        </div>
      </div>
    </Dropdown>
  );
};
