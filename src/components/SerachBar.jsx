import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SerachBar = ({ username, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Use useEffect to trigger search as user types
  useEffect(() => {
    // Debounce the search to prevent too many API calls
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 500); // 500ms delay

    // Cleanup function to cancel the timeout if component unmounts or searchTerm changes
    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  return (
    <div className="max-w-7xl flex gap-5 items-center w-full mx-auto px-2 bg-[#ff742b] text-xl font-medium py-3">
      <p className="whitespace-nowrap">{username}</p>
      <div className="flex w-full items-center px-3 bg-white">
        <FaSearch color="#ff742b" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="py-2 font-normal text-base outline-none px-3 w-full"
          placeholder="Search stories by Title, Url and Author"
        />
      </div>
    </div>
  );
};

export default SerachBar;
