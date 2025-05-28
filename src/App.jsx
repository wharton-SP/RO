import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import SimpleNav from './components/UI/SimpleNav';

const App = () => {

  const [theme, setTheme] = useState("Light")

  const handleThemeChange = (isTheme) => {
    console.log(isTheme);
    if (isTheme === "Dark") {
      setTheme("Dark")
    } else {
      setTheme("Light")
    }
  }

  useEffect(() => {
    console.log(theme);
  }, [theme])

  return (
    <Router>
      <SimpleNav handleThemeChange={handleThemeChange} />
      <Routes>
        <Route path="/home" element={<Home theme={theme} />} />
        <Route path='/' element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;