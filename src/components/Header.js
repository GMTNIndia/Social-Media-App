import React from 'react';
import profileImage from '../assets/profile.jpg';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-4">
        <div className="text-2xl font-bold mb-4 lg:mb-0">Wey</div>
        <nav className="space-x-4 mb-4 lg:mb-0">
          <button className="text-gray-500">Home</button>
          <button className="text-gray-500">Messages</button>
          <button className="text-gray-500">Notifications</button>
          <button className="text-gray-500">Search</button>
        </nav>
        <div>
          <img className="w-10 h-10 rounded-full" src={profileImage} alt="Profile" />
        </div>
      </div>
    </header>
  );
}

export default Header;
