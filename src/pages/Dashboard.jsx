import React, { useEffect, useState } from "react";
import SerachBar from "../components/SerachBar";
import { useLocation, useNavigate } from "react-router-dom";
import Data from "../components/Data";

function Dashboard({ username }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("story");
  const [sortBy, setSortBy] = useState("popularity");
  const [timeRange, setTimeRange] = useState("all_time");

  // New state for custom date range
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCustomDatePickerOpen, setIsCustomDatePickerOpen] = useState(false);

  const [resultInfo, setResultInfo] = useState({
    totalResults: 0,
    timeTaken: 0,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleTimeRangeChange = (e) => {
    const selectedTimeRange = e.target.value;
    setTimeRange(selectedTimeRange);

    // Open custom date picker if "Custom Range" is selected
    if (selectedTimeRange === "custom_range") {
      setIsCustomDatePickerOpen(true);
    } else {
      setIsCustomDatePickerOpen(false);
    }
  };

  const handleCustomDateSubmit = () => {
    // Validate dates
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Ensure end date is not before start date
      if (end < start) {
        alert("End date must be after start date");
        return;
      }

      setIsCustomDatePickerOpen(false);
    }
  };
  useEffect(() => {
    // Parse URL query params
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("query") || "");
    setFilter(params.get("type") || "story");
    setSortBy(params.get("sort") || "popularity");
    setTimeRange(params.get("dateRange") || "all_time");

    if (isFirstRender && !location.search) {
      setIsFirstRender(false);
    }
  }, [location.search]);

  useEffect(() => {
    // Update the URL whenever state changes
    if (isFirstRender) return;
    const params = new URLSearchParams();
    params.set("query", searchQuery);
    params.set("type", filter);
    params.set("sort", sortBy);
    params.set("dateRange", timeRange);

    navigate(`?${params.toString()}`, { replace: true });
  }, [searchQuery, filter, sortBy, timeRange, navigate, isFirstRender]);
  return (
    <div className="flex max-w-7xl mb-10 mx-auto flex-col items-center justify-center bg-gray-100">
      <SerachBar username={username} onSearch={handleSearch} />
      <div className="flex w-full justify-between ">
        <div className="flex text-sm">
          <div className="flex gap-2 px-2 py-3">
            <p className="text-sm  md:flex hidden text-gray-800">Search</p>
            <select
              name="hnFilter"
              className="md:w-28 text-xs w-24 md:text-base border-[1px] outline-none border-gray-500"
              id="hnFilter"
              value={filter}
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
          <div className="flex gap-2 px-0 md:px-2 py-3">
            <p className="text-sm  md:flex hidden text-gray-800">by</p>
            <select
              name="sortBy"
              className="md:w-28 w-20 text-xs md:text-base border-[1px] outline-none border-gray-500"
              id="sortBy"
              value={sortBy}
              onChange={handleSortByChange}
            >
              <option value="popularity">Popularity</option>
              <option value="date">Date</option>
            </select>
          </div>
          <div className="flex gap-2 px-2 py-3">
            <p className="text-sm md:flex hidden text-gray-800">All time</p>
            <select
              name="timeRange"
              className="md:w-32 w-[100px] text-xs md:text-base border-[1px] outline-none border-gray-500"
              id="timeRange"
              value={timeRange}
              onChange={handleTimeRangeChange}
            >
              <option value="all_time">All time</option>
              <option value="last_24h">Last 24 hours</option>
              <option value="past_week">Past Week</option>
              <option value="past_month">Past Month</option>
              <option value="past_year">Past Year</option>
              <option value="custom_range">Custom Range</option>
            </select>
          </div>
        </div>

        <div className="px-3 md:flex items-center hidden py-2 text-sm text-gray-600">
          <p>
            {resultInfo.totalResults.toLocaleString()} results (
            {resultInfo.timeTaken} seconds)
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full px-3">
        {isCustomDatePickerOpen && (
          <div className="flex items-center md:flex-row flex-col md:gap-1 gap-3 px-1 space-x-2 md:px-2 py-3">
            <div className="flex   md:flex-row flex-col md:items-center">
              <label htmlFor="startDate" className="mr-2 text-sm">
                From
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate ? startDate : ""}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-[1px] outline-none border-gray-500 px-1 py-1 rounded"
              />
            </div>
            <div className="flex  md:flex-row flex-col md:items-center">
              <label htmlFor="endDate" className="mr-2 text-sm">
                To
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate ? endDate : ""}
                onChange={(e) => setEndDate(e.target.value)}
                className="border-[1px] flex outline-none border-gray-500 px-2 py-1 rounded"
              />
            </div>
            <button
              onClick={handleCustomDateSubmit}
              className="bg-[#ff742b] w-fit  text-white px-2 py-1 rounded"
            >
              Apply
            </button>
          </div>
        )}
        <Data
          searchQuery={searchQuery}
          filter={filter}
          sortBy={sortBy}
          timeRange={timeRange}
          customStartDate={startDate}
          customEndDate={endDate}
          onResultInfoUpdate={(totalResults, timeTaken) =>
            setResultInfo({ totalResults, timeTaken })
          }
        />
      </div>
    </div>
  );
}

export default Dashboard;
