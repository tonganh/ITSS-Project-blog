import React, { useCallback, useEffect, useState } from 'react';
import { CloudServerOutlined, DownOutlined } from '@ant-design/icons';
import { Badge, Menu } from 'antd';
import { connect, history } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import type { Dispatch } from 'umi';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  dispatch: Dispatch;
  workspace?: any;
};

const WorkspaceDropdown: React.FC<GlobalHeaderRightProps> = ({ dispatch, workspace }) => {
  const [workspaceSelected, setWorkspaceSelected] = useState(
    localStorage.getItem('workspace') || '',
  );
  useEffect(() => {
    dispatch({
      type: 'systemParamAndWorkspaces/getMyWorkspcaces',
      payload: {
        query: '',
      },
    });
  }, [dispatch]);

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      localStorage.setItem('workspace', key.toString());
      history.go(0);
      setWorkspaceSelected(key.toString());
    },
    [],
  );

  const menuHeaderDropdown = (
    <Menu
      className={styles.menu}
      selectedKeys={[]}
      // @ts-ignore
      onClick={onMenuClick}
    >
      {workspace?.data?.map((item: any) => (
        <Menu.Item key={item.id}>
          <Badge
            status={item.id === parseInt(workspaceSelected, 10) ? 'processing' : 'default'}
            text={item.name}
          />
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <CloudServerOutlined style={{ fontSize: '28px' }} />
        <DownOutlined style={{ fontSize: '12px' }} className="ml--10" />
      </span>
    </HeaderDropdown>
  );
};

export default connect()(WorkspaceDropdown);
