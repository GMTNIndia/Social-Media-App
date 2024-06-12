// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import manish from '../components/profile.jpg';
// import Edit from '../components/Edit.png';
// import FileUploader from './Drag';
// import { useNavigate } from 'react-router-dom';

// function Sidebar() {
//   const [showModal, setShowModal] = useState(false);
//   const [showSecondModal, setShowSecondModal] = useState(false);
//   const [image, setImage] = useState(null);
//   const [profileImage, setProfileImage] = useState(manish); // Default image
//   const [username, setUsername] = useState("");
//   const [followers, setFollowers] = useState(0); // State for followers count
//   const [posts, setPostCount] = useState(0);
//   const [followersList, setFollowersList] = useState([]); // State for storing followers list
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
//         const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//           },
//         });
//         if (response.data) {
//           setUsername(response.data.username); // Update username state

//           if (response.data.profile_photo) {
//             setProfileImage(response.data.profile_photo);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching profile data:', error.message);
//       }
//     };

//     const fetchProfileImage = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/profile/photo/retrieve/', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//           },
//         });
//         if (response.data.profile_photo) {
//           setProfileImage(response.data.profile_photo);
//         }
//       } catch (error) {
//         console.error('Error fetching profile image:', error.message);
//       }
//     };

//     const fetchFollowers = async () => {
//       try {
//         const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
//         const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/followers/`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//           },
//         });
//         if (response.data) {
//           setFollowers(response.data.followers.length); // Assuming the API returns an array of followers
//           setFollowersList(response.data.followers); // Store followers list
//         }
//       } catch (error) {
//         console.error('Error fetching followers:', error.message);
//       }
//     };

//     const fetchPostCount = async () => {
//       try {
//         const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
//         const response = await axios.get(`http://127.0.0.1:8000/api/posts/${userId}/post_count/`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//           },
//         });
//         if (response.data) {
//           setPostCount(response.data.post_count);
//           console.log(response.data.post_count); // Log the post count
//         }
//       } catch (error) {
//         console.error('Error fetching post count:', error.message);
//       }
//     };

//     fetchUserData();
//     fetchProfileImage();
//     fetchFollowers();
//     fetchPostCount();
//   }, []);

//   const handleImageChange = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

//     if (files && files.length > 0) {
//       const selectedImage = files[0];
//       setImage(selectedImage); // Update image state
//       const reader = new FileReader();
//       reader.onload = () => {
//         setProfileImage(reader.result); // Update profileImage state with the selected image
//       };
//       reader.readAsDataURL(selectedImage);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleSubmit = async () => {
//     if (!image) return;

//     try {
//       const formData = new FormData();
//       formData.append('profile_photo', image);

//       const response = await axios.put(
//         'http://127.0.0.1:8000/api/profile/photo/',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//           },
//         }
//       );

//       setProfileImage(`http://127.0.0.1:8000${response.data.profile_photo}`); // Update profile image with the new URL
//       setShowModal(false);
//       navigate('/');
//       window.location.reload();
//     } catch (error) {
//       console.error('Error updating profile picture:', error.message);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await axios.delete('http://127.0.0.1:8000/api/profile/photo/delete/', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//         },
//       });

//       // If the deletion is successful, update the profile image state to the default image
//       if (response.status === 204) {
//         setProfileImage(manish); // Replace with the default image
//         setShowModal(false);
//         navigate('/');
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error('Error deleting profile picture:', error.message);
//     }
//   };

//   const openFollowersModal = () => {
//     setShowSecondModal(true);
//   };

//   const closeFollowersModal = () => {
//     setShowSecondModal(false);
//   };

