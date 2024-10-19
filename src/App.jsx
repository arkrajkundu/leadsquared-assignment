import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatGrid from './components/CatGrid';
import CatList from './components/CatList';
import CatListInfinite from './components/CatListInfinite'
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Cat Image Fetcher</h1>
        <Routes>
          <Route path='/' element={<CatGrid />} />
          <Route path='/medium' element={<CatList />} />
          <Route path='/hard' element={<CatListInfinite />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
