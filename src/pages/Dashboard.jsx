import React, { useState } from "react";
import SerachBar from "../components/SerachBar";
import Data from "../components/Data";

function Dashboard({ username }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("story"); // Default filter
  const [sortBy, setSortBy] = useState("popularity"); // Default sorting
  const [timeRange, setTimeRange] = useState("all_time"); // Default time range
  const [resultInfo, setResultInfo] = useState({
    totalResults: 0,
    timeTaken: 0,
  }); // To store results and time info

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update filter based on selection
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value); // Update sorting
  };

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value); // Update time range
  };

  return (
    <div className="flex max-w-7xl mb-10 mx-auto flex-col items-center justify-center bg-gray-100">
      <SerachBar username={username} onSearch={handleSearch} />
      <div className="flex w-full justify-between ">
        <div className="flex text-sm">
          <div className="flex gap-2 px-2 py-3">
            <p className="text-sm text-gray-800">Search</p>
            <select
              name="hnFilter"
              className="w-fit border-[1px] outline-none border-gray-500"
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
              name="sortBy"
              className="w-[70px] border-[1px] outline-none border-gray-500"
              id="sortBy"
              onChange={handleSortByChange}
            >
              <option value="popularity">Popularity</option>
              <option value="date">Date</option>
            </select>
          </div>
          <div className="flex gap-2 px-2 py-3">
            <p className="text-sm text-gray-800">All time</p>
            <select
              name="timeRange"
              className="w-[70px] border-[1px] outline-none border-gray-500"
              id="timeRange"
              onChange={handleTimeRangeChange}
            >
              <option value="all_time">All time</option>
              <option value="last_24h">Last 24 hours</option>
              <option value="past_week">Past Week</option>
              <option value="past_month">Past Month</option>
              <option value="past_year">Past Year</option>
            </select>
          </div>
        </div>
        {/* Replace static text with dynamic data */}
        <div className="px-3 md:flex hidden py-2 text-sm text-gray-600">
          <p>
            {resultInfo.totalResults.toLocaleString()} results (
            {resultInfo.timeTaken} seconds)
          </p>
        </div>
      </div>
      <div className="flex w-full px-3">
        <Data
          searchQuery={searchQuery}
          filter={filter}
          sortBy={sortBy}
          timeRange={timeRange}
          onResultInfoUpdate={(totalResults, timeTaken) =>
            setResultInfo({ totalResults, timeTaken })
          }
        />
      </div>
    </div>
  );
}

export default Dashboard;