//   return (
//     <div className="hidden lg:block fixed top-0 left-0 w-full md:w-1/4 p-4 h-full overflow-hidden mt-32">
//       <div className="bg-white shadow rounded p-4">
//         <div className="flex justify-center">
//           <div className="relative">
//             <img
//               src={profileImage}
//               alt="Profile"
//               className="rounded-full h-40 w-40 overflow-hidden"
//               style={{ cursor: 'pointer' }}
//             />
//             <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-purple-500 rounded-full p-1">
//               <img
//                 src={Edit}
//                 alt="Edit Icon"
//                 className="h-10 w-10 rounded-full"
//                 onClick={() => setShowModal(true)} // Show the first modal when edit icon is clicked
//                 style={{ cursor: 'pointer' }}
//               />
//             </div>
//           </div>
//         </div>
//         {showModal && (
//           <>
//             <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//               <div className="relative w-auto my-6 mx-auto max-w-3xl">
//                 <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                   <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
//                     <h3 className="font-sans text-lg font-semibold leading-4 text-center w-full">
//                       Upload Profile Picture
//                     </h3>
//                     <button
//                       className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                       onClick={() => setShowModal(false)}
//                     >
//                       <span className="text-black font-semibold">×</span>
//                     </button>
//                   </div>
//                   <div className="relative p-6 flex flex-row items-center" onDrop={handleImageChange} onDragOver={handleDragOver}>
//                     {/* <img
//                       src={`http://localhost:8000/${profileImage}`}
//                       alt="Current Profile"
//                       className="mr-4 max-w-[40%] max-h-[200px]"
//                     /> */}
//                     <div className="text-blueGray-500 text-lg leading-relaxed">
//                       <div className="bg-gray-100 flex items-center justify-center">
//                         <FileUploader onChange={handleImageChange} />
//                       </div>
//                       <div className="mt-4">
//                         <input type="file" onChange={handleImageChange} />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
//                     <button
//                       className="text-black-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                       type="button"
//                       onClick={() => setShowModal(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="bg-purple-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                       type="button"
//                       onClick={handleSubmit}
//                     >
//                       Upload
//                     </button>
//                     <button
//                       className="bg-red-600 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                       type="button"
//                       onClick={handleDelete}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//           </>
//         )}

//         <h2 className="text-center mt-5 text-lg font-semibold">{username}</h2>
//         <div className="flex justify-between space-x-4 mt-4">
//           <p className="text-sm text-red-600 cursor-pointer" onClick={openFollowersModal}>{followers} Followers</p> {/* Display followers count */}
//           <p className="text-sm text-green-600">{posts} Posts</p> {/* Display posts count */}
//         </div>
//       </div>

