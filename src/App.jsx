import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import SimpleNav from './components/UI/SimpleNav';

const App = () => {
  return (
    <Router>
      <SimpleNav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/' element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;