import { ProLayout } from "@ant-design/pro-layout";
import { PageHeader } from "antd";
import React from "react";
import LeftContent from "../components/HeaderLeft/HeaderLeft";
import Footer from "../components/Footer/Footer";
const BasicLayout = ({ children }) => {
  return (
    <div>
      <div>
        <LeftContent />
      </div>
      <div className="body">{children}</div>
      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default BasicLayout;
