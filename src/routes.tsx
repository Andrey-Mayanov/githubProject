import Authorization from "components/Authorization";
import NoMatchRoute from "components/NoMatchRoute";
import RepositoriesContainer from "containers/RepositoriesContainer";
import ProtectedPage from "page/ProtectedPage";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedPage>
        <RepositoriesContainer />
      </ProtectedPage>
    ),
  },
  {
    path: "/auth",
    element: <Authorization />,
  },
  { path: "*", element: <NoMatchRoute /> },
];

// sessionStorage - token
