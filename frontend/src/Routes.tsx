import { BrowserRouter as Router, Routes as RoutesComponents, Route} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AskAQuestion from './pages/AskAQuestion';

export const Routes = () => {
    return (
        <Router>
            <RoutesComponents>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="question" element={<AskAQuestion/>}/>
            </RoutesComponents>
        </Router>
    );
};


