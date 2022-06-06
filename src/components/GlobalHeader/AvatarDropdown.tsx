import type { FC } from 'react';
import { useEffect } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Spin } from 'antd';
import type { Dispatch } from 'umi';
import { history, connect, FormattedMessage } from 'umi';
import type { ProfileT } from '@/pages/Account/data';
import styles from './index.less';

type Props = {
  dispatch: Dispatch;
  accountInfo: any;
  avatar: any;
};

const AvatarDropdown: FC<Props> = ({ dispatch, accountInfo, avatar }) => {
  useEffect(() => {
    dispatch({
      type: 'profile/getAccountInfo',
    });
    dispatch({
      type: 'workspaces/getWorkspaces',
    });
    dispatch({
      type: 'profile/getAvatar',
    });
  }, [dispatch]);

  const onMenuClick = (e: any) => {
    if (e.key === '1') {
      return history.push('/tai-khoan');
    }
    if (e.key === '2') {
      dispatch({
        type: 'auth/logout',
      });
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
      return history.push('/');
    }
    return null;
  };

  return accountInfo && accountInfo?.data?.username ? (
    <Dropdown
      overlayClassName={styles.container}
      overlay={
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
          <Menu.Item key="1">
            <UserOutlined />
            <FormattedMessage id="header.avatar.account" />
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="2">
            <LogoutOutlined />
            <FormattedMessage id="header.avatar.logout" />
          </Menu.Item>
        </Menu>
      }
    >
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          alt="avatar"
          src={avatar?.data}
          icon={<UserOutlined />}
        />

        <span className="anticon">{accountInfo?.data?.fullname}</span>
      </span>
    </Dropdown>
  ) : (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
};

export default connect(({ profile }: { profile: ProfileT }) => ({
  accountInfo: profile.accountInfo,
  avatar: profile.avatar,
}))(AvatarDropdown);
