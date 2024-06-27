import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Button, AntRawLayout, AntRawMenu } from 'reactjs';
import { useMobile } from 'reactjs';
import { Logo } from './components/Logo';
import { Notification } from './components/Notification';
import { UserDropdown } from './components/UserDropdown';
import { useGetNavData } from './hooks/useGetNavData';
import { getTabActiveWithLocation } from './utils/getTabActiveWithLocation';
import { Link, Outlet, useLocation } from '~/overrides/remix';
import './styles.css';

const { Header, Content, Sider } = AntRawLayout;

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
    <AntRawLayout>
      <Sider
        width={240}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="Sidebar__container !sticky left-0 top-0 !h-[100dvh] border border-solid border-y-transparent border-l-transparent border-r-neutral-200 py-4 !pb-0"
        theme="light"
      >
        <div className="mb-4 px-2 text-center">
          <Link to="/dashboard">
            <Logo collapsed={collapsed} />
          </Link>
        </div>
        <AntRawMenu
          inlineIndent={23}
          selectedKeys={[getTabActiveWithLocation(location)]}
          theme="light"
          mode="inline"
          items={menuItems}
          defaultOpenKeys={defaultOpenKeys}
        />
      </Sider>
      <AntRawLayout className="!min-h-[100dvh]">
        <Header className="sticky left-0 top-0 z-10 border-solid border-transparent border-b-neutral-200 !bg-white !pl-2 !pr-6 shadow-sm">
          <div className="flex h-full w-full items-center justify-between">
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
        <Content className="p-4 !pb-0 md:p-8">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Content>
      </AntRawLayout>
    </AntRawLayout>
  );
};
