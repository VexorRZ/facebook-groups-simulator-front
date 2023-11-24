import React from "react";
import { Navigate } from "react-router-dom";
interface IprivateRouteProps {
  children?: React.ReactNode;
}

export const PrivateRoutes = ({ children }: IprivateRouteProps) => {
  const token = localStorage.getItem("@token");

  return token ? children : <Navigate to="/" replace />;
};

export const PublicRoutes = ({ children }: IprivateRouteProps) => {
  const token = localStorage.getItem("@token");

  return !token ? children : <Navigate to="/dashboard" replace />;
};
