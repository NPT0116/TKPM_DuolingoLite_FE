import React from "react";
import { Navigate } from "react-router-dom";

export const withRoleProtection = (
  Component: React.FC,
  allowedRoles: string[]
) => {
  return () => {
    const role = localStorage.getItem("role");

    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
