import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';

import './App.css';

const App = () => {
    return (
        <div>
            <Header title="Amazon" />
            <div>
                <Routes>
                    <Route path="/" element={<Products />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
