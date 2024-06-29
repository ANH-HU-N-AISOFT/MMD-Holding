import { CSSProperties, cloneElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Divider, Dropdown, IconNotificationLinear, Typography, useThemeProviderToken } from 'reactjs';
import { getSession } from '~/packages/common/Auth/sessionStorage';

export const Notification = () => {
  const { t } = useTranslation(['dashboard_layout']);
  const session = getSession();
  const { token } = useThemeProviderToken();

  const contentStyle: CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    minWidth: 300,
  };
  const menuStyle: CSSProperties = {
    boxShadow: 'none',
  };

  if (!session) {
    return null;
  }

  return (
    <Dropdown
      arrow={{ pointAtCenter: true }}
      overlayClassName="!top-[52px]"
      placement="bottom"
      getPopupContainer={triggerNode => triggerNode.parentElement || document.body}
      dropdownRender={menu => (
        <div style={contentStyle}>
          {cloneElement(menu as React.ReactElement, {
            style: menuStyle,
          })}
          <Divider style={{ margin: 0 }} />
          <div className="text-center">
            <Button type="link">{t('dashboard_layout:mark_all_as_read')}</Button>
          </div>
        </div>
      )}
      items={[
        {
          key: '1',
          label: (
            <div className="grid grid-cols-1 py-3">
              <Typography.Text className="font-medium">Nguyễn Minh Anh đã chấm dứt hợp đồng</Typography.Text>
              <Typography.Text className="text-xs">4 ngày trước</Typography.Text>
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div className="grid grid-cols-1 py-3">
              <Typography.Text className="font-medium">Nguyễn Minh Anh đã chấm dứt hợp đồng</Typography.Text>
              <Typography.Text className="text-xs">4 ngày trước</Typography.Text>
            </div>
          ),
        },
        {
          key: '3',
          label: (
            <div className="grid grid-cols-1 py-3">
              <Typography.Text className="font-medium">Nguyễn Minh Anh đã chấm dứt hợp đồng</Typography.Text>
              <Typography.Text className="text-xs">4 ngày trước</Typography.Text>
            </div>
          ),
        },
        {
          key: '4',
          label: (
            <div className="grid grid-cols-1 py-3">
              <Typography.Text className="font-medium">Nguyễn Minh Anh đã chấm dứt hợp đồng</Typography.Text>
              <Typography.Text className="text-xs">4 ngày trước</Typography.Text>
            </div>
          ),
        },
      ]}
    >
      <Badge count={5} className="cursor-pointer">
        <IconNotificationLinear className="text-xl" />
      </Badge>
    </Dropdown>
  );
};
