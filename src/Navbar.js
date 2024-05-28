
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, logout, isAuthenticated } from './authService.js';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to false initially
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    if (localStorage.getItem('accessToken')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

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

  return (
    <header className="flex justify-center items-center px-4 py-4 w-full text-xs font-medium whitespace-nowrap bg-white shadow-sm max-md:px-2 max-md:max-w-full" style={{ height: 'auto', gap: '10px', boxShadow: '0px 2px 20px 0px #18181826', background: '#FDFDFD' }}>
      <nav className="flex gap-5 justify-between items-center w-full max-w-[1134px] flex-wrap">
        <h1 className="text-base text-neutral-700">Wey</h1>
        {isLoggedIn && (
          <div className="flex gap-5 text-stone-500 max-md:gap-2 flex-wrap">
            {/* <Link to="/" className="flex flex-col justify-center items-center p-1.5 max-md:px-3">
              <img
                 loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1664f17de31a74869a435d8245a5bff6a6099341af5e4e18cffe780333ba51a?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Home icon"
                className="w-8"
              /> */}
              <Link to="/" className="flex flex-col justify-center items-center p-1.5 max-md:px-3">
               <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1664f17de31a74869a435d8245a5bff6a6099341af5e4e18cffe780333ba51a?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Home icon"
                className="w-8"
              />
              <span className="mt-1">Home</span>
            </Link>
              {/* <span className="mt-1">Home</span>
            </Link> */}
            <Link to="/search" className="flex flex-col justify-center items-center px-2.5 py-2.5 text-sm text-purple-600">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a511dbc6da42bdbbb0fd272e92643b13473f380bc6d4fccbdc2a1af2d8ed07d6?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Search icon"
                className="w-6"
              />
              <span className="mt-1">Search</span>
            </Link>
            <Link to="/chat" className="flex flex-col justify-center items-center p-2.5 max-md:px-3">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/111adcdfdb9cf521fbcfcfbd22a8b2e04fef72c425db95c4ff1062b74d214613?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Chat icon"
                className="w-7"
              />
              <span className="mt-1">Chat</span>
            </Link>
            <Link to="/notifications" className="flex flex-col justify-center items-center px-2 py-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/22a444f9d586bdbcb11b510e804529feea918b4648917453af5408c10e4b6f46?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Notification icon"
                className="w-6"
              />
              <span className="mt-1">Notification</span>
            </Link>
          </div>
         
        )}
        <div className="flex gap-4 flex-wrap">
          {isLoggedIn ? (
            <button
              className="justify-center p-2.5 my-auto text-white rounded-md bg-zinc-600 hover:bg-zinc-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-white bg-slate-600 hover:bg-slate-700 mx-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
              </Link>
              <Link to="/signup" className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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





