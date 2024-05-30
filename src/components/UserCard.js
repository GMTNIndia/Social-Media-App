// import * as React from "react";
// import img1 from "../components/images/img1.jpg";
// import img2 from "../components/images/img2.jpg";
// import img3 from "../components/images/img3.jpg";
// import img4 from "../components/images/img4.jpg";

// function CardProfile({ src, name, friends, posts }) {
//   return (
//     <section className="flex flex-col grow justify-center items-center px-2 py-4 mx-auto w-full text-xs rounded-lg border border-solid bg-zinc-200 border-zinc-200 max-md:mt-5">
//       <img loading="lazy" src={src} alt={`Profile of ${name}`} className="rounded-full aspect-square w-[98px]" />
//       <h2 className="mt-2 font-semibold text-neutral-900">{name}</h2>
//       <div className="flex gap-5 justify-between self-stretch mt-6 font-medium text-zinc-600">
//         <span>{friends} Friends</span>
//         <span>{posts} Posts</span>
//       </div>
//     </section>
//   );
// }

// function FriendSuggestion({ src, name }) {
//   return (
//     <div className="flex gap-5 justify-between mt-3.5 w-full">
//       <div className="flex gap-2.5 font-medium text-neutral-900">
//         <img loading="lazy" src={src} alt={`Profile of ${name}`} className="shrink-0 w-8 rounded-full aspect-square" />
//         <span className="my-auto">{name}</span>
//       </div>
//       <button className="justify-center self-start p-3 font-semibold text-gray-100 whitespace-nowrap bg-purple-700 rounded-md">Show</button>
//     </div>
//   );
// }

// function Trend({ hashtag, posts }) {
//   return (
//     <div className="flex gap-5 justify-between mt-3.5">
//       <div className="flex flex-col font-medium">
//         <span className="text-xs text-neutral-900">{hashtag}</span>
//         <span className="mt-1.5 text-xs text-zinc-500">{posts} Posts</span>
//       </div>
//       <button className="justify-center p-2.5 my-auto text-xs font-semibold text-gray-100 whitespace-nowrap bg-purple-700 rounded-md">Explore</button>
//     </div>
//   );
// }

// function MyComponent({ searchTerm }) {
//   const profiles = [
//     { src: img1, name: "Ashok", friends: 180, posts: 120 },
//     { src: img2, name: "Akash", friends: 180, posts: 120 },
//     { src: img3, name: "Ragvi", friends: 180, posts: 120 },
//     { src: img4, name: "Bala", friends: 180, posts: 120 },
//   ];

//   const suggestions = [
//     { src: img1, name: "Ashok" },
//     { src: img2, name: "Akash" },
//     { src: img3, name: "Ragavi" },
//   ];

//   const trends = [
//     { hashtag: "#Ashok", posts: 120 },
//     { hashtag: "#Akash", posts: 120 },
//     { hashtag: "#Ragvi", posts: 120 },
//     { hashtag: "#Bala", posts: 120 },
//     { hashtag: "#Code With Stein", posts: 120 }
//   ];
//   // Filter data based on search term
//   const filteredProfiles = profiles.filter(profile => profile.name.toLowerCase().includes(searchTerm.toLowerCase()));
//   const filteredSuggestions = suggestions.filter(suggestion => suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()));
//   const filteredTrends = trends.filter(trend => trend.hashtag.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div className="flex flex-col pb-20 bg-gray-100">
//       <main className="self-center mt-9 w-full max-w-[1043px] max-md:max-w-full">
//         <section className="flex gap-5 max-md:flex-col max-md:gap-0">
//           <section className="flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
//             <section className="flex flex-col grow max-md:mt-5 max-md:max-w-full">
//               <section className="flex flex-col px-4 pt-4 pb-20 mt-3.5 bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:max-w-full">
//                 <header className="max-md:max-w-full">
//                   <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                     {filteredProfiles.map((profile, index) => (
//                       <CardProfile key={index} src={profile.src} name={profile.name} friends={profile.friends} posts={profile.posts} />
//                     ))}
//                   </div>
//                 </header>
//                 <section className="flex flex-col justify-center items-center px-2 py-4 mt-5 mb-4 max-w-full text-xs rounded-lg border border-solid bg-zinc-200 border-zinc-200 w-[166px]">
//                   <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e505ea34f83a46156c747fa90e1a65c0be825a41e3e575d541a8a42c93e193f4?apiKey=87da4b67ae5046fdba58e532f6a97e48&" alt="Code With Stein" className="rounded-full aspect-square w-[98px]" />
//                   <h2 className="mt-2 font-semibold text-neutral-900">Code With Stein</h2>
//                   <div className="flex gap-5 justify-between self-stretch mt-6 font-medium text-zinc-600">
//                     <span>180 Friends</span>
//                     <span>120 Post</span>
//                   </div>
//                 </section>
//               </section>
//             </section>
//           </section>
//           <aside className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
//             <section className="flex flex-col max-md:mt-5">
//               <section className="flex flex-col p-4 w-full text-xs bg-white rounded-lg border border-solid shadow-sm border-zinc-200">
//                 <h2 className="text-sm font-semibold text-neutral-900">People you may know</h2>
//                 {filteredSuggestions.map((suggestion, index) => (
//                   <FriendSuggestion key={index} src={suggestion.src} name={suggestion.name} />
//                 ))}
//               </section>
//               <section className="flex flex-col p-4 mt-3.5 w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200">
//                 <h2 className="text-sm font-semibold text-neutral-900">Trends</h2>
//                 {filteredTrends.map((trend, index) => (
//                   <Trend key={index} hashtag={trend.hashtag} posts={trend.posts} />
//                 ))}
//               </section>
//             </section>
//           </aside>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default MyComponent;



