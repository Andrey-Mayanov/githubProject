import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Authorization from "components/Authorization";
import NoMatchRoute from "components/NoMatchRoute";
import Layout from "page/Layout";
import ProtectedPage from "page/ProtectedPage";
import AuthProvider from "contex/AuthProvider";
import { Spin } from "antd";
import styled from "styled-components";
import Todos from "containers/Todos";
import MyIssues from "containers/MyIssues";
import HomeContainer from "containers/HomeContainer";

// кодогенерация запросов - generate gQL hooks from gql

const RepositoriesContainer = lazy(
  () => import("containers/RepositoriesContainer")
);
const MyRepositoriesContainer = lazy(
  () => import("containers/MyRepositoriesContainer")
);

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <SpinWrapper>
            <Spin />
          </SpinWrapper>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route element={<ProtectedPage />}>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/repositories" element={<RepositoriesContainer />} />
              <Route
                path="/my-repositories"
                element={<MyRepositoriesContainer />}
              />
              <Route path="/my-issues" element={<MyIssues />} />
              <Route path="*" element={<NoMatchRoute />} />
            </Route>
          </Route>
          <Route path="/online" element={<Todos />} />
          <Route path="/auth" element={<Authorization />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
