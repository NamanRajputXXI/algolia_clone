import React, { useState } from "react";
import SerachBar from "../components/SerachBar";
import Data from "../components/Data";

function Dashboard({ username }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("story"); // Default filter

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update filter based on selection
  };

  return (
    <div className="flex max-w-7xl mb-10 mx-auto flex-col items-center  justify-center  bg-gray-100">
      <SerachBar username={username} onSearch={handleSearch} />
      <div className="flex w-full justify-between ">
        <div className="flex text-sm">
          <div className="flex gap-2 px-2 py-3">
            <p className="text-sm text-gray-800">Search</p>
            <select
              name="hnFilter"
              className="w-fit border-[1px]  outline-none border-gray-500"
              id="hnFilter"
              onChange={handleFilterChange} // Listen for changes
            >
              <option value="all">All</option>
              <option value="story">Stories</option>
              <option value="comment">Comments</option>
              <option value="ask_hn">Ask HN</option>
              <option value="show_hn">Show HN</option>
              <option value="launch_hn">Launch HN</option>
              <option value="job">Jobs</option>
              <option value="poll">Polls</option>
            </select>
          </div>
          <div className="flex gap-2 px-2 py-3">
            <p className="text-sm text-gray-800">by</p>
            <select
              name="hnFilter"
              className="w-[70px] border-[1px]  outline-none border-gray-500"
              id="hnFilter"
            >
              <option value="all">Popularity</option>
              <option value="stories">Date</option>
            </select>
          </div>
          <div className="flex gap-2 px-2 py-3">
            <p className="text-sm text-gray-800">All time</p>
            <select
              name="hnFilter"
              className="w-[70px]  border-[1px]  outline-none border-gray-500"
              id="hnFilter"
            >
              <option value="all">All time</option>
              <option value="stories">Last 24th</option>
              <option value="comments">Past Week</option>
              <option value="ask">Past Month</option>
              <option value="show">Past Year</option>
              <option value="launch">Custom range</option>
            </select>
          </div>
        </div>
        <div className="px-3 py-2 text-sm text-gray-600">
          <p>38,359,332 results (0.003 seconds)</p>
        </div>
      </div>
      <div className="flex w-full px-3">
        <Data searchQuery={searchQuery} filter={filter} />
      </div>
    </div>
  );
}

export default Dashboard;
