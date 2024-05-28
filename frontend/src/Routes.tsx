import {
  BrowserRouter as Router,
  Routes as RoutesComponents,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AskAQuestion from "./pages/AskAQuestion";
import AuthForm from "./pages/AuthForm";
import Profile from "./pages/Profile";
import Question from "./pages/Question";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext"; // Make sure you have AuthProvider in your imports

export const Routes = () => {
  return (
    <Router>
      <AuthProvider>
        <RoutesComponents>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm isRegister />} />
          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <AskAQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/:id"
            element={
              <ProtectedRoute>
                <Question />
              </ProtectedRoute>
            }
          />
        </RoutesComponents>
      </AuthProvider>
    </Router>
  );
};
