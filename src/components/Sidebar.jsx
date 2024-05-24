import React from 'react';
import manish from '../components/manish.jpg';

function RightSidebar() {
  return (
    <div className="w-full md:w-1/4 p-4">
      <div className="bg-white shadow rounded p-4 mb-4">
        <h3 className="font-semibold mb-2">People you may know</h3>
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <img src={manish} alt="Profile" className="rounded-full w-10 h-10" />
            <p className="text-sm ml-2 flex-1">Code With Manish</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Follow</button>
          </div>
          <div className="flex items-center justify-between">
            <img src={manish} alt="Profile" className="rounded-full w-10 h-10" />
            <p className="text-sm ml-2 flex-1">Code With Sourabh</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Follow</button>
          </div>
          <div className="flex items-center justify-between">
            <img src={manish} alt="Profile" className="rounded-full w-10 h-10" />
            <p className="text-sm ml-2 flex-1">Code With Sanyam</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Follow</button>
          </div>
          <div className="flex items-center justify-between">
            <img src={manish} alt="Profile" className="rounded-full w-10 h-10" />
            <p className="text-sm ml-2 flex-1">Code With Sahil</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Follow</button>
          </div>
          <div className="flex items-center justify-between">
            <img src={manish} alt="Profile" className="rounded-full w-10 h-10" />
            <p className="text-sm ml-2 flex-1">Code With Monti</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Follow</button>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="font-semibold mb-2">Trends</h3>
        <ul className="space-y-2">
          <li className=' flex items-center justify-between'><a href="#" className="text-purple-600 text-sm">#Expressjs</a> <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button></li>
         <li className=' flex items-center justify-between'><a href="#" className="text-purple-600 text-sm">#Nextjs</a> <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button></li>
         <li className=' flex items-center justify-between'><a href="#" className="text-purple-600 text-sm">#ReactJs</a> <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button></li>
         <li className=' flex items-center justify-between'><a href="#" className="text-purple-600 text-sm">#GenerativeAI</a> <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button></li>
          <li className=' flex items-center justify-between'><a href="#" className="text-purple-600 text-sm">#Postman</a> <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button></li>
        </ul>
      </div>
    </div>
  );
}

export default RightSidebar;

