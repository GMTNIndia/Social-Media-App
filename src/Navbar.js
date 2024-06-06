import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SketchPicker } from 'react-color';
import { login, logout, isAuthenticated } from './authService.js';
import logo from "./components/images/logo.svg"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [color, setColor] = useState('#FDFDFD'); // Default color
  const [displayColorPicker, setDisplayColorPicker] = useState(false); // State to control color picker visibility
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
      fetchNotificationCount();
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  useEffect(() => {
    // Set theme color
    document.documentElement.style.setProperty('--main-bg-color', color);
  }, [color]);
  const fetchNotificationCount = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const unreadCount = response.data.filter(notification => !notification.read).length;
      setNotificationCount(unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleLogin = () => {
    login();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
    document.documentElement.style.setProperty('--main-bg-color', color.hex);
  };
  useEffect(() => {
    // Set theme color
    document.documentElement.style.setProperty('--main-bg-color', color);
    localStorage.setItem('themeColor', color); // Save color to local storage
  }, [color]);

  const getLinkClass = (path) => {
    return location.pathname === path ? 'text-blue-600' : '';
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-4 py-4 w-full text-xs font-medium whitespace-nowrap shadow-sm max-md:px-2 max-md:max-w-full"
      style={{ height: 'auto', gap: '10px', boxShadow: '0px 2px 20px 0px #18181826', background: color }}
    >
      <nav className="flex gap-5 justify-between items-center w-full max-w-[1134px] flex-wrap">
        {/* <h1 className="text-base text-neutral-700">manish</h1> */}
        <img
                src={logo}
                alt="logo"
                // className="w-8"
              />
    
        {isLoggedIn && (
          <div className="flex gap-5 text-stone-500 max-md:gap-2 flex-wrap">
            <Link to="/" className={`flex flex-col justify-center items-center p-1.5 max-md:px-3 ${getLinkClass('/')}`}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1664f17de31a74869a435d8245a5bff6a6099341af5e4e18cffe780333ba51a?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Home icon"
                className="w-8"
              />
              <span className="mt-1">Home</span>
            </Link>
            <Link to="/search" className={`flex flex-col justify-center items-center p-1.5 max-md:px-3 ${getLinkClass('/search')}`}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a511dbc6da42bdbbb0fd272e92643b13473f380bc6d4fccbdc2a1af2d8ed07d6?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Search icon"
                className="w-6"
              />
              <span className="mt-1">Search</span>
            </Link>
            <Link to="/chat" className={`flex flex-col justify-center items-center p-2.5 max-md:px-3 ${getLinkClass('/chat')}`}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/111adcdfdb9cf521fbcfcfbd22a8b2e04fef72c425db95c4ff1062b74d214613?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Chat icon"
                className="w-7"
              />
              <span className="mt-1">Chat</span>
            </Link>
            <Link to="/notification" className={`relative flex flex-col justify-center items-center px-2 py-2.5 ${getLinkClass('/notification')}`}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/22a444f9d586bdbcb11b510e804529feea918b4648917453af5408c10e4b6f46?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Notification icon"
                className="w-6"
              />
              <span className="mt-1">Notification</span>
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {notificationCount}
                </span>
              )}
            </Link>
          </div>
        )}

        <div className="flex gap-4 items-center">
          {/* Color Picker Icon */}
          {/* <button
            className="p-2.5 text-white rounded-md bg-zinc-600 hover:bg-zinc-700"
            onClick={() => setDisplayColorPicker(!displayColorPicker)}
          >
            🎨
          </button> */}
          {displayColorPicker && (
            <div className="absolute top-16 right-4 z-50">
              <SketchPicker color={color} onChange={handleColorChange} />
            </div>
          )}

          {isLoggedIn ? (
            <button
              className="justify-center p-2.5 my-auto text-white rounded-md bg-zinc-600 hover:bg-zinc-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className={`text-white bg-slate-600 hover:bg-slate-700 mx-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${getLinkClass('/login')}`}>
                Login
              </Link>
              <Link to="/register" className={`text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${getLinkClass('/register')}`}>
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;