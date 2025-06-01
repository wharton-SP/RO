import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import Landing from './pages/Landing';
import SimpleNav from './components/UI/SimpleNav';
import Docs from './pages/Docs';

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
      <AnimatedRoutes theme={theme} />
    </Router>
  );
};

export default App;
