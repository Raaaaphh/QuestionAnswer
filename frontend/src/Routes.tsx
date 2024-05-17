import { BrowserRouter as Router, Routes as RoutesComponents, Route} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AskAQuestion from './pages/AskAQuestion';
import AuthForm from './pages/AuthForm';
import Profile from './pages/Profile';

export const Routes = () => {
    return (
        <Router>
            <RoutesComponents>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/login" element={<AuthForm />} />
                <Route path="/register" element={<AuthForm isRegister />} />
                <Route path="/question" element={<AskAQuestion/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </RoutesComponents>
        </Router>
    );
};


