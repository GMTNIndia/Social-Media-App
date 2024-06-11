// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Modal from 'react-modal';
// import defaultImage from "../components/images/dimg.jpg";

// Modal.setAppElement('#root');

// function CardProfile({ profile_photo, username, onClick }) {
//   return (
//     <section
//       className="flex flex-col grow justify-center items-center px-2 py-4 mx-auto w-full text-xs rounded-lg border border-solid bg-zinc-200 border-zinc-200 max-md:mt-5"
//       onClick={onClick}
//     >
//       <img
//         loading="lazy"
//         src={profile_photo ? `http://127.0.0.1:8000${profile_photo}` : defaultImage}
//         alt={`Profile of ${username}`}
//         className="rounded-full aspect-square w-[98px]"
//       />
//       <h2 className="mt-2 font-semibold text-neutral-900">{username}</h2>
//     </section>
//   );
// }

// function FriendSuggestion({ profile_photo, username, userId, isFollowed, onFollowToggle, onClick }) {
//   return (
//     <div className="flex gap-5 justify-between mt-3.5 w-full" onClick={onClick}>
//       <div className="flex gap-2.5 font-medium text-neutral-900">
//         <img
//           loading="lazy"
//           src={profile_photo ? `http://127.0.0.1:8000${profile_photo}` : defaultImage}
//           alt={`Profile of ${username}`}
//           className="shrink-0 w-8 rounded-full aspect-square"
//         />
//         <span className="my-auto">{username}</span>
//       </div>
//       <button
//         className={`justify-center self-start p-3 font-semibold whitespace-nowrap rounded-md ${isFollowed ? 'bg-red-600 text-white' : 'bg-purple-700 text-gray-100'}`}
//         style={{ minWidth: '6rem' }} // Adjust the width as needed
//         onClick={(e) => {
//           e.stopPropagation();
//           onFollowToggle(userId);
//         }}
//       >
//         {isFollowed ? 'Unfollow' : 'Follow'}
//       </button>
//     </div>
//   );
// }

// function MyComponent({ searchResults }) {
//   const [users, setUsers] = useState([]);
//   const [followStates, setFollowStates] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [postCount, setPostCount] = useState(0);
//   const [followerCount, setFollowerCount] = useState(0);
//   const [profileImage, setProfileImage] = useState(null); // State to store profile image URL
//   const token = localStorage.getItem('accessToken');

//   useEffect(() => {
//     // Fetch users from the API
//     axios.get('http://127.0.0.1:8000/all-users/', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       setUsers(response.data);
//       // Initialize follow states
//       const initialFollowStates = response.data.reduce((acc, user) => {
//         acc[user.id] = user.is_followed; // Assuming `is_followed` is provided by the API
//         return acc;
//       }, {});
//       setFollowStates(initialFollowStates);
//     })
//     .catch(error => {
//       console.error('There was an error fetching the users!', error);
//     });

//     // Fetch profile image
//     fetchProfileImage();
//   }, [token]);

//   const fetchProfileImage = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/profile/photo/retrieve/', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//         },
//       });
//       if (response.data.profile_photo) {
//         setProfileImage(response.data.profile_photo);
//       }
//     } catch (error) {
//       console.error('Error fetching profile image:', error.message);
//     }
//   };

//   const handleFollowToggle = (userId) => {
//     const isFollowed = followStates[userId];
//     const url = `http://127.0.0.1:8000/api/users/${userId}/${isFollowed ? 'unfollow' : 'follow'}/`;

//     axios.post(url, {}, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       console.log(`${isFollowed ? 'Unfollowed' : 'Followed'} successfully:`, response.data);
//       setFollowStates(prevStates => ({
//         ...prevStates,
//         [userId]: !isFollowed
//       }));
//       setSuccessMessage(`${isFollowed ? 'Unfollowed' : 'Followed'} successfully!`);
//       setTimeout(() => {
//         setSuccessMessage('');
//       }, 3000); // Hide the message after 3 seconds
//     })
//     .catch(error => {
//       console.error(`There was an error ${isFollowed ? 'unfollowing' : 'following'} the user!`, error);
//     });
//   };

//   const handleUserClick = (userId) => {
//     console.log('User clicked:', userId);
//     axios.get(`http://127.0.0.1:8000/posts/${userId}/post_count/`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       console.log('Post count:', response.data.post_count);
//       setPostCount(response.data.post_count);
//     })
//     .catch(error => {
//       console.error('There was an error fetching the post count!', error);
//     });
  
//     // Fetch follower count for the selected user
//     axios.get(`http://127.0.0.1:8000/users/${userId}/followers_count/`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       console.log('Follower count:', response.data.followers_count);
//       setFollowerCount(response.data.followers_count);
//     })
//     .catch(error => {
//       console.error('There was an error fetching the follower count!', error);
//     });
  
