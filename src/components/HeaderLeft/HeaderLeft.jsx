import { Space } from "antd";
import React from "react";
const GlobalHeaderLeft = () => {
  // const className = styles.right;
  return (
    // <Space>
    //   <h1 style={{ marginTop: 0, backgroundColor: "#47a4f5" }}>
    //     <b onClick={() => {}} style={{ cursor: "pointer" }}>
    //       QUẢN LÝ HỆ THỐNG
    //     </b>
    //   </h1>
    // </Space>
    <div style={{ marginTop: 0, backgroundColor: "black", fontSize: "30px" }}>
      <Space>
        <h1 style={{ color: "white" }}>
          <b onClick={() => {}} style={{ cursor: "pointer" }}>
            News project
          </b>
        </h1>
      </Space>
    </div>
  );
};

export default GlobalHeaderLeft;
