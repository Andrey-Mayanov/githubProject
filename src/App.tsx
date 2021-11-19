import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Authorization from "components/Authorization";
import NoMatchRoute from "components/NoMatchRoute";
import Layout from "page/Layout";
import ProtectedPage from "page/ProtectedPage";
import AuthProvider from "contex/AuthProvider";
import { Spin } from "antd";
import styled from "styled-components";

// get users repositories - поиск

// gQL suibscription (вам поставили звёздочку)

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
              <Route path="/" element={<RepositoriesContainer />} />
              <Route
                path="/my-repositories"
                element={<MyRepositoriesContainer />}
              />
              <Route path="*" element={<NoMatchRoute />} />
            </Route>
          </Route>
          <Route path="/auth" element={<Authorization />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
