import React, { useState } from 'react';
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="  bg-white shadow rounded p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold">Wey</div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm lg:flex-grow">
            
          </div>
          <div className="flex items-center ">
          <Link to="/login"> 
          <button type="button" class="text-white bg-slate-600 hover:bg-blue-800 mx-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
          </Link>
          <Link to="/register"> 
          <button type="button" class="text-white bg-purple-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Sign Up</button>
            </Link>
            {/* <a
              href="#signup"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400"
            >
              Sign Up
            </a> */}
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