import React, { useState, useEffect } from 'react';
import axios from 'axios';


function CardProfile({ src, name, friends, posts }) {
  return (
    <section className="flex flex-col grow justify-center items-center px-2 py-4 mx-auto w-full text-xs rounded-lg border border-solid bg-zinc-200 border-zinc-200 max-md:mt-5">
      <img 
        loading="lazy" 
        src={ `http://127.0.0.1:8000/api/profile/photo/retrieve/${image}` } 
        alt={`Profile of ${name}`} 
        className="rounded-full aspect-square w-[98px]" 
      />
      <h2 className="mt-2 font-semibold text-neutral-900">{name}</h2>
      <div className="flex gap-5 justify-between self-stretch mt-6 font-medium text-zinc-600">
        <span>{friends} Friends</span>
        <span>{posts} Posts</span>
      </div>
    </section>
  );
}

function FriendSuggestion({ src, name }) {
  return (
    <div className="flex gap-5 justify-between mt-3.5 w-full">
      <div className="flex gap-2.5 font-medium text-neutral-900">
        <img 
          loading="lazy" 
          src={`http://127.0.0.1:8000/api/profile/photo/retrieve/${src}` } 
          alt={`Profile of ${name}`} 
          className="shrink-0 w-8 rounded-full aspect-square" 
        />
        <span className="my-auto">{name}</span>
      </div>
      <button className="justify-center self-start p-3 font-semibold text-gray-100 whitespace-nowrap bg-purple-700 rounded-md">Show</button>
    </div>
  );
}

function Trend({ hashtag, posts }) {
  return (
    <div className="flex gap-5 justify-between mt-3.5">
      <div className="flex flex-col font-medium">
        <span className="text-xs text-neutral-900">{hashtag}</span>
        <span className="mt-1.5 text-xs text-zinc-500">{posts} Posts</span>
      </div>
      <button className="justify-center p-2.5 my-auto text-xs font-semibold text-gray-100 whitespace-nowrap bg-purple-700 rounded-md">Explore</button>
    </div>
  );
}



function MyComponent({ searchResults }) {

  
    const [profileImage, setProfileImage] = useState(null);
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
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
  
      fetchProfileImage();
    }, []);
  
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };
  
    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append('photo', image);
  
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
  
        console.log('Profile picture updated successfully:', response.data);
        setProfileImage(response.data.photo); 
        setShowModal(false);
      } catch (error) {
        console.error('Error updating profile picture:', error.message);
      }
    };
  return (
    <div className="flex flex-col pb-20 bg-gray-100">
      <main className="self-center mt-9 w-full max-w-[1043px] max-md:max-w-full">
        <section className="flex gap-5 max-md:flex-col max-md:gap-0">
          <section className="flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
            <section className="flex flex-col grow max-md:mt-5 max-md:max-w-full">
              <section className="flex flex-col px-4 pt-4 pb-20 mt-3.5 bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:max-w-full">
                <header className="max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    {searchResults.map((result, index) => (
                      <CardProfile
                        key={index}
                        src={result.src || "default-image-url"}
                        name={result.name}
                        friends={result.friends}
                        posts={result.posts}
                      />
                    ))}
                  </div>
                </header>
              </section>
            </section>
          </section>
          <aside className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
            <section className="flex flex-col max-md:mt-5">
              <section className="flex flex-col p-4 w-full text-xs bg-white rounded-lg border border-solid shadow-sm border-zinc-200">
                <h2 className="text-sm font-semibold text-neutral-900">People you may know</h2>
                {searchResults.slice(0, 3).map((result, index) => (
                  <FriendSuggestion
                    key={index}
                    src={result.src || "default-image-url"}
                    name={result.name}
                  />
                ))}
              </section>
              <section className="flex flex-col p-4 mt-3.5 w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200">
                <h2 className="text-sm font-semibold text-neutral-900">Trends</h2>
                {searchResults.slice(0, 5).map((result, index) => (
                  <Trend
                    key={index}
                    hashtag={`#${result.name}`}
                    posts={result.posts}
                  />
                ))}
              </section>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default MyComponent;