import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation } from '@remix-run/react';
import { Button, Layout, Menu } from 'antd';
import { useMemo, useState } from 'react';
import { Logo } from './components/Logo';
import { Notification } from './components/Notification';
import { UserDropdown } from './components/UserDropdown';
import { useGetNavData } from './hooks/useGetNavData';
import { Session } from '~/packages/common/Auth/models/Session';

const { Header, Content, Sider } = Layout;

interface Props {
  session: Session | undefined;
}

export const DashboardLayout = (_: Props) => {
  const menuItems = useGetNavData();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const defaultOpenKeys = useMemo(() => {
    const currentActiveKey = location.pathname;
    const parentMenuItem = menuItems.find(item => {
      return item && 'children' in item && item.children?.some(child => child?.key === currentActiveKey);
    });
    if (parentMenuItem?.key) {
      return [parentMenuItem.key.toString()];
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout className="!min-h-screen">
      <Sider
        width={210}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="py-4 border border-solid border-l-transparent border-t-transparent border-b-transparent border-r-neutral-200"
        theme="light"
      >
        <div className="px-2 mb-4 text-center">
          <Link to="/dashboard">
            <Logo collapsed={collapsed} />
          </Link>
        </div>
        <Menu
          selectedKeys={[location.pathname]}
          theme="light"
          mode="inline"
          items={menuItems}
          defaultOpenKeys={defaultOpenKeys}
        />
      </Sider>
      <Layout>
        <Header className="!bg-white !pl-2 !pr-6">
          <div className="w-full h-full flex items-center justify-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <div className="flex items-center gap-4 lg:gap-8">
              <Notification />
              <UserDropdown />
            </div>
          </div>
        </Header>
        <Content className="p-8 !pb-0">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
