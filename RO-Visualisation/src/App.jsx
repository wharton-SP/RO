import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import Landing from './pages/Landing';
import SimpleNav from './components/UI/SimpleNav';
import Docs from './pages/Docs';
import ThemeChanger from './components/UI/ThemeChanger';

const AnimatedRoutes = ({ theme }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/home" element={<Home theme={theme} />} />
        <Route path="/docs" element={<Docs theme={theme} />} />
        <Route path="/" element={<Landing theme={theme} />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [theme, setTheme] = useState("Light");

  const handleThemeChange = (isTheme) => {
    setTheme(isTheme === "Dark" ? "Dark" : "Light");
  };

  return (
    <Router>
      <SimpleNav handleThemeChange={handleThemeChange} />
      <div className='fixed -bottom-20 z-40 left-5'>
        <div className='bg-neutral text-white h-40 p-1 rounded-full'>
          <ThemeChanger handleThemeChange={handleThemeChange} />
        </div>
      </div>
      <AnimatedRoutes theme={theme} />
    </Router>
  );
};

export default App;
