import AppHeader from '../appHeader/AppHeader.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {MainPage, ComicsPage, Page404, SingleComicLayout, SingleCharLayout, SinglePage} from './pages/index.js';

import './App.scss';


const App = () => {
    return (   
       <Router>
         <div className="app">
            <AppHeader/>
            <main>
                <Routes>
                    <Route path='/marvel-app' element={<MainPage />}/>
                    <Route path='/comics' element={<ComicsPage />}/>
                    <Route path='/comics/:itemId' element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                    <Route path='/marvel-app/:itemId' element={<SinglePage Component={SingleCharLayout} dataType='char'/>}/>
                    <Route path='*' element={<Page404/>}/>
                </Routes>
            </main>
        </div>
       </Router>     
    )
}


export default App;