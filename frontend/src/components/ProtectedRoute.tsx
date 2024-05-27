import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  console.log("Token in ProtectedRoute:", token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
