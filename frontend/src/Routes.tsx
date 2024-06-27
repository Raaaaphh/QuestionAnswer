import {
  BrowserRouter as Router,
  Routes as RoutesComponents,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AskAQuestion from './pages/AskAQuestion';
import Profile from './pages/Profile';
import Question from './pages/Question';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyUserEmail from './components/EmailVerif';
import { AuthProvider } from './context/AuthContext';
import Report from './pages/Report';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import ChangeInfo from './pages/ChangeInfo';
import EditQuestion from './pages/EditQuestion';

export const Routes = () => {
  return (
    <Router>
      <AuthProvider>
        <RoutesComponents>
          <Route path="*" element={<NotFound />} />
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/verify-email" element={<VerifyUserEmail />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reported"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <AskAQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:idUser"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/:idQuest"
            element={
              <ProtectedRoute>
                <Question />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:idUser/change-password"
            element={
              <ProtectedRoute>
                <ChangeInfo isPassword={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:idUser/change-name"
            element={
              <ProtectedRoute>
                <ChangeInfo isPassword={false} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/:idQuest/edit"
            element={
              <ProtectedRoute>
                <EditQuestion />
              </ProtectedRoute>
            }
          />
        </RoutesComponents>
      </AuthProvider>
    </Router>
  );
};
