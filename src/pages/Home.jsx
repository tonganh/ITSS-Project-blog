import React from "react";
import BasicLayout from "../layout/BasicLayout";

const TestComponent = () => {
  return <div>12123</div>;
};

const HomePage = () => {
  return (
    <BasicLayout>
      <TestComponent />
    </BasicLayout>
  );
};

export default HomePage;
