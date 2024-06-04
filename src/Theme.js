// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [color, setColor] = useState(localStorage.getItem('themeColor') || '#FDFDFD');

  useEffect(() => {
    document.documentElement.style.setProperty('--main-bg-color', color);
    localStorage.setItem('themeColor', color);
  }, [color]);

  return (
    <ThemeContext.Provider value={{ color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
