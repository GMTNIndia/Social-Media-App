import React from 'react';
// import {NavList }from './Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './auth/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Nopage from './auth/Nopage';
import Navbar from './Navbar';
import SearchBar from './components/SearchBar';
function App() {
  return (
   <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<Nopage/>} />
        <Route path="/searchbar" element={<SearchBar/>} />
      
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;