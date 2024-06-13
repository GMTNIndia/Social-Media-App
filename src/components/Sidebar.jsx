



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Menu } from '@headlessui/react';
import manish from '../components/profile.jpg';

function RightSidebar() {
  const [followingUsers, setFollowingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState({});
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId'); // Assuming the user ID is stored in localStorage

  useEffect(() => {
    if (!userId) return;

    // Fetch the list of users the logged-in user is following
    axios.get(`http://127.0.0.1:8000/api/users/${userId}/following/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (Array.isArray(response.data.following)) {
        setFollowingUsers(response.data.following);
      } else {
        console.error('Following users data is not an array');
      }
    })
    .catch(error => {
      console.error('There was an error fetching the following users!', error);
    });

    // Fetch the list of all users
    axios.get('http://127.0.0.1:8000/all-users/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (Array.isArray(response.data)) {
        setAllUsers(response.data);
      } else {
        console.error('All users data is not an array');
      }
    })
    .catch(error => {
      console.error('There was an error fetching all users!', error);
    });

    // Load blocked users from localStorage
    const blockedUsersFromStorage = JSON.parse(localStorage.getItem('blockedUsers')) || [];
    setBlockedUsers(blockedUsersFromStorage);
  }, [token, userId]);

  // Function to save blocked users to localStorage
  const saveBlockedUsersToStorage = (blockedUsers) => {
    localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
  };

  const handleFollow = (targetUserId) => {
    // Optimistically update the state
    const targetUser = allUsers.find(user => user.id === targetUserId);
    setFollowingUsers(prevState => [...prevState, targetUser]);
    
    setLoadingStatus(prevState => ({
      ...prevState,
      [targetUserId]: true
    }));

    axios.post(`http://127.0.0.1:8000/api/users/${targetUserId}/follow/`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .catch(error => {
      // Revert state if API call fails
      setFollowingUsers(prevState => prevState.filter(user => user.id !== targetUserId));
      console.error('There was an error following the user!', error);
    })
    .finally(() => {
      setLoadingStatus(prevState => ({
        ...prevState,
        [targetUserId]: false
      }));
    });
  };

  const handleUnfollow = (targetUserId) => {
    setLoadingStatus(prevState => ({
      ...prevState,
      [targetUserId]: true
    }));

    axios.post(`http://127.0.0.1:8000/api/users/${targetUserId}/unfollow/`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      setFollowingUsers(prevState => prevState.filter(user => user.id !== targetUserId));
    })
    .catch(error => {
      console.error('There was an error unfollowing the user!', error);
    })
    .finally(() => {
      setLoadingStatus(prevState => ({
        ...prevState,
        [targetUserId]: false
      }));
    });
  };

  const handleBlock = (targetUserId) => {
    // Optimistically update the state
    setBlockedUsers(prevState => [...prevState, targetUserId]);
    
    setLoadingStatus(prevState => ({
      ...prevState,
      [targetUserId]: true
    }));

    axios.post(`http://127.0.0.1:8000/api/users/${targetUserId}/block/`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      // Save updated blocked users to localStorage
      saveBlockedUsersToStorage([...blockedUsers, targetUserId]);
    })
    .catch(error => {
      // Revert state if API call fails
      setBlockedUsers(prevState => prevState.filter(id => id !== targetUserId));
      console.error('There was an error blocking the user!', error);
    })
    .finally(() => {
      setLoadingStatus(prevState => ({
        ...prevState,
        [targetUserId]: false
      }));
    });
  };

  const handleUnblock = (targetUserId) => {
    // Optimistically update the state
    setBlockedUsers(prevState => prevState.filter(id => id !== targetUserId));
    
    setLoadingStatus(prevState => ({
      ...prevState,
      [targetUserId]: true
    }));

    axios.post(`http://127.0.0.1:8000/api/users/${targetUserId}/unblock/`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      // Save updated blocked users to localStorage
      saveBlockedUsersToStorage(blockedUsers.filter(id => id !== targetUserId));
    })
    .catch(error => {
      // Revert state if API call fails
      setBlockedUsers(prevState => [...prevState, targetUserId]);
      console.error('There was an error unblocking the user!', error);
    })
    .finally(() => {
      setLoadingStatus(prevState => ({
        ...prevState,
        [targetUserId]: false
      }));
    });
  };

  const isFollowing = (userId) => followingUsers.some(user => user.id === userId);
  const isBlocked = (userId) => blockedUsers.includes(userId);

  return (
    <div className="hidden lg:block fixed top-0 right-0 w-full lg:w-1/4 p-4 h-full overflow-hidden mt-32">
      <div className="bg-white shadow rounded p-4 mb-4 h-72 overflow-auto">
        <h3 className="font-semibold mb-2">People you may know</h3>
        <div className="space-y-4 mt-4">
          {allUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <img 
                src={user.profile_photo || manish}
                alt="Profile" 
                className="rounded-full w-10 h-10" 
              />
              <p className="text-sm ml-2 flex-1">{user.username}</p>
              {isBlocked(user.id) ? (
                <button 
                  className="px-4 py-2 rounded bg-red-600 text-white"
                  onClick={() => handleUnblock(user.id)}
                  disabled={loadingStatus[user.id]}
                >
                  {loadingStatus[user.id] ? 'Loading...' : 'Unblock'}
                </button>
              ) : isFollowing(user.id) ? (
                <Menu as="div" className="relative">
                  {/* <Menu.Button className="px-4 py-2 rounded bg-green-600 text-white">
                    Following
                  </Menu.Button> */}
                  <Menu.Button className="px-2 py-2 rounded bg-blue-700 text-white" style={{ fontSize: '24px' }}  >
                  {/* <i class="fa-solid fa-caret-up">^</i>    &#x22EE; */}
                  &#x22EE;
                  </Menu.Button>
                  <Menu.Items className="absolute right-1 w-48 top-0 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                  <Menu.Item>
                      <button 
                        className="text-green-600 px-4 py-2 w-full text-left"
                        disabled={loadingStatus[user.id]}
                      >
                        Following
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button 
                        className="text-yellow-600 px-4 py-2 w-full text-left"
                        onClick={() => handleBlock(user.id)}
                        disabled={loadingStatus[user.id]}
                      >
                        {loadingStatus[user.id] ? 'Loading...' : 'Block'}
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button 
                        className="text-red-600 px-4 py-2 w-full text-left"
                        onClick={() => handleUnfollow(user.id)}
                        disabled={loadingStatus[user.id]}
                      >
                        {loadingStatus[user.id] ? 'Loading...' : 'Unfollow'}
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                !isFollowing(user.id) && (
                <button 
                  className="px-4 py-2 rounded bg-purple-600 text-white"
                  onClick={() => handleFollow(user.id)}
                  disabled={loadingStatus[user.id]}
                > 
                  {loadingStatus[user.id] ? 'Loading...' : 'Follow'}
                </button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Menu } from '@headlessui/react';
// import manish from '../components/profile.jpg';

// function RightSidebar() {
//   const [followingUsers, setFollowingUsers] = useState([]);
//   const [allUsers, setAllUsers] = useState([]);
//   const [blockedUsers, setBlockedUsers] = useState([]);
//   const [loadingStatus, setLoadingStatus] = useState({});
//   const token = localStorage.getItem('accessToken');
//   const userId = localStorage.getItem('userId'); // Assuming the user ID is stored in localStorage

//   useEffect(() => {
//     if (!userId) return;

//     // Fetch the list of users the logged-in user is following
//     axios.get(`http://127.0.0.1:8000/api/users/${userId}/following/`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       if (Array.isArray(response.data.following)) {
//         setFollowingUsers(response.data.following);
//       } else {
//         console.error('Following users data is not an array');
//       }
//     })
//     .catch(error => {
//       console.error('There was an error fetching the following users!', error);
//     });

//     // Fetch the list of all users
//     axios.get('http://127.0.0.1:8000/all-users/', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       if (Array.isArray(response.data)) {
//         setAllUsers(response.data);
//       } else {
//         console.error('All users data is not an array');
//       }
//     })
//     .catch(error => {
//       console.error('There was an error fetching all users!', error);
//     });

//     // Load blocked users from localStorage
//     const blockedUsersFromStorage = JSON.parse(localStorage.getItem('blockedUsers')) || [];
//     setBlockedUsers(blockedUsersFromStorage);
//   }, [token, userId]);

//   // Function to save blocked users to localStorage
//   const saveBlockedUsersToStorage = (blockedUsers) => {
//     localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
//   };

//   const handleFollow = (targetUserId) => {
//     // Optimistically update the state
//     const targetUser = allUsers.find(user => user.id === targetUserId);
//     setFollowingUsers(prevState => [...prevState, targetUser]);
    
//     setLoadingStatus(prevState => ({
//       ...prevState,
//       [targetUserId]: true
//     }));

//     axios.post(`http://127.0.0.1:8000/api/users/${targetUserId}/follow/`, {}, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(() => {
//       // After successful follow, update UI to show action button
//       setFollowingUsers(prevState => {
//         return prevState.map(user => {
//           if (user.id === targetUserId) {
//             return { ...user, following: true };
//           }
//           return user;
//         });
//       });
//     })
//     .catch(error => {
//       // Revert state if API call fails
//       setFollowingUsers(prevState => prevState.filter(user => user.id !== targetUserId));
//       console.error('There was an error following the user!', error);
//     })
//     .finally(() => {
//       setLoadingStatus(prevState => ({
//         ...prevState,
//         [targetUserId]: false
//       }));
//     });
//   };

//   const handleUnfollow = (targetUserId) => {
//     setLoadingStatus(prevState => ({
//       ...prevState,
//       [targetUserId]: true
//     }));

//     axios.post(`http://127.0.0.1:8000/api/users/${targetUserId}/unfollow/`, {}, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(() => {
//       setFollowingUsers(prevState => prevState.filter(user => user.id !== targetUserId));
//     })
//     .catch(error => {
//       console.error('There was an error unfollowing the user!', error);
//     })
//     .finally(() => {
//       setLoadingStatus(prevState => ({
//         ...prevState,
//         [targetUserId]: false
//       }));
//     });
//   };

//   const handleBlock = (targetUserId) => {
//     // Optimistically update the state
//     setBlockedUsers(prevState => [...prevState, targetUserId]);
    
//     setLoadingStatus(prevState => ({
//       ...prevState,
//       [targetUserId]: true
//     }));

//     axios.post(`http://127.0.0.1:8000/api/users/${targetUserId}/block/`, {}, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(() => {
//       // Save updated blocked users to localStorage
//       saveBlockedUsersToStorage([...blockedUsers, targetUserId]);
//     })
//     .catch(error => {
//       // Revert state if API call fails
//       setBlockedUsers(prevState => prevState.filter(id => id !== targetUserId));
//       console.error('There was an error blocking the user!', error);
//     })
//     .finally(() => {
//       setLoadingStatus(prevState => ({
//         ...prevState,
//         [targetUserId]: false
//       }));
//     });
//   };

//   const handleUnblock = (targetUserId) => {
//     // Optimistically update the state
//     setBlockedUsers(prevState => prevState.filter(id => id !== targetUserId));
    
//     setLoadingStatus(prevState => ({
//       ...prevState,
//       [targetUserId]: true
//     }));

//     axios.post(`http://127.0.0.1:8000/api/users/${targetUserId}/unblock/`, {}, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(() => {
//       // Save updated blocked users to localStorage
//       saveBlockedUsersToStorage(blockedUsers.filter(id => id !== targetUserId));
//     })
//     .catch(error => {
//       // Revert state if API call fails
//       setBlockedUsers(prevState => [...prevState, targetUserId]);
//       console.error('There was an error unblocking the user!', error);
//     })
//     .finally(() => {
//       setLoadingStatus(prevState => ({
//         ...prevState,
//         [targetUserId]: false
//       }));
//     });
//   };

//   const isFollowing = (userId) => followingUsers.some(user => user.id === userId);
//   const isBlocked = (userId) => blockedUsers.includes(userId);

//   return (
//     <div className="hidden lg:block fixed top-0 right-0 w-full lg:w-1/4 p-4 h-full overflow-hidden mt-32">
//       <div className="bg-white shadow rounded p-4 mb-4 h-72 overflow-auto">
//         <h3 className="font-semibold mb-2">People you may know</h3>
//         <div className="space-y-4 mt-4">
//           {allUsers.map(user => (
//             <div key={user.id} className="flex items-center justify-between">
//               <img 
//                 src={user.profile_photo || manish}
//                 alt="Profile" 
//                 className="rounded-full w-10 h-10" 
//               />
//               <p className="text-sm ml-2 flex-1">{user.username}</p>
//               {isBlocked(user.id) ? (
//                 <button 
//                   className="px-4 py-2 rounded bg-red-600 text-white"
//                   onClick={() => handleUnblock(user.id)}
//                   disabled={loadingStatus[user.id]}
//                 >
//                   {loadingStatus[user.id] ? 'Loading...' : 'Unblock'}
//                 </button>
//               ) : user.following ? (
//                 <Menu as="div" className="relative">
//                   <Menu.Button className="px-4 py-2 rounded bg-green-600 text-white">
//                     Following
//                   </Menu.Button>
//                   <Menu.Items className="absolute right-1 w-48 top-0 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
//                     <Menu.Item>
//                       <button 
//                         className="text-yellow-600 px-4 py-2 w-full text-left"
//                         onClick={() => handleBlock(user.id)}
//                         disabled={loadingStatus[user.id]}
//                       >
//                         {loadingStatus[user.id] ? 'Loading...' : 'Block'}
//                       </button>
//                     </Menu.Item>
//                     <Menu.Item>
//                       <button 
//                         className="text-red-600 px-4 py-2 w-full text-left"
//                         onClick={() => handleUnfollow(user.id)}
//                         disabled={loadingStatus[user.id]}
//                       >
//                         {loadingStatus[user.id] ? 'Loading...' : 'Unfollow'}
//                       </button>
//                     </Menu.Item>
//                   </Menu.Items>
//                 </Menu>
//               ) : (
//                 <button 
//                   className="px-4 py-2 rounded bg-purple-600 text-white"
//                   onClick={() => handleFollow(user.id)}
//                   disabled={loadingStatus[user.id]}
//                 > 
//                  {loadingStatus[user.id] ? 'Loading...' : 'Follow'}
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RightSidebar;
