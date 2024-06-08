// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { SketchPicker } from 'react-color';
// import { login, logout, isAuthenticated } from './authService.js';
// import logo from "./components/images/logo.svg"

// const Header = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [color, setColor] = useState('#FDFDFD'); // Default color
//   const [displayColorPicker, setDisplayColorPicker] = useState(false); // State to control color picker visibility
//   const location = useLocation();
//   const navigate = useNavigate();
//   const accessToken = localStorage.getItem('accessToken');

//   useEffect(() => {
//     if (accessToken) {
//       setIsLoggedIn(true);
//       fetchNotificationCount();
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, [location]);

//   useEffect(() => {
//     // Set theme color
//     document.documentElement.style.setProperty('--main-bg-color', color);
//   }, [color]);
//   const fetchNotificationCount = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       const unreadCount = response.data.filter(notification => !notification.read).length;
//       setNotificationCount(unreadCount);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   const handleLogin = () => {
//     login();
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsLoggedIn(false);
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     navigate('/login');
//   };

//   const handleColorChange = (color) => {
//     setColor(color.hex);
//     document.documentElement.style.setProperty('--main-bg-color', color.hex);
//   };
//   useEffect(() => {
//     // Set theme color
//     document.documentElement.style.setProperty('--main-bg-color', color);
//     localStorage.setItem('themeColor', color); // Save color to local storage
//   }, [color]);

//   const getLinkClass = (path) => {
//     return location.pathname === path ? 'text-blue-600' : '';
//   };

//   return (
//     <header
//       className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-4 py-4 w-full text-xs font-medium whitespace-nowrap shadow-sm max-md:px-2 max-md:max-w-full"
//       style={{ height: 'auto', gap: '10px', boxShadow: '0px 2px 20px 0px #18181826', background: color }}
//     >
//       <nav className="flex gap-5 justify-between items-center w-full max-w-[1134px] flex-wrap">
//         {/* <h1 className="text-base text-neutral-700">manish</h1> */}
//         <img
//                 src={logo}
//                 alt="logo"
//                 // className="w-8"
//               />

//         {isLoggedIn && (
//           <div className="flex gap-5 text-stone-500 max-md:gap-2 flex-wrap">
//             <Link to="/" className={`flex flex-col justify-center items-center p-1.5 max-md:px-3 ${getLinkClass('/')}`}>
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1664f17de31a74869a435d8245a5bff6a6099341af5e4e18cffe780333ba51a?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
//                 alt="Home icon"
//                 className="w-8"
//               />
//               <span className="mt-1">Home</span>
//             </Link>
//             <Link to="/search" className={`flex flex-col justify-center items-center p-1.5 max-md:px-3 ${getLinkClass('/search')}`}>
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/a511dbc6da42bdbbb0fd272e92643b13473f380bc6d4fccbdc2a1af2d8ed07d6?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
//                 alt="Search icon"
//                 className="w-6"
//               />
//               <span className="mt-1">Search</span>
//             </Link>
//             <Link to="/chat" className={`flex flex-col justify-center items-center p-2.5 max-md:px-3 ${getLinkClass('/chat')}`}>
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/111adcdfdb9cf521fbcfcfbd22a8b2e04fef72c425db95c4ff1062b74d214613?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
//                 alt="Chat icon"
//                 className="w-7"
//               />
//               <span className="mt-1">Chat</span>
//             </Link>
//             <Link to="/notification" className={`relative flex flex-col justify-center items-center px-2 py-2.5 ${getLinkClass('/notification')}`}>
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/22a444f9d586bdbcb11b510e804529feea918b4648917453af5408c10e4b6f46?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
//                 alt="Notification icon"
//                 className="w-6"
//               />
//               <span className="mt-1">Notification</span>
//               {notificationCount > 0 && (
//                 <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
//                   {notificationCount}
//                 </span>
//               )}
//             </Link>
//           </div>
//         )}

//         <div className="flex gap-4 items-center">
//           {/* Color Picker Icon */}
//           {/* <button
//             className="p-2.5 text-white rounded-md bg-zinc-600 hover:bg-zinc-700"
//             onClick={() => setDisplayColorPicker(!displayColorPicker)}
//           >
//             🎨
//           </button> */}
//           {displayColorPicker && (
//             <div className="absolute top-16 right-4 z-50">
//               <SketchPicker color={color} onChange={handleColorChange} />
//             </div>
//           )}

//           {isLoggedIn ? (
//             <button
//               className="justify-center p-2.5 my-auto text-white rounded-md bg-zinc-600 hover:bg-zinc-700"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           ) : (
//             <>
//               <Link to="/login" className={`text-white bg-slate-600 hover:bg-slate-700 mx-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${getLinkClass('/login')}`}>
//                 Login
//               </Link>
//               <Link to="/register" className={`text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${getLinkClass('/register')}`}>
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;




