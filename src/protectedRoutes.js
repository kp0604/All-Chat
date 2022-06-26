import React, { useContext } from "react";
import { AuthContext } from "../src/states/AuthState";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [, , ,currentUserDb] = useContext(AuthContext);

  return currentUserDb ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
