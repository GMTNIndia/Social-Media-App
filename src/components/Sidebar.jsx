

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import manish from '../components/manish.jpg';

// function RightSidebar() {
//   const [users, setUsers] = useState([]);
//   const token = localStorage.getItem('accessToken');
//   const [image, setImage] = useState(null);
//   const [profileImage, setProfileImage] = useState(manish); 
//   useEffect(() => {
//     // Fetch users from the API
//     axios.get('http://127.0.0.1:8000/all-users/', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       setUsers(response.data);
//     })
//     .catch(error => {
//       console.error('There was an error fetching the users!', error);
//     });
//   }, [token]);


//   // useEffect(() => {

//   //   const fetchProfileImage = async () => {
//   //     try {
//   //       const response = await axios.get('http://127.0.0.1:8000/api/profile/photo/retrieve/', {
//   //         headers: {
//   //           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//   //         },
//   //       });
//   //       if (response.data.profile_photo) {
//   //         setProfileImage(response.data.profile_photo);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching profile image:', error.message);
//   //     }
//   //   };
  
//   //   fetchProfileImage();
//   // }, []);
//   const handleFollow = (userId) => {
//     axios.post(`http://127.0.0.1:8000/api/users/${userId}/follow/`, {}, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       console.log('Followed successfully:', response.data);
//       // Optionally, update the UI to reflect the follow status
//     })
//     .catch(error => {
//       console.error('There was an error following the user!', error);
//     });
//   };

//   return (
//     <div className="fixed top-0 right-0 w-full md:w-1/4 p-4 h-full overflow-hidden mt-28">
//       <div className="bg-white shadow rounded p-4 mb-4">
//         <h3 className="font-semibold mb-2">People you may know</h3>
//         <div className="space-y-4 mt-4">
//           {users.map(user => (
//             <div key={user.id} className="flex items-center justify-between">
//               <img 
//               // src={manish}
//               src={user.profile_photo}
              
//                alt="Profile" className="rounded-full w-10 h-10" />
//               <p className="text-sm ml-2 flex-1">{user.username}</p>
//               <button 
//                 className="bg-purple-600 text-white px-4 py-2 rounded"
//                 onClick={() => handleFollow(user.id)}
//               >
//                 Follow
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="bg-white shadow rounded p-4">
//         <h3 className="font-semibold mb-2">Trends</h3>
//         <ul className="space-y-2">
//           <li className='flex items-center justify-between'>
//             <a href="#" className="text-purple-600 text-sm">#Expressjs</a> 
//             <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button>
//           </li>
//           <li className='flex items-center justify-between'>
//             <a href="#" className="text-purple-600 text-sm">#Nextjs</a> 
//             <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button>
//           </li>
//           <li className='flex items-center justify-between'>
//             <a href="#" className="text-purple-600 text-sm">#ReactJs</a> 
//             <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button>
//           </li>
//           <li className='flex items-center justify-between'>
//             <a href="#" className="text-purple-600 text-sm">#GenerativeAI</a> 
//             <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button>
//           </li>
//           <li className='flex items-center justify-between'>
//             <a href="#" className="text-purple-600 text-sm">#Postman</a> 
//             <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default RightSidebar;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import manish from '../components/manish.jpg';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RightSidebar() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('accessToken');
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState('path/to/manish/image'); // Replace with your image path

  useEffect(() => {
    // Fetch users from the API
    axios.get('http://127.0.0.1:8000/all-users/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the users!', error);
    });
  }, [token]);

  const handleFollow = (userId) => {
    axios.post(`http://127.0.0.1:8000/api/users/${userId}/follow/`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Followed successfully:', response.data);
      // Optionally, update the UI to reflect the follow status
    })
    .catch(error => {
      console.error('There was an error following the user!', error);
    });
  };

  return (
    <div className="fixed top-0 right-0 w-full md:w-1/4 p-4 h-full overflow-hidden mt-28">
      <div className="bg-white shadow rounded p-4 mb-4 h-full overflow-y-auto">
        <h3 className="font-semibold mb-2">People you may know</h3>
        <div className="space-y-4 mt-4">
          {users.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <img 
                // src={manish}
                src={user.profile_photo}
                alt="Profile" className="rounded-full w-10 h-10" 
              />
              <p className="text-sm ml-2 flex-1">{user.username}</p>
              <button 
                className="bg-purple-600 text-white px-4 py-2 rounded"
                onClick={() => handleFollow(user.id)}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow rounded p-4 h-full overflow-y-auto">
        <h3 className="font-semibold mb-2">Trends</h3>
        <ul className="space-y-2">
          <li className='flex items-center justify-between'>
            <a href="#" className="text-purple-600 text-sm">#Expressjs</a> 
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button>
          </li>
          <li className='flex items-center justify-between'>
            <a href="#" className="text-purple-600 text-sm">#Nextjs</a> 
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button>
          </li>
          <li className='flex items-center justify-between'>
            <a href="#" className="text-purple-600 text-sm">#ReactJs</a> 
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button>
          </li>
          <li className='flex items-center justify-between'>
            <a href="#" className="text-purple-600 text-sm">#GenerativeAI</a> 
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button>
          </li>
          <li className='flex items-center justify-between'>
            <a href="#" className="text-purple-600 text-sm">#Postman</a> 
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Explore</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RightSidebar;
