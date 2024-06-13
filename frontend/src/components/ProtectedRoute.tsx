import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  console.log("ProtectedRoute isAuthenticated:", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default ProtectedRoute;
