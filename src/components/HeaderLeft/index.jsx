import { Space } from "antd";
import React from "react";
import styles from "./index.less";

const GlobalHeaderLeft = () => {
  const className = styles.right;
  return (
    <Space className={className} style={{ cursor: "pointer" }}>
      <h2 onClick={() => {}} style={{ marginTop: 0 }}>
        <b>QUẢN LÝ HỆ THỐNG</b>
      </h2>
    </Space>
  );
};

export default GlobalHeaderLeft;
