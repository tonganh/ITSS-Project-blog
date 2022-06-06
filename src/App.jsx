import React from "react";
import "./App.css";
import BasicLayout from "./layout/BasicLayout";

const TestComponent = () => {
  return <div>123</div>;
};
function App() {
  // eslint-disable-next-line react/no-children-prop
  return <BasicLayout children={() => <TestComponent />}></BasicLayout>;
}

export default App;
