import { Space } from 'antd';
import type { Settings as ProSettings } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import type { ConnectProps } from 'umi';
import { connect } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import NoticeIconView from '@/components/GlobalHeader/NoticeIconView';
import type { ConnectState } from '@/models/connect';
import firebase from '@/firebase.ts';
import ReactHowler from 'react-howler';
import type { Dispatch } from 'umi';

export type GlobalHeaderRightProps = {
  theme?: ProSettings['navTheme'] | 'realDark';
  dispatch: Dispatch;
} & Partial<ConnectProps> &
  Partial<ProSettings>;

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = (props) => {
  const { dispatch, theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const [play, setPlay] = useState(false);

  if (localStorage.getItem('auth') === '["ADMIN"]') {
    const messaging = firebase.messaging();
    messaging
      .getToken({
        vapidKey:
          'BKj3NQuKJmamVKRjWE46J_5aaHqYKKrarqA7PvjTGxKtUf9xSLlZO0hJ9mlw_2Fm52-FbCWUma_yypSogkGROYw',
      })
      .then((currentToken: any) => {
        if (currentToken) {
          dispatch({
            type: 'user/getDeviceToken',
            payload: {
              data: {
                device_token: currentToken,
              },
            },
          });
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err: any) => {
        console.log('An error occurred while retrieving token. ', err);
      });

    messaging.onMessage((payload: any) => {
      // console.log('Message received. ', payload);
      if (payload) {
        dispatch({
          type: 'global/fetchNotices',
        }).then(() => setPlay(true));
      }
    });
  }

  return (
    <div className={className}>
      <ReactHowler
        src="https://thumbs.dreamstime.com/audiothumb_9971/99719042.mp3"
        playing={play}
        preload
        volume={1.0}
      />

      <Space className={className}>
        <NoticeIconView />
        <Avatar />
      </Space>
    </div>
  );
};

export default connect(({ settings, loading }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  fetchingNotices: loading.effects['global/fetchNotices'],
}))(GlobalHeaderRight);
