import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Typography } from 'reactjs';
import { useGetAvatarDropdown } from '../hooks/useGetAvatarDropdown';
import { getSession } from '~/packages/common/Auth/sessionStorage';

export const UserDropdown = () => {
  const avatarDropdownItems = useGetAvatarDropdown();
  const session = getSession();

  if (!session) {
    return null;
  }
  return (
    <Dropdown items={avatarDropdownItems}>
      <div className="flex cursor-pointer items-center gap-2">
        <Avatar src={session?.profile?.avatar || '/assets/images/avatar.png'} size="large" icon={<UserOutlined />} />
        <div className="flex flex-col">
          <Typography.Text className="text-sm font-semibold">{session?.profile?.fullName}</Typography.Text>
          <Typography.Text className="text-sm">{session?.profile?.organizationName}</Typography.Text>
        </div>
      </div>
    </Dropdown>
  );
};
