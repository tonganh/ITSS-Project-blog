import { ProLayout } from "@ant-design/pro-layout";
import { PageHeader } from "antd";
import React from "react";
import styles from "./index.less";
import LeftContent from "../components/HeaderLeft/index";
const BasicLayout = ({ children }) => {
  const headerStyles = styles.header;

  return (
    <div className="container">
      <div className={headerStyles}>
        <LeftContent />
      </div>
    </div>
  );
};

export default BasicLayout;
