import React from "react";

const Footer = () => {
  return (
    <div
      className="container-fluid bg-primary text-white"
      style={{
        // position: "absolute",
        bottom: "0",
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        fontSize: "30px",
        backgroundColor: "black",
      }}>
      <div className="py-3">
        <h1 className="mb-0" style={{ color: "white" }}>
          ITSS project
        </h1>
      </div>
    </div>
  );
};

export default Footer;
