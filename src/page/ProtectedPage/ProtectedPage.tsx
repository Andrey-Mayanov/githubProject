import useAuth from "hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedPage = () => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};

export default ProtectedPage;
