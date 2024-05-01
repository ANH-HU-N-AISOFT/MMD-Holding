import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import classNames from 'classnames';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useMobile } from 'reactjs';
import { Logo } from './components/Logo';
import { Notification } from './components/Notification';
import { UserDropdown } from './components/UserDropdown';
import { useGetNavData } from './hooks/useGetNavData';
import { getTabActiveWithLocation } from './utils/getTabActiveWithLocation';
import { Link, Outlet, useLocation } from '~/overrides/@remix';

const { Header, Content, Sider } = Layout;

export const DashboardLayout = () => {
  const menuItems = useGetNavData();
  const location = useLocation();

  const { isMobile } = useMobile();

  const [collapsed, setCollapsed] = useState(false);

  const defaultOpenKeys = useMemo(() => {
    const currentActiveKey = location.pathname;
    const parentMenuItem = menuItems.find(item => {
      return (
        item &&
        'children' in item &&
        item.children?.some(child => child?.key && currentActiveKey.startsWith(child?.key.toString()))
      );
    });
    if (parentMenuItem?.key) {
      return [parentMenuItem.key.toString()];
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCollapseMenu = () => {
    setCollapsed(isMobile ? true : !collapsed);
  };
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  return (
    <Layout className="!h-screen overflow-hidden">
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
          selectedKeys={[getTabActiveWithLocation(location)]}
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
              onClick={handleCollapseMenu}
              className={classNames(isMobile ? 'invisible' : 'visible')}
            />
            <div className="flex items-center gap-4 lg:gap-8">
              <Notification />
              <UserDropdown />
            </div>
          </div>
        </Header>
        <Content className="p-4 md:p-8 !pb-0 overflow-y-auto">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};
