// import React from 'react';
// import manish from '../components/manish.jpg';
// function Sidebar() {
//   return (
//     <div className="w-1/4 p-4">
//       <div className="bg-white shadow rounded p-4">
//       <div className="flex justify-center">
//   <img src={manish} alt="Profile" className="w-32 h-32" style={{ borderRadius: '100%' }} />
// </div>

//         <h2 className="text-center mt-2 text-lg font-semibold">Code With Manish</h2>
//         <div className="flex justify-center space-x-4 mt-1">
//   <p className="text-sm text-gray-600">50 Followers</p>
//   <p className="text-sm text-gray-600">2 Posts</p>
// </div>


//       </div>
//     </div>
//   );
// }

// export default Sidebar;


// import React from 'react';
// import manish from '../components/manish.jpg';

// function RightSidebar() {
//   return (
//     <div className="w-full md:w-1/4 p-4">
//       <div className="bg-white shadow rounded p-4 mb-4">
//         <h3 className="font-semibold mb-2">People you may know</h3>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <img src={manish} alt="Profile" className="rounded-full w-10 h-10" />
//             <p className="text-sm ml-2 flex-1">Code With Manish</p>
//             <button className="bg-purple-600 text-white px-4 py-2 rounded">Follow</button>
//           </div>
//           <div className="flex items-center justify-between">
//             <img src={manish} alt="Profile" className="rounded-full w-10 h-10" />
//             <p className="text-sm ml-2 flex-1">Code With Sourabh</p>
//             <button className="bg-purple-600 text-white px-4 py-2 rounded">Follow</button>
//           </div>
//           <div className="flex items-center justify-between">
//             <img src={manish} alt="Profile" className="rounded-full w-10 h-10" />
//             <p className="text-sm ml-2 flex-1">Code With Sanyam</p>
//             <button className="bg-purple-600 text-white px-4 py-2 rounded">Follow</button>
//           </div>
//           <div className="flex items-center justify-between">
//             <img src={manish} alt="Profile" className="rounded-full w-10 h-10" />
//             <p className="text-sm ml-2 flex-1">Code With Sahil</p>
//             <button className="bg-purple-600 text-white px-4 py-2 rounded">Follow</button>
//           </div>
//           <div className="flex items-center justify-between">
//             <img src={manish} alt="Profile" className="rounded-full w-10 h-10" />
//             <p className="text-sm ml-2 flex-1">Code With Monti</p>
//             <button className="bg-purple-600 text-white px-4 py-2 rounded">Follow</button>
//           </div>
//         </div>
//       </div>
//       <div className="bg-white shadow rounded p-4">
//         <h3 className="font-semibold mb-2">Trends</h3>
//         <ul className="space-y-2">
//           <li><a href="#" className="text-purple-600 text-sm">#Expressjs</a></li>
//           <li><a href="#" className="text-purple-600 text-sm">#Nextjs</a></li>
//           <li><a href="#" className="text-purple-600 text-sm">#Reactjs</a></li>
//           <li><a href="#" className="text-purple-600 text-sm">#GenerativeAI</a></li>
//           <li><a href="#" className="text-purple-600 text-sm">#Postman</a></li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default RightSidebar;



import React from 'react';
import manish from '../components/manish.jpg';

function Sidebar() {
  return (
    <div className="w-full md:w-1/4 p-4">
      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-center">
          <img src={manish} alt="Profile" className="rounded-full h-36 w-36 overflow-hidden" />
        </div>
        <h2 className="text-center mt-2 text-lg font-semibold ">Code With Manish</h2>
        <div className="flex justify-between space-x-4 mt-4">
          <p className="text-sm text-gray-600">50 Followers</p>
          <p className="text-sm text-gray-600">2 Posts</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
