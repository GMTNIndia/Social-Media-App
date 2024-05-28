import React, { useState } from "react";
import MyComponent from "./UserCard"; 

import axios from 'axios';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/search/?query=', { searchTerm });
      setSearchResults(response.data);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };


  return (
    <section className="bg-gray-100">
      <form 
        className="flex flex-col justify-center px-4 py-5 bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-w-[754px]"
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
            placeholder="What are you looking for?"
            aria-label="What are you looking for?"
          />
          <button
            className="justify-center px-5 py-[48] text-sm font-semibold text-gray-100 whitespace-nowrap bg-purple-600 rounded-md border border-gray-400 border-solid"
            type="submit"
          >
            Search
          </button>
        </section>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <MyComponent searchResults={searchResults} />
    </section>
  );
}

export default SearchBar;
