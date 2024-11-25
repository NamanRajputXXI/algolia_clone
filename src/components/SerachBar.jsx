import React from "react";
import { FaSearch } from "react-icons/fa";

const SerachBar = ({ username }) => {
  return (
    <div className="max-w-7xl flex gap-5 items-center w-full mx-auto px-2 bg-[#ff742b] text-xl font-medium py-3">
      <p className="whitespace-nowrap">{username}</p>
      <div className="flex w-full items-center px-3 bg-white">
        <FaSearch color="#ff742b" size={20} />
        <input
          type="text"
          className="py-2 font-normal text-base outline-none px-3 w-full"
          placeholder="Search stories by Title, Url and Author "
        />
      </div>
    </div>
  );
};

export default SerachBar;
