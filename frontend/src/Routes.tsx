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

export const Routes = () => {
  return (
    <Router>
      <RoutesComponents>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm isRegister />} />
        <Route path="/ask" element={<AskAQuestion />} />
        <Route path="/question" element={<Question />} />
        <Route
          path="/ask"
          element={
            <ProtectedRoute>
              <div>
                <AskAQuestion /> // This is the protected route
              </div>
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
          path="/question"
          element={
            <ProtectedRoute>
              <Question />
            </ProtectedRoute>
          }
        />
        <Route path="/question/:id" element={<Question />} />
      </RoutesComponents>
    </Router>
  );
};
