/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import type { MenuDataItem } from '@ant-design/pro-layout';
import type { BasicLayoutProps as ProLayoutProps, Settings } from '@ant-design/pro-layout';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { GithubOutlined } from '@ant-design/icons'
// import { Result, Button } from 'antd'
import LeftContent from '@/components/HeaderLeft/index';
import type { ConnectState } from '@/models/connect';
import logo from '../assets/logo.svg';
import { Button, Result } from 'antd';
// import { getMatchMenu } from '@umijs/route-utils';

export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
} & ProLayoutProps;
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};
/** Use Authorized check all menu item */

const listAllowMenu: any = [];
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };

    if (Authorized.check(item.authority, localItem, null)) {
      listAllowMenu.push(Authorized.check(item.authority, localItem, null));
    }

    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = (
  <DefaultFooter copyright={`2021 - Bản quyền thuộc về  QLYC`} links={false} />
);
const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Bạn không có quyền truy cập vào trang này!"
    extra={
      <Button type="primary">
        <Link to="/">Về trang chủ</Link>
      </Button>
    }
  />
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    settings,
    location = {
      pathname: '/',
    },
    children,
  } = props;

  const menuDataRef = useRef<MenuDataItem[]>([]);
  const [menu, setMenu] = useState<any>([]);

  /** Init variables */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  useEffect(() => {
    const arrMenu: any = [];
    menuDataRef?.current.map((item: any) => {
      if (item?.children) {
        item?.children?.map((subItem: any) => arrMenu.push(subItem));
      } else {
        arrMenu.push(item);
      }
      return arrMenu;
    });
    setMenu(arrMenu);
  }, [menuDataRef]);

  const authorized = useMemo(() => {
    return location.pathname !== '/' &&
      location.pathname !== '/tai-khoan' &&
      location.pathname !== '/403' &&
      location.pathname !== '/404'
      ? listAllowMenu
          ?.map((item: any) => item.path.replace(/:id/g, ''))
          .includes(location.pathname?.replace(/[0-9]/g, '')) || {
          authority: 'noAuth',
        }
      : {
          authority: undefined,
        };
  }, [location.pathname, menu, listAllowMenu]);
  const { formatMessage } = useIntl();

  return (
    <SecurityLayout>
      <ProLayout
        logo={logo}
        // formatMessage={formatMessage}
        {...props}
        {...settings}
        onCollapse={handleMenuCollapse}
        // onMenuHeaderClick={() => history.push('/cong-viec')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            !menuItemProps.path ||
            location.pathname === menuItemProps.path
          ) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({ id: 'menu.home' }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => {
          if (settings.footerRender || settings.footerRender === undefined) {
            return defaultFooterDom;
          }
          return null;
        }}
        menuDataRender={menuDataRender}
        menuHeaderRender={() => <LeftContent />}
        rightContentRender={() => <RightContent />}
        postMenuData={(menuData) => {
          menuDataRef.current = menuData || [];
          return menuData || [];
        }}
      >
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
    </SecurityLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
