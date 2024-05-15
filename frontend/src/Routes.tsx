import { BrowserRouter as Router, Routes as RoutesComponents, Route} from 'react-router-dom';
import Home from './pages/Home';

export const Routes = () => {
    return (
        <Router>
            <RoutesComponents>
                <Route path="/" element={<Home/>}/>
            </RoutesComponents>
        </Router>
    );
};


