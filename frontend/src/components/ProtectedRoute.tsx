<<<<<<< HEAD
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
=======
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
>>>>>>> 1fc7bfca0f160a6a37935dfc8e7d865cb889045e
  }

  return children;
};

export default ProtectedRoute;
