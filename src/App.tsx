import React from "react";
import { Space, Layout } from "antd";
import "./App.css";
import RepositoriesContainer from "./Containers/RepositoriesContainer";

const { Content } = Layout;

// использовать styled-components
function App() {
  return (
    <Layout className="layout" style={{ height: "100vh" }}>
      <Content style={{ padding: "1rem" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <RepositoriesContainer />
        </Space>
      </Content>
    </Layout>
  );
}

export default App;
