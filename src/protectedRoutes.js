import React, { useContext } from "react";
import { AuthContext } from "../src/states/AuthState";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [, , currentUser] = useContext(AuthContext);

  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
