import AuthorizationForm from "components/AuthorizationForm";
import NoMatchRoute from "components/NoMatchRoute";
import RepositoriesContainer from "containers/RepositoriesContainer";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/repositories",
    element: <RepositoriesContainer />,
  },
  {
    path: "/auth",
    element: <AuthorizationForm />,
  },
  { path: "*", element: <NoMatchRoute /> },
];