import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { login, logout } from './authService.js';
import logo from "./components/images/logo.svg";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [color, setColor] = useState('#FDFDFD'); // Default color
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? 'text-blue-600' : '';
  };

  return (
    <header
      className="fixed top-0 right-0 z-50 flex justify-between items-center px-4 py-4 w-full text-xs font-medium whitespace-nowrap shadow-sm bg-white"
      style={{ height: 'auto', gap: '10px', boxShadow: '0px 2px 20px 0px #18181826', background: color }}
    >
      <div className='flex items-center'>
        <img src={logo} alt="logo" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
      </div>
      
      <div className="hidden md:flex justify-center items-center flex-1">
        <nav className="flex gap-5 items-center">
          {isLoggedIn && (
            <div className="flex gap-5 text-stone-500 flex-wrap justify-center">
              <Link to="/" className={`flex flex-col justify-center items-center p-1.5 ${getLinkClass('/')}`}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1664f17de31a74869a435d8245a5bff6a6099341af5e4e18cffe780333ba51a?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                  alt="Home icon"
                  className="w-8"
                />
                <span className="mt-1">Home</span>
              </Link>
              <Link to="/search" className={`flex flex-col justify-center items-center p-1.5 ${getLinkClass('/search')}`}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a511dbc6da42bdbbb0fd272e92643b13473f380bc6d4fccbdc2a1af2d8ed07d6?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                  alt="Search icon"
                  className="w-8"
                />
                <span className="mt-1">Search</span>
              </Link>
              <Link to="/chat" className={`flex flex-col justify-center items-center p-2.5 ${getLinkClass('/chat')}`}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/111adcdfdb9cf521fbcfcfbd22a8b2e04fef72c425db95c4ff1062b74d214613?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                  alt="Chat icon"
                  className="w-8"
                />
                <span className="mt-1">Chat</span>
              </Link>
              <Link to="/notification" className={`relative flex flex-col justify-center items-center px-2 py-2.5 ${getLinkClass('/notification')}`}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/22a444f9d586bdbcb11b510e804529feea918b4648917453af5408c10e4b6f46?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                  alt="Notification icon"
                  className="w-8"
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
        </nav>
      </div>

      <div className="hidden md:flex items-center">
        {isLoggedIn ? (
          <button
            className="justify-center p-2.5 my-auto text-white rounded-md bg-zinc-600 hover:bg-zinc-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className={`text-white bg-slate-600 hover:bg-slate-700 mx-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${getLinkClass('/login')}`}>
              Login
            </Link>
            <Link to="/register" className={`text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${getLinkClass('/register')}`}>
              Signup
            </Link>
          </div>
        )}
      </div>

      <div className="flex md:hidden items-center">
        <button onClick={toggleMenu} className="text-black">
          <IoMenuSharp className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}>
          <div className="fixed right-0 top-0 bottom-0 w-64 bg-white z-50 p-4" onClick={(e) => e.stopPropagation()}>
            <IoCloseSharp className='flex md:hidden w-5 h-5 right-0' onClick={toggleMenu} />
            {isLoggedIn && (
              <div className="flex flex-col gap-5 text-stone-500">
                <Link to="/" className={`flex items-center p-1.5 ${getLinkClass('/')}`}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1664f17de31a74869a435d8245a5bff6a6099341af5e4e18cffe780333ba51a?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                    alt="Home icon"
                    className="w-8"
                  />
                  <span className="ml-2">Home</span>
                </Link>
                <Link to="/search" className={`flex items-center p-1.5 ${getLinkClass('/search')}`}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a511dbc6da42bdbbb0fd272e92643b13473f380bc6d4fccbdc2a1af2d8ed07d6?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                    alt="Search icon"
                    className="w-6"
                  />
                  <span className="ml-2">Search</span>
                </Link>
                <Link to="/chat" className={`flex items-center p-1.5 ${getLinkClass('/chat')}`}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/111adcdfdb9cf521fbcfcfbd22a8b2e04fef72c425db95c4ff1062b74d214613?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                    alt="Chat icon"
                    className="w-7"
                  />
                  <span className="ml-2">Chat</span>
                </Link>
                <Link to="/notification" className={`relative flex items-center p-1.5 ${getLinkClass('/notification')}`}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/22a444f9d586bdbcb11b510e804529feea918b4648917453af5408c10e4b6f46?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                    alt="Notification icon"
                    className="w-6"
                  />
                  <span className="ml-2">Notification</span>
                  {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {notificationCount}
                    </span>
                  )}
                </Link>
              </div>
            )}
            {isLoggedIn ? (
              <button
                className="mt-4 p-2.5 text-white rounded-md bg-zinc-600 hover:bg-zinc-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                <Link to="/login" className={`text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${getLinkClass('/login')}`}>
                  Login
                </Link>
                <Link to="/register" className={`text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${getLinkClass('/register')}`}>
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

