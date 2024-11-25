import React from "react";
import SerachBar from "../components/SerachBar";
import Data from "../components/Data";

function Dashboard({ username }) {
  // const handleLogout = () => {
  //   localStorage.removeItem("username");
  //   localStorage.removeItem("password");
  //   window.location.reload();
  // };

  return (
    <div className="flex max-w-7xl mb-10 mx-auto flex-col items-center  justify-center  bg-gray-100">
      <SerachBar username={username} />
      <div className="flex w-full justify-between ">
        <div className="flex text-sm">
          <div className="flex gap-2 px-2 py-3">
            <p className="text-sm text-gray-800">Search</p>
            <select
              name="hnFilter"
              className="w-fit border-[1px]  outline-none border-gray-500"
              id="hnFilter"
            >
              <option value="all">All</option>
              <option value="stories">Stories</option>
              <option value="comments">Comments</option>
              <option value="ask">Ask HN</option>
              <option value="show">Show HN</option>
              <option value="launch">Launch HN</option>
              <option value="jobs">Jobs</option>
              <option value="polls">Polls</option>
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
        <Data />
      </div>
    </div>
  );
}

export default Dashboard;