//     // Find the selected user from the users array
//     const user = users.find(user => user.id === userId);
//     console.log('Selected user:', user);
//     setSelectedUser(user); // Update selectedUser with the fetched user data
//     setModalIsOpen(true);
//   };
  

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   // Custom styles for the modal
//   const customStyles = {
//     content: {
//       top: '60%',
//       left: '50%',
//       right: 'auto',
//       bottom: 'auto',
//       marginRight: '-50%',
//       transform: 'translate(-50%, -50%)',
//       width: '30%', // Adjust the width as needed
//       height: '60%', // Adjust the height as needed
//       maxWidth: '900px', // Maximum width
//       maxHeight: '90vh', // Maximum height
//       overflow: 'auto', // Enable scrolling if content overflows
//     },
//     overlay: {
//       backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark overlay
//     },
 

//   };

//   return (
//     <div className="flex flex-col pb-20 bg-gray-100">
//       <main className="self-center mt-9 w-full max-w-[1043px] max-md:max-w-full">
//         <section className="flex gap-5 max-md:flex-col max-md:gap-0">
//           <section className="flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
//             <section className="flex flex-col grow max-md:mt-5 max-md:max-w-full">
//               <section className="flex flex-col px-4 pt-4 pb-20 mt-3.5 bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:max-w-full overflow-y-auto max-h-[500px]">
//                 <header className="max-md:max-w-full">
//                   <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                     <section className="grid grid-cols-4 gap-16">
//                       {searchResults.map((result, index) => (
//                         <CardProfile
//                           key={index}
//                           profile_photo={result.profile_photo}
//                           username={result.username}
//                           onClick={() => handleUserClick(result.id)}
//                         />
//                       ))}
//                     </section>
//                   </div>
//                 </header>
//               </section>
//             </section>
//           </section>
//           <aside className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
//             <section className="flex flex-col max-md:mt-5">
//               <section className="flex flex-col p-4 mt-3.5 w-full text-xs bg-white rounded-lg border border-solid shadow-sm border-zinc-200 overflow-y-auto max-h-[500px]">
//                 <h2 className="text-sm font-semibold text-neutral-900">People you may know</h2>
//                 {searchResults.map((result, index) => (
//                   <FriendSuggestion
//                     key={index}
//                     profile_photo={result.profile_photo}
//                     username={result.username}
//                     userId={result.id}
//                     isFollowed={!!followStates[result.id]} // Ensure boolean value
//                     onFollowToggle={handleFollowToggle}
//                     onClick={() => handleUserClick(result.id)}
//                   />
//                 ))}
//               </section>
//               {/* {successMessage && (
//                 <div className="p-4 mt-4 text-green-700 bg-green-100 rounded">
//                   {successMessage}
//                 </div>
//               )} */}
//             </section>
//           </aside>
//         </section>
//       </main>

    
//       <Modal
//   isOpen={modalIsOpen}
//   onRequestClose={closeModal}
//   contentLabel="User Profile_photo Modal"
//   style={customStyles}
// >
//   {/* Check if selectedUser exists and render its details */}
//   {selectedUser && (
//     <div className="relative flex flex-col items-center p-4 bg-white rounded-lg">
//       {/* Close button */}
//       <button
//         className="absolute top-0 right-0 p-2 text-gray-700 hover:text-gray-900"
//         onClick={closeModal}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M6 18L18 6M6 6l12 12"
//           />
//         </svg>
//       </button>
//       {/* User details */}
//       <img
//   src={selectedUser.profile_photo ? `http://127.0.0.1:8000${selectedUser.profile_photo}` : defaultImage}
//   alt={`Profile of ${selectedUser.username}`}
//   className="rounded-full w-24 h-24 mb-4"
// />

//       <h2 className="text-xl font-semibold">{selectedUser.username}</h2>
//       <p className="mt-2">Posts: {postCount}</p>
//       <p className="mt-2">Followers: {followerCount}</p>
//       {/* Follow/unfollow button */}
//       <button
//         className={`mt-4 p-2 font-semibold ${followStates[selectedUser.id] ? 'bg-red-600 text-white' : 'bg-purple-700 text-gray-100'}`}
//         onClick={() => handleFollowToggle(selectedUser.id)}
//       >
//         {followStates[selectedUser.id] ? 'Unfollow' : 'Follow'}
//       </button>
//     </div>
//   )}
// </Modal>



//     </div>
//   );
// }

// export default MyComponent;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import defaultImage from "../components/images/dimg.jpg";

Modal.setAppElement('#root');

// Helper function to format the image URL correctly
const formatImageUrl = (url) => {
  const baseUrl = 'http://127.0.0.1:8000';
  if (url && !url.startsWith(baseUrl)) {
    return `${baseUrl}${url}`;
  }
  return url;
};

