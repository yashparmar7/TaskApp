import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, role }) => {
    let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
  }
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If role is specified, check if the user has the required role
  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />; // redirect non-admin users
  }

  return children;
};

export default ProtectedRoutes;
