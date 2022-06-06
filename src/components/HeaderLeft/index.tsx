import { Space } from 'antd';
import React from 'react';
import styles from './index.less';

const GlobalHeaderLeft: React.FC = () => {
  const className = styles.right;
  return (
    <Space className={className} style={{ cursor: 'pointer' }}>
      <h1 onClick={() => {}}>
        <b>QUẢN LÝ HỆ THỐNG</b>
      </h1>
    </Space>
  );
};
