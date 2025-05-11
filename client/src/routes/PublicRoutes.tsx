import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { type RootState } from "../store/store";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const role = useSelector((state: RootState) => state.user.role);

  if (role === "admin") return <Navigate to="/admin" />;
  if (role === "manager") return <Navigate to="/manager" />;
  if (role === "employee") return <Navigate to="/" />;

  return <>{children}</>;
};

export default PublicRoute;