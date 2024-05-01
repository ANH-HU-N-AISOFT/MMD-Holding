import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Typography } from 'antd';
import { useGetAvatarDropdown } from '../hooks/useGetAvatarDropdown';
import { getSession } from '~/packages/common/Auth/sessionStorage';

export const UserDropdown = () => {
  const avatarDropdownItems = useGetAvatarDropdown();
  const session = getSession();
  return (
    <Dropdown menu={{ items: avatarDropdownItems }}>
      <div className="flex items-center gap-2 cursor-pointer">
        <Avatar src={session?.profile?.avatar || '/assets/images/avatar.png'} size="large" icon={<UserOutlined />} />
        <div className="flex flex-col">
          <Typography.Text className="font-semibold text-sm">{session?.profile?.fullName}</Typography.Text>
          <Typography.Text className="text-sm">{session?.profile?.organizationName}</Typography.Text>
        </div>
      </div>
    </Dropdown>
  );
};
