import React from "react";
import { Routes, Route } from "react-router-dom";
import RepositoriesContainer from "containers/RepositoriesContainer";
import Authorization from "components/Authorization";
import NoMatchRoute from "components/NoMatchRoute";
import Layout from "page/Layout";
import ProtectedPage from "page/ProtectedPage";

const routes = [
  {
    path: "/",
    isProtected: true,
    Layout: Layout,
    key: "repositories",
    element: <RepositoriesContainer />,
  },
  {
    path: "/auth",
    key: "auth",
    element: <Authorization />,
  },
  { path: "*", key: "noMatchRoute", element: <NoMatchRoute /> },
];

function App() {
  return (
    <Routes>
      {routes.map(({ Layout, element, key, path, isProtected }) => {
        let elementWithWrappers = element;
        if (Layout) {
          elementWithWrappers = <Layout>{elementWithWrappers}</Layout>;
        }
        if (isProtected) {
          elementWithWrappers = (
            <ProtectedPage>{elementWithWrappers}</ProtectedPage>
          );
        }
        return <Route key={key} path={path} element={elementWithWrappers} />;
      })}
    </Routes>
  );
}

export default App;
