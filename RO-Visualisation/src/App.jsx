import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import SimpleNav from './components/UI/SimpleNav';
import Docs from './pages/Docs';

const App = () => {

  const [theme, setTheme] = useState("Light")

  const handleThemeChange = (isTheme) => {
    if (isTheme === "Dark") {
      setTheme("Dark")
    } else {
      setTheme("Light")
    }
  }

  return (
    <Router>
      <SimpleNav handleThemeChange={handleThemeChange} />
      <Routes>
        <Route path="/home" element={<Home theme={theme} />} />
        <Route path="/docs" element={<Docs theme={theme} />} />
        <Route path='/' element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;