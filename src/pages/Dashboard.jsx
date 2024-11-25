import React, { useState } from "react";
import SerachBar from "../components/SerachBar";
import Data from "../components/Data";

function Dashboard({ username }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("story"); // Filter by type
  const [sortBy, setSortBy] = useState("popularity"); // Sort by popularity or date
  const [timeRange, setTimeRange] = useState("all_time"); // Time range filter

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value); // Update sortBy
  };

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value); // Update timeRange
  };

  return (
    <div className="flex max-w-7xl mb-10 mx-auto flex-col items-center justify-center bg-gray-100">
      <SerachBar username={username} onSearch={handleSearch} />
      <div className="flex w-full justify-between ">
        <div className="flex text-sm">
          {/* Filter by Type */}
          <div className="flex gap-2 px-2 py-3">
            <p className="text-sm text-gray-800">Search</p>
            <select
              name="hnFilter"
              className="w-fit border-[1px] outline-none border-gray-500"
              id="hnFilter"
              onChange={handleFilterChange}
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

          {/* Sort by */}
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

          {/* Time Range */}
          <div className="flex gap-2 px-2 py-3">
            <p className="text-sm text-gray-800">All time</p>
            <select
              name="timeRange"
              className="w-[70px] border-[1px] outline-none border-gray-500"
              id="timeRange"
              onChange={handleTimeRangeChange}
            >
              <option value="all_time">All time</option>
              <option value="last_24h">Last 24h</option>
              <option value="past_week">Past Week</option>
              <option value="past_month">Past Month</option>
              <option value="past_year">Past Year</option>
              <option value="custom_range">Custom range</option>
            </select>
          </div>
        </div>
        <div className="px-3 py-2 text-sm text-gray-600">
          <p>38,359,332 results (0.003 seconds)</p>
        </div>
      </div>
      <div className="flex w-full px-3">
        {/* Pass all filters as props */}
        <Data
          searchQuery={searchQuery}
          filter={filter}
          sortBy={sortBy}
          timeRange={timeRange}
        />
      </div>
    </div>
  );
}

export default Dashboard;
