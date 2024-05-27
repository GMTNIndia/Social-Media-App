
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { login, logout, isAuthenticated } from './authService.js';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLogin = () => {
    login();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <header className="flex justify-center items-center px-16 py-4 w-full text-xs font-medium whitespace-nowrap bg-white shadow-sm max-md:px-5 max-md:max-w-full" style={{ height: '90px', gap: '0px', opacity: '0px', boxShadow: '0px 2px 20px 0px #18181826', background: '#FDFDFD' }}>
      <nav className="flex gap-5 justify-between items-center w-full max-w-[1134px] max-md:flex-wrap max-md:max-w-full">
        <h1 className="self-stretch my-auto text-base text-neutral-700">Wey</h1>
        {isLoggedIn && (
          <div className="flex gap-2 self-stretch text-stone-500">
            <Link to="/" className="flex flex-col justify-center p-1.5 max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1664f17de31a74869a435d8245a5bff6a6099341af5e4e18cffe780333ba51a?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Home icon"
                className="self-center aspect-[1.41] w-[34px]"
              />
              <span className="mt-2">Home</span>
            </Link>
            <Link to="/search" className="flex flex-col justify-center px-2.5 py-2.5 text-sm text-purple-600">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a511dbc6da42bdbbb0fd272e92643b13473f380bc6d4fccbdc2a1af2d8ed07d6?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Search icon"
                className="self-center w-6 aspect-square"
              />
              <span className="mt-2">Search</span>
            </Link>
            <Link to="/chat" className="flex flex-col justify-center p-2.5 max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/111adcdfdb9cf521fbcfcfbd22a8b2e04fef72c425db95c4ff1062b74d214613?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Chat icon"
                className="self-center w-7 aspect-[1.16]"
              />
              <span className="mt-2">Chat</span>
            </Link>
            <Link to="/notifications" className="flex flex-col justify-center px-2 py-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/22a444f9d586bdbcb11b510e804529feea918b4648917453af5408c10e4b6f46?apiKey=87da4b67ae5046fdba58e532f6a97e48&"
                alt="Notification icon"
                className="self-center w-6 aspect-square"
              />
              <span className="mt-2">Notification</span>
            </Link>
          </div>
        )}
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/login" className="text-white bg-slate-600 hover:bg-blue-800 mx-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleLogin}>
              
                    Login
              
              </Link>
              <Link to="/signup" className="text-white bg-purple-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Signup
              </Link>
             
            </>
            
          ) : (
            <button
              className="justify-center self-stretch p-2.5 my-auto text-white rounded-md bg-zinc-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="  bg-white shadow rounded p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-black text-lg font-bold">Wey</div>
//         <div className="block lg:hidden">
//           <button
//             onClick={toggleMenu}
//             className="text-white focus:outline-none"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               ></path>
//             </svg>
//           </button>
//         </div>
//         <div
//           className={`${
//             isOpen ? 'block' : 'hidden'
//           } w-full lg:flex lg:items-center lg:w-auto`}
//         >
//           <div className="text-sm lg:flex-grow">
            
//           </div>
//           <div className="flex items-center ">
//           <Link to="/login"> 
//           <button type="button" class="text-white bg-slate-600 hover:bg-blue-800 mx-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
//           </Link>
//           <Link to="/register"> 
//           <button type="button" class="text-white bg-purple-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Sign Up</button>
//             </Link>
//             {/* <a
//               href="#signup"
//               className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400"
//             >
//               Sign Up
//             </a> */}
            
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