//       {showSecondModal && (
//         <>
//           <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//             <div className="relative w-auto my-6 mx-auto max-w-3xl">
//               <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                 <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
//                   <h3 className="text-lg font-semibold">Followers</h3>
//                   <button
//                     className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                     onClick={closeFollowersModal}
//                   >
//                     <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
//                   </button>
//                 </div>
//                 <div className="relative p-6 flex-auto">
//                   <ul>
//                     {followersList.map((follower) => (
//                       <li key={follower.id} className="py-2 border-b border-gray-200">{follower.username}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
//                   <button
//                     className="bg-red-600 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={closeFollowersModal}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Sidebar;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import manish from '../components/profile.jpg';
import Edit from '../components/Edit.png';
import FileUploader from './Drag';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false); 
  const [showforthModal, setShowfourthModal] = useState(false);  
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(manish); // Default image
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState(0); // State for followers count
  const [following, setFollowing] = useState(0); // State for following count
  const [posts, setPostCount] = useState(0);
  const [followersList, setFollowersList] = useState([]); // State for storing followers list
  const [followingList, setFollowingList] = useState([]); // State for storing following list
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [blockedList, setBlockedList] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.data) {
          setUsername(response.data.username); // Update username state

          if (response.data.profile_photo) {
            setProfileImage(response.data.profile_photo);
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

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

    const fetchFollowers = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/followers/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.data) {
          setFollowers(response.data.followers.length); // Assuming the API returns an array of followers
          setFollowersList(response.data.followers); // Store followers list
        }
      } catch (error) {
        console.error('Error fetching followers:', error.message);
      }
    };

    const fetchFollowing = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/following/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.data) {
          setFollowing(response.data.following.length);
          setFollowingList(response.data.following);
        }
      } catch (error) {
        console.error('Error fetching following:', error.message);
      }
    };

    const fetchPostCount = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
        const response = await axios.get(`http://127.0.0.1:8000/api/posts/${userId}/post_count/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.data) {
          setPostCount(response.data.post_count);
          console.log(response.data.post_count); // Log the post count
        }
      } catch (error) {
        console.error('Error fetching post count:', error.message);
      }
    };
    const fetchBlockedList = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/blocked/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.data) {
          setBlockedList(response.data);
        }
      } catch (error) {
        console.error('Error fetching blocklist:', error.message);
      }
    };

    fetchUserData();
    fetchProfileImage();
    fetchFollowers();
    fetchFollowing();
    fetchBlockedList();
    fetchPostCount();
  }, []);

  const handleImageChange = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

    if (files && files.length > 0) {
      const selectedImage = files[0];
      setImage(selectedImage); // Update image state
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Update profileImage state with the selected image
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async () => {
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append('profile_photo', image);

      const response = await axios.put(
        'http://127.0.0.1:8000/api/profile/photo/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      setProfileImage(`http://127.0.0.1:8000${response.data.profile_photo}`); // Update profile image with the new URL
      setShowModal(false);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile picture:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://127.0.0.1:8000/api/profile/photo/delete/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      // If the deletion is successful, update the profile image state to the default image
      if (response.status === 204) {
        setProfileImage(manish); // Replace with the default image
        setShowModal(false);
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting profile picture:', error.message);
    }
  };

  const openFollowersModal = () => {
    setShowSecondModal(true);
  };

  const closeFollowersModal = () => {
    setShowSecondModal(false);
  };

  const openFollowingModal = () => {
    setShowThirdModal(true);
  };

  const closeFollowingModal = () => {
    setShowThirdModal(false);
  };

  const openBlocklistModal = () => {
    setShowfourthModal(true);
  };

  const closeBlocklistModal = () => {
    setShowfourthModal(false);
  };

  return (
    <div className="hidden lg:block fixed top-0 left-0 w-full md:w-1/4 p-4 h-full overflow-hidden mt-32">
      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-full h-40 w-40 overflow-hidden"
              style={{ cursor: 'pointer' }}
            />
            <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-purple-500 rounded-full p-1">
              <img
                src={Edit}
                alt="Edit Icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setShowModal(true)} // Show the first modal when edit icon is clicked
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
        {showModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="font-sans text-lg font-semibold leading-4 text-center w-full">
                      Upload Profile Picture
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-black font-semibold">×</span>
                    </button>
                  </div>
                  <div className="relative p-6 flex flex-row items-center" onDrop={handleImageChange} onDragOver={handleDragOver}>
                    {/* <img
                      src={`http://localhost:8000/${profileImage}`}
                      alt="Current Profile"
                      className="mr-4 max-w-[40%] max-h-[200px]"
                    /> */}
                    <div className="text-blueGray-500 text-lg leading-relaxed">
                      <div className="bg-gray-100 flex items-center justify-center">
                        <FileUploader onChange={handleImageChange} />
                      </div>
                      <div className="mt-4">
                        <input type="file" onChange={handleImageChange} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-                    rounded-b">
                    <button
                      className="text-black-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-purple-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Upload
                    </button>
                    <button
                      className="bg-red-600 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}

        <h2 className="text-center mt-5 text-lg font-semibold">{username}</h2>
        <div className="flex justify-between space-x-4 mt-4">
          <p className="text-sm text-red-600 cursor-pointer" onClick={openFollowersModal}>{followers} Followers</p> {/* Display followers count */}
          <p className="text-sm text-blue-600 cursor-pointer" onClick={openFollowingModal}>{following} Following</p>
          {/* <p className="text-sm text-blue-600 cursor-pointer" >Blocklist</p> Display following count */}
          <p className="text-sm text-black cursor-pointer" onClick={openBlocklistModal}>Blocklist</p>
          <p className="text-sm text-green-600">{posts} Posts</p>
          {/* <p className="text-sm text-green-600">{posts} Posts</p> Display posts count */}
        </div>
      </div>

      {showSecondModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  ">
            <div className="relative  my-6 mx-auto " style={{width: "400px"}}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-lg font-semibold">Followers</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeFollowersModal}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <ul>
                    {followersList.map((follower) => (
                      <li key={follower.id} className="py-2 border-b border-gray-200">{follower.username}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-600 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeFollowersModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      {showThirdModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto max-w-3xl" style={{width: "400px"}}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-lg font-semibold">Following</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeFollowingModal}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <ul>
                    {followingList.map((followee) => (
                      <li key={followee.id} className="py-2 border-b border-gray-200">{followee.username}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-600 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeFollowingModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

 {showforthModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative  my-6 mx-auto max-w-3xl" style={{width: "400px"}}>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-lg font-semibold">Blocklist</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeBlocklistModal}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <ul>
                  {blockedList.map((user) => (
                    <li key={user.id} className="py-2 border-b border-gray-200">{user.username}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="bg-red-600 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeBlocklistModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Sidebar;
