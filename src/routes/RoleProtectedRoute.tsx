import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (!role || !allowedRoles.includes(role))
    return <Navigate to="/unauthorized" />;

  return children;
};

export default RoleProtectedRoute;