function CardProfile({ profile_photo, username, onClick }) {
  return (
    <section
      className="flex flex-col grow justify-center items-center px-2 py-4 mx-auto w-full text-xs rounded-lg border border-solid bg-zinc-200 border-zinc-200 max-md:mt-5"
      onClick={onClick}
    >
      <img
        loading="lazy"
        src={profile_photo ? formatImageUrl(profile_photo) : defaultImage}
        alt={`Profile of ${username}`}
        className="rounded-full aspect-square w-[98px]"
      />
      <h2 className="mt-2 font-semibold text-neutral-900">{username}</h2>
    </section>
  );
}

function FriendSuggestion({ profile_photo, username, userId, isFollowed, onFollowToggle, onClick }) {
  return (
    <div className="flex gap-5 justify-between mt-3.5 w-full" onClick={onClick}>
      <div className="flex gap-2.5 font-medium text-neutral-900">
        <img
          loading="lazy"
          src={profile_photo ? formatImageUrl(profile_photo) : defaultImage}
          alt={`Profile of ${username}`}
          className="shrink-0 w-8 rounded-full aspect-square"
        />
        <span className="my-auto">{username}</span>
      </div>
      <button
        className={`justify-center self-start p-3 font-semibold whitespace-nowrap rounded-md ${isFollowed ? 'bg-red-600 text-white' : 'bg-purple-700 text-gray-100'}`}
        style={{ minWidth: '6rem' }} // Adjust the width as needed
        onClick={(e) => {
          e.stopPropagation();
          onFollowToggle(userId);
        }}
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [profileImage, setProfileImage] = useState(null); // State to store profile image URL
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

    // Fetch profile image
    fetchProfileImage();
  }, [token]);

  const fetchProfileImage = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/profile/photo/retrieve/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.data.profile_photo) {
        setProfileImage(response.data.profile_photo);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error.message);
    }
  };

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

  const handleUserClick = (userId) => {
    console.log('User clicked:', userId);
    axios.get(`http://127.0.0.1:8000/posts/${userId}/post_count/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Post count:', response.data.post_count);
      setPostCount(response.data.post_count);
    })
    .catch(error => {
      console.error('There was an error fetching the post count!', error);
    });

    // Fetch follower count for the selected user
    axios.get(`http://127.0.0.1:8000/users/${userId}/followers_count/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Follower count:', response.data.followers_count);
      setFollowerCount(response.data.followers_count);
    })
    .catch(error => {
      console.error('There was an error fetching the follower count!', error);
    });

    // Find the selected user from the users array
    const user = users.find(user => user.id === userId);
    console.log('Selected user:', user);
    setSelectedUser(user); // Update selectedUser with the fetched user data
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Custom styles for the modal
  const customStyles = {
    content: {
      top: '60%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '30%', // Adjust the width as needed
      height: '60%', // Adjust the height as needed
      maxWidth: '900px', // Maximum width
      maxHeight: '90vh', // Maximum height
      overflow: 'auto', // Enable scrolling if content overflows
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark overlay
    },
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
                          onClick={() => handleUserClick(result.id)}
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
              <section className="flex flex-col p-4 mt-3.5 w-full text-xs bg-white rounded-lg border border-solid shadow-sm border-zinc-200 overflow-y-auto max-h-[500px]">
                <h2 className="text-sm font-semibold text-neutral-900">People you may know</h2>
                {searchResults.map((result, index) => (
                  <FriendSuggestion
                    key={index}
                    profile_photo={result.profile_photo}
                    username={result.username}
                    userId={result.id}
                    isFollowed={!!followStates[result.id]} // Ensure boolean value
                    onFollowToggle={handleFollowToggle}
                    onClick={() => handleUserClick(result.id)}
                  />
                ))}
              </section>
            </section>
          </aside>
        </section>
      </main>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Profile Photo Modal"
        style={customStyles}
      >
        {/* Check if selectedUser exists and render its details */}
        {selectedUser && (
          <div className="relative flex flex-col items-center p-4 bg-white rounded-lg">
            {/* Close button */}
            <button
              className="absolute top-0 right-0 p-2 text-gray-700 hover:text-gray-900"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* User details */}
            <img
              src={selectedUser.profile_photo ? formatImageUrl(selectedUser.profile_photo) : defaultImage}
              alt={`Profile of ${selectedUser.username}`}
              className="rounded-full w-24 h-24 mb-4"
            />

            <h2 className="text-xl font-semibold">{selectedUser.username}</h2>
            <p className="mt-2">Posts: {postCount}</p>
            <p className="mt-2">Followers: {followerCount}</p>
            {/* Follow/unfollow button */}
            <button
              className={`mt-4 p-2 font-semibold ${followStates[selectedUser.id] ? 'bg-red-600 text-white' : 'bg-purple-700 text-gray-100'}`}
              onClick={() => handleFollowToggle(selectedUser.id)}
            >
              {followStates[selectedUser.id] ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MyComponent;
