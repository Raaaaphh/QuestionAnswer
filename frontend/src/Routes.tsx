<<<<<<< HEAD
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
=======
import { BrowserRouter as Router, Routes as RoutesComponents, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AskAQuestion from './pages/AskAQuestion';
import AuthForm from './pages/AuthForm';
import Profile from './pages/Profile';
import Question from './pages/Question';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext'; // Make sure you have AuthProvider in your imports
>>>>>>> 1fc7bfca0f160a6a37935dfc8e7d865cb889045e

export const Routes = () => {
  return (
    <Router>
<<<<<<< HEAD
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
=======
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
>>>>>>> 1fc7bfca0f160a6a37935dfc8e7d865cb889045e
    </Router>
  );
};
