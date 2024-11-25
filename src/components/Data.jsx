import React, { useEffect, useState } from "react";

const Data = () => {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // Store total pages

  const timeAgo = (date) => {
    const now = new Date();
    const createdDate = new Date(date);
    const seconds = Math.floor((now - createdDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };

  const fetchStories = async (page) => {
    setLoading(true);
    const startTime = performance.now(); // Record start time
    try {
      const response = await fetch(
        `http://hn.algolia.com/api/v1/search?query=&tags=story&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTotalResults(data.nbHits);
      setStories(data.hits); // Replace the previous stories with new ones for the selected page
      setTotalPages(Math.ceil(data.nbHits / 20)); // Assuming 20 results per page

      const endTime = performance.now(); // Record end time
      const timeDifference = ((endTime - startTime) / 1000).toFixed(3); // Time in seconds (rounded to 3 decimal places)
      setTimeTaken(timeDifference);
    } catch (error) {
      console.log("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber); // Set the selected page
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  const nextPageData = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1); // Go to the next page
      window.scrollTo(0, 0); // Scroll to top of the page
    }
  };

  const prevPageData = () => {
    if (page > 0) {
      setPage((prev) => prev - 1); // Go to the previous page
      window.scrollTo(0, 0); // Scroll to top of the page
    }
  };

  useEffect(() => {
    fetchStories(page); // Fetch stories when page changes
  }, [page]);

  // Generate an array of page numbers (1 to 6)
  const paginationNumbers = [];
  for (let i = 0; i < Math.min(totalPages, 6); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="max-w-7xl py-2 flex flex-col">
      {/* Display total results and time taken */}
      <p>
        {totalResults.toLocaleString()} results ({timeTaken} seconds)
      </p>

      {/* Display stories */}
      {stories.map((story, i) => (
        <div key={i} className="mb-5">
          <h2 className="font-medium">
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {story.title}
            </a>
            <a className="px-1 text-sm text-gray-600" href={story.url}>
              ({story.url})
            </a>
          </h2>
          <p className="text-xs text-gray-600">
            {story.points} points | {story.author} | {story.num_comments}{" "}
            comments | {timeAgo(story.created_at)}
          </p>
          {story.story_text && (
            <p
              className="py-2 text-sm space-y-2"
              dangerouslySetInnerHTML={{
                __html: story.story_text,
              }}
            />
          )}
        </div>
      ))}

      {/* Pagination controls */}
      {!loading && (
        <div className="mt-5 text-center">
          {/* Previous Button (Only show if not on the first page) */}
          {page > 0 && (
            <button
              onClick={prevPageData}
              className="px-2 text-gray-400 rounded  border-[1px] text-center border-gray-400 disabled:opacity-50"
            >
              {"<"}
            </button>
          )}

          {/* Render Pagination Boxes */}
          {paginationNumbers.map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              disabled={page === num} // Disable the button if it's the current page
              className={`px-2 mx-1 text-gray-400 rounded text-md ${
                page === num
                  ? "border-[1px] border-[#ff742b] cursor-not-allowed"
                  : "border-[1px] border-gray-400 "
              }`}
            >
              {num + 1} {/* Display page number starting from 1 */}
            </button>
          ))}

          {/* Next Button */}
          {page < totalPages - 1 && (
            <button
              onClick={nextPageData}
              className="px-2  text-gray-400 rounded  border-[1px] text-center border-gray-400 disabled:opacity-50"
            >
              {">"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Data;
