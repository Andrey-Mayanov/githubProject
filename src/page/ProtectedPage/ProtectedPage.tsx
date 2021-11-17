import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const ProtectedPage = ({ children }: Props) => {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedPage;
