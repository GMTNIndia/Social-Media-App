import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImage from "../components/images/dimg.jpg";

function CardProfile({ profile_photo, username }) {
  return (
    <section className="flex flex-col grow justify-center items-center px-2 py-4 mx-auto w-full text-xs rounded-lg border border-solid bg-zinc-200 border-zinc-200 max-md:mt-5">
      <img
        loading="lazy"
        src={profile_photo ? `http://127.0.0.1:8000${profile_photo}` : defaultImage}
        alt={`Profile of ${username}`}
        className="rounded-full aspect-square w-[98px]"
      />
      <h2 className="mt-2 font-semibold text-neutral-900">{username}</h2>
    </section>
  );
}

function FriendSuggestion({ profile_photo, username, userId, isFollowed, onFollowToggle }) {
  return (
    <div className="flex gap-5 justify-between mt-3.5 w-full">
      <div className="flex gap-2.5 font-medium text-neutral-900">
        <img
          loading="lazy"
          src={profile_photo ? `http://127.0.0.1:8000${profile_photo}` : defaultImage}
          alt={`Profile of ${username}`}
          className="shrink-0 w-8 rounded-full aspect-square"
        />
        <span className="my-auto">{username}</span>
      </div>
      <button
        className={`justify-center self-start p-3 font-semibold whitespace-nowrap rounded-md ${isFollowed ? 'bg-red-600 text-white' : 'bg-purple-700 text-gray-100'}`}
        onClick={() => onFollowToggle(userId)}
      >
        {isFollowed ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}

function MyComponent({ searchResults }) {
  const [users, setUsers] = useState([]);
  const [followStates, setFollowStates] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    // Fetch users from the API
    axios.get('http://127.0.0.1:8000/all-users/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setUsers(response.data);
      // Initialize follow states
      const initialFollowStates = response.data.reduce((acc, user) => {
        acc[user.id] = user.is_followed; // Assuming `is_followed` is provided by the API
        return acc;
      }, {});
      setFollowStates(initialFollowStates);
    })
    .catch(error => {
      console.error('There was an error fetching the users!', error);
    });
  }, [token]);

  const handleFollowToggle = (userId) => {
    const isFollowed = followStates[userId];
    const url = `http://127.0.0.1:8000/api/users/${userId}/${isFollowed ? 'unfollow' : 'follow'}/`;

    axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(`${isFollowed ? 'Unfollowed' : 'Followed'} successfully:`, response.data);
      setFollowStates(prevStates => ({
        ...prevStates,
        [userId]: !isFollowed
      }));
      setSuccessMessage(`${isFollowed ? 'Unfollowed' : 'Followed'} successfully!`);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Hide the message after 3 seconds
    })
    .catch(error => {
      console.error(`There was an error ${isFollowed ? 'unfollowing' : 'following'} the user!`, error);
    });
  };

  return (
    <div className="flex flex-col pb-20 bg-gray-100">
      <main className="self-center mt-9 w-full max-w-[1043px] max-md:max-w-full">
        <section className="flex gap-5 max-md:flex-col max-md:gap-0">
          <section className="flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
            <section className="flex flex-col grow max-md:mt-5 max-md:max-w-full">
              <section className="flex flex-col px-4 pt-4 pb-20 mt-3.5 bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:max-w-full overflow-y-auto max-h-[500px]">
                <header className="max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <section className="grid grid-cols-4 gap-16">
                      {searchResults.map((result, index) => (
                        <CardProfile
                          key={index}
                          profile_photo={result.profile_photo}
                          username={result.username}
                        />
                      ))}
                    </section>
                  </div>
                </header>
              </section>
            </section>
          </section>
          <aside className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
            <section className="flex flex-col max-md:mt-5">
              <section className="flex flex-col p-4 w-full text-xs bg-white rounded-lg border border-solid shadow-sm border-zinc-200 overflow-y-auto max-h-[500px]">
                <h2 className="text-sm font-semibold text-neutral-900">People you may know</h2>
                {searchResults.map((result, index) => (
                  <FriendSuggestion
                    key={index}
                    profile_photo={result.profile_photo}
                    username={result.username}
                    userId={result.id}
                    isFollowed={!!followStates[result.id]} // Ensure boolean value
                    onFollowToggle={handleFollowToggle}
                  />
                ))}
              </section>
              {successMessage && (
                <div className="p-4 mt-4 text-green-700 bg-green-100 rounded">
                  {successMessage}
                </div>
              )}
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default MyComponent;
