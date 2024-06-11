

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import manish from '../components/profile.jpg';

function RightSidebar() {
  const [followingUsers, setFollowingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
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
  }, [token, userId]);

  const handleFollow = (targetUserId) => {
    setLoadingStatus(prevState => ({
      ...prevState,
      [targetUserId]: true
    }));

    axios.post(`http://127.0.0.1:8000/api/users/${targetUserId}/follow/`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setFollowingUsers(prevState => [...prevState, response.data]);
    })
    .catch(error => {
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

  const isFollowing = (userId) => followingUsers.some(user => user.id === userId);
  const followingUsernames = followingUsers.map(user => user.username);

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
              {isFollowing(user.id) ? (
                <>
                <button 
                    className="text-sm text-green-600 px-4 py-2 rounded bg-green-600 text-white"
                    // onClick={() => handleSendMessage(user.id)}
                    disabled={loadingStatus[user.id]}
                  >
                    following
                  </button>
                  <button 
                    className="text-sm text-green-600 px-4 py-2 m-1 rounded bg-black  text-white px-4 py-2 rounded bg-red-600 text-white"
                    onClick={() => handleUnfollow(user.id)}
                    disabled={loadingStatus[user.id]}
                  >
                    {loadingStatus[user.id] ? 'Loading...' : 'Unfollow'}
                  </button>
                
                </>
              ) : (
                <button 
                  className={`px-4 py-2 rounded bg-purple-600 text-white`}
                  style={{ width: '6rem' }}
                  onClick={() => handleFollow(user.id)}
                  disabled={loadingStatus[user.id]}
                >
                  {loadingStatus[user.id] ? 'Loading...' : 'Follow'}
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default RightSidebar;
