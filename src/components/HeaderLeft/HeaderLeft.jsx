import { Space } from "antd";
import React from "react";
const GlobalHeaderLeft = () => {
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.replace("/login");
  };
  return (
    // <Space>
    //   <h1 style={{ marginTop: 0, backgroundColor: "#47a4f5" }}>
    //     <b onClick={() => {}} style={{ cursor: "pointer" }}>
    //       QUẢN LÝ HỆ THỐNG
    //     </b>
    //   </h1>
    // </Space>
    <div
      style={{
        marginTop: 0,
        backgroundColor: "black",
        fontSize: "30px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Space>
        <h1 style={{ color: "white" }}>
          <b
            onClick={() => {
              window.location.replace("/home");
            }}
            style={{ cursor: "pointer" }}
          >
            News project
          </b>
        </h1>
      </Space>

      {user && (
        <Space>
          <h1 style={{ color: "white" }}>
            <b
              onClick={() => {
                handleLogout();
              }}
              style={{ cursor: "pointer" }}
            >
              Logout
            </b>
          </h1>
        </Space>
      )}
    </div>
  );
};

export default GlobalHeaderLeft;
