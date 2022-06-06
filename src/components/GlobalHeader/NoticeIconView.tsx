import React, { Component } from 'react';
import type { ConnectProps } from 'umi';
import { connect } from 'umi';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import type { NoticeItem } from '@/models/global';
import type { CurrentUser } from '@/models/user';
import type { ConnectState } from '@/models/connect';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  notices?: any;
  currentUser?: CurrentUser;
  fetchingNotices?: boolean;
  fetchingRead?: boolean;
  fetchingReadAll?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
} & Partial<ConnectProps>;

class GlobalHeaderRight extends Component<GlobalHeaderRightProps> {
  componentDidMount() {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  }

  changeReadState = (clickedItem: any): void => {
    const { id } = clickedItem;
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'global/changeNoticeReadState',
        payload: {
          id,
        },
      });
    }
  };

  handleNoticeClear = () => {
    // const { dispatch } = this.props;

    // if (dispatch) {
    //   dispatch({
    //     type: 'global/clearNotices',
    //   });
    // }
    console.log('xem tat ca');
  };

  getNoticeData = (): Record<string, NoticeItem[]> => {
    const { notices = [] } = this.props;

    if (!notices || notices?.data?.data.length === 0 || !Array.isArray(notices?.data?.data)) {
      return {};
    }

    const newNotices = notices?.data?.data?.map((notice: any) => {
      const newNotice = { ...notice, ...{ isRead: false } };
      if (newNotice.createdAt) {
        newNotice.createdAt = moment(notice.createdAt as string).fromNow();
      }
      if (newNotice.orderId) {
        newNotice.key = newNotice.orderId;
      }
      if (!newNotice.type) {
        newNotice.type = 'NOTICE';
      }
      if (newNotice?.seen) {
        newNotice.read = true;
      }

      return newNotice;
    });

    return groupBy(newNotices, 'type');
  };

  getUnreadData = (noticeData: Record<string, NoticeItem[]>) => {
    const unreadMsg: Record<string, number> = {};
    Object.keys(noticeData).forEach((key) => {
      const value = noticeData[key];

      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }

      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter((item) => !item.read).length;
      }
    });
    return unreadMsg;
  };

  render() {
    const { fetchingNotices, fetchingRead, fetchingReadAll, onNoticeVisibleChange } = this.props;
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);

    return (
      // @ts-ignore
      <NoticeIcon
        className={styles.action}
        count={unreadMsg && unreadMsg.NOTICE}
        onItemClick={(item) => {
          this.changeReadState(item as NoticeItem);
        }}
        loading={fetchingNotices || fetchingRead || fetchingReadAll}
        clearText=""
        // viewMoreText="Xem thêm"
        onClear={this.handleNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        // onViewMore={() => message.info('Nhấn để xem thêm')}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="NOTICE"
          count={unreadMsg.NOTICE}
          list={noticeData.NOTICE}
          title=""
          emptyText="Không có thông báo"
          showViewMore
        />
      </NoticeIcon>
    );
  }
}

export default connect(({ user, global, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  fetchingRead: loading.effects['global/changeNoticeReadState'],
  fetchingReadAll: loading.effects['global/clearNotices'],
  notices: global.notices,
}))(GlobalHeaderRight);
