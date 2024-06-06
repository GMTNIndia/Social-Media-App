// import React, { useState } from "react";
// import MyComponent from "./UserCard";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; 
// function SearchBar() {
//   const [searchTerm, setSearchTerm] = useState(""); // State for the search term
//   const [searchResults, setSearchResults] = useState([]); // State for the search results
//   const [error, setError] = useState(""); // State for handling errors
//   const navigate = useNavigate(); // useNavigate hook for navigation

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value); // Update the search term state
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError(''); // Clear any previous errors

//     const accessToken = localStorage.getItem('accessToken'); // Retrieve the token from local storage

//     if (!accessToken) {
//       setError('User is not logged in'); // Check if the user is logged in
//       return;
//     }

//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/search/', {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//         params: {
//           query: searchTerm,
//         },
//       });

//       setSearchResults(response.data); // Update search results state with the response data
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.detail) {
//         setError(err.response.data.detail); // Set error from response
//       } else {
//         setError('An unexpected error occurred'); // Handle unexpected errors
//       }
//       console.error('Error:', err);
//     }
//   };

//   return (
//     <section className="bg-gray-100">
//       <form
//         className="flex flex-col justify-center px-4 py-5 ml-[120px]   bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-w-[730px]"
//         onSubmit={handleSubmit}
//       >
//         <section className="flex gap-4 px-[754] py-[48] max-md:flex-wrap max-md:max-w-full">
//           <label htmlFor="searchInput" className="sr-only">
//             What are you looking for?
//           </label>
//           <input
//             className="justify-center items-start py-[48] pr-52 pl-3.5 h-12 text-xs rounded-md bg-zinc-200 text-zinc-500 w-[620px] max-md:pr-5 max-md:max-w-full"
//             type="text"
//             id="searchInput"
//             value={searchTerm}
//             onChange={handleInputChange}
//             placeholder="What are you looking for?"
//             aria-label="What are you looking for?"
//           />
//           <button
//             className="justify-center px-5 py-[48] text-sm font-semibold text-gray-100 whitespace-nowrap bg-purple-600 rounded-md border border-gray-400 border-solid"
//             type="submit"
//           >
//             Search
//           </button>
//         </section>
//       </form>
//       {error && <p className="text-red-500">{error}</p>}
      
//       <MyComponent searchResults={searchResults} />
//     </section>
//   );
// }

// export default SearchBar;

import React, { useState } from "react";
import MyComponent from "./UserCard";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [searchResults, setSearchResults] = useState([]); // State for the search results
  const [error, setError] = useState(""); // State for handling errors
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors

    const accessToken = localStorage.getItem('accessToken'); // Retrieve the token from local storage

    if (!accessToken) {
      setError('User is not logged in'); // Check if the user is logged in
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/search/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        params: {
          query: searchTerm,
        },
      });

      setSearchResults(response.data); // Update search results state with the response data
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail); // Set error from response
      } else {
        setError('An unexpected error occurred'); // Handle unexpected errors
      }
      console.error('Error:', err);
    }
  };

  return (
    <section className="bg-gray-100">
  
    <form
        className="flex flex-col justify-center px-4 py-5 ml-[120px] mt-[120px]  bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-w-[730px]"
        onSubmit={handleSubmit}
      >
      
        <section className="flex gap-4 px-[754] py-[48] max-md:flex-wrap max-md:max-w-full">
          <label htmlFor="searchInput" className="sr-only">
            What are you looking for?
          </label>
          <input
            className="justify-center items-start py-[48] pr-52 pl-3.5 h-12 text-xs rounded-md bg-zinc-200 text-zinc-500 w-[620px] max-md:pr-5 max-md:max-w-full"
            type="text"
            id="searchInput"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Find your friends here ?"
            aria-label="What are you looking for?"
          />
          <button
            className="justify-center px-5 py-[48] text-sm font-semibold text-gray-100 whitespace-nowrap bg-purple-600 rounded-md border border-gray-400 border-solid"
            type="submit"
          >
            Find people
          </button>
        </section>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      
      <MyComponent searchResults={searchResults} />
    </section>
  );
}

export default SearchBar;


