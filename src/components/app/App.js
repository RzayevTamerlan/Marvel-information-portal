import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { lazy } from 'react';

import MainPage  from '../pages/MainPage';
import AppHeader from "../appHeader/AppHeader";
import SingleComicPage from '../pages/SingleComicPage';
import SingleCharacterLayout from '../pages/SingleCharacterLayout';

const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Page404 = lazy(() => import('../pages/404'));
const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route  path="/comics" element={<ComicsPage/>}>
                        </Route>
                        <Route  path="/comics/:comicId" element={<SingleComicPage/>}>
                        </Route>
                        <Route  path="/characters/:Id" element={<SingleCharacterLayout/>}>
                        </Route>
                        <Route  path="/" element={<MainPage/>}>
                        </Route>
                        <Route path="*" element={<Page404/>}>
                        </Route>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;