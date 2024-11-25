import React, { useEffect, useState } from "react";

const highlightText = (text, highlight) => {
  if (!highlight || highlight.trim() === "") {
    return text;
  }

  const regex = new RegExp(`(${highlight})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} className="bg-[#ff0] font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const Data = ({ searchQuery, filter }) => {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const timeAgo = (date) => {
    const now = new Date();
    const createdDate = new Date(date);
    const seconds = Math.floor((now - createdDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  const fetchStories = async (page, query, filter) => {
    setLoading(true);
    const startTime = performance.now();
    try {
      // Adjust fetch URL based on filter
      const filterTag = filter !== "all" ? `&tags=${filter}` : "";
      const response = await fetch(
        `http://hn.algolia.com/api/v1/search?query=${query}${filterTag}&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTotalResults(data.nbHits);
      setStories(data.hits);
      setTotalPages(Math.ceil(data.nbHits / 20));

      const endTime = performance.now();
      const timeDifference = ((endTime - startTime) / 1000).toFixed(3);
      setTimeTaken(timeDifference);
    } catch (error) {
      console.log("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const nextPageData = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevPageData = () => {
    if (page > 0) {
      setPage(0); // Move directly to the first page
      window.scrollTo(0, 0);
    }
  };

  const paginationNumbers = () => {
    const pageNumbers = [];
    const start = Math.max(page - 3, 0);
    const end = Math.min(start + 9, totalPages - 1);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  useEffect(() => {
    fetchStories(page, searchQuery, filter);
  }, [page, searchQuery, filter]);

  return (
    <div className="max-w-7xl py-2 flex flex-col">
      <p>
        {totalResults.toLocaleString()} results ({timeTaken} seconds)
      </p>

      {stories.map((story, i) => (
        <div key={i} className="mb-5">
          <h2 className="font-medium">
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {highlightText(story.title, searchQuery)}
            </a>
            <a className="px-1 text-sm text-gray-600" href={story.url}>
              {highlightText(`(${story.url})`, searchQuery)}
            </a>
          </h2>
          <p className="text-xs text-gray-600">
            {story.points} points | {highlightText(story.author, searchQuery)} |{" "}
            {story.num_comments} comments | {timeAgo(story.created_at)}
          </p>
        </div>
      ))}

      {!loading && (
        <div className="mt-5 text-center">
          {page > 0 && (
            <button
              onClick={() => setPage(0)} // Reset to first page
              className="px-2 text-gray-400 rounded border-[1px] text-center border-gray-400"
            >
              {"<"}
            </button>
          )}

          {/* Pagination */}
          {paginationNumbers().map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              disabled={page === num}
              className={`px-2 mx-1 text-gray-400 rounded text-md ${
                page === num
                  ? "border-[1px] border-[#ff742b] cursor-not-allowed"
                  : "border-[1px] border-gray-400"
              }`}
            >
              {num + 1}
            </button>
          ))}

          {page < totalPages - 1 && (
            <button
              onClick={() => setPage(page + 1)}
              className="px-2 text-gray-400 rounded border-[1px] text-center border-gray-400"
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
