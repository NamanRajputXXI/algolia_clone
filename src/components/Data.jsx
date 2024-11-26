// import React, { useEffect, useState } from "react";

// const highlightText = (text, highlight) => {
//   if (!highlight || highlight.trim() === "") {
//     return text;
//   }

//   const regex = new RegExp(`(${highlight})`, "gi");
//   return text.split(regex).map((part, index) =>
//     part.toLowerCase() === highlight.toLowerCase() ? (
//       <span key={index} className="bg-[#ff0] font-bold">
//         {part}
//       </span>
//     ) : (
//       part
//     )
//   );
// };

// const Data = ({
//   searchQuery,
//   filter,
//   sortBy,
//   timeRange,
//   customStartDate,
//   customEndDate,
//   onResultInfoUpdate,
// }) => {
//   const [stories, setStories] = useState([]);
//   const [page, setPage] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [totalResults, setTotalResults] = useState(0);
//   const [timeTaken, setTimeTaken] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   const timeAgo = (date) => {
//     const now = new Date();
//     const createdDate = new Date(date);
//     const seconds = Math.floor((now - createdDate) / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const months = Math.floor(days / 30);
//     const years = Math.floor(days / 365);

//     if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
//     if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
//     if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
//     if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//     if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
//     return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
//   };

//   const fetchStories = async (
//     page,
//     query,
//     filter,
//     sortBy,
//     timeRange,
//     customStartDate,
//     customEndDate
//   ) => {
//     setLoading(true);
//     const startTime = performance.now();

//     try {
//       let baseUrl = `http://hn.algolia.com/api/v1/search`;
//       const filterTag = filter !== "all" ? `&tags=${filter}` : "";

//       // Handle sorting
//       if (sortBy === "date") {
//         baseUrl = `http://hn.algolia.com/api/v1/search_by_date`;
//       }

//       // Handle time range filtering
//       const now = Date.now() / 1000;
//       let timeFilter = "";
//       const timeRanges = {
//         last_24h: now - 24 * 60 * 60,
//         past_week: now - 7 * 24 * 60 * 60,
//         past_month: now - 30 * 24 * 60 * 60,
//         past_year: now - 365 * 24 * 60 * 60,
//       };

//       if (timeRange !== "all_time" && timeRanges[timeRange]) {
//         timeFilter = `&numericFilters=created_at_i>${timeRanges[timeRange]}`;
//       }

//       // Handle custom date range
//       if (timeRange === "custom_range" && customStartDate && customEndDate) {
//         const customStartTimestamp = Math.floor(
//           customStartDate.getTime() / 1000
//         );
//         const customEndTimestamp = Math.floor(customEndDate.getTime() / 1000);
//         timeFilter = `&numericFilters=created_at_i>${customStartTimestamp},created_at_i<${customEndTimestamp}`;
//       }

//       const response = await fetch(
//         `${baseUrl}?query=${query}${filterTag}${timeFilter}&page=${page}`
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const data = await response.json();
//       setTotalResults(data.nbHits);
//       setStories(data.hits);
//       setTotalPages(Math.ceil(data.nbHits / 20));

//       const endTime = performance.now();
//       const timeDifference = ((endTime - startTime) / 1000).toFixed(3);
//       setTimeTaken(timeDifference);

//       // Pass updated values to Dashboard via callback
//       onResultInfoUpdate(data.nbHits, timeDifference);
//     } catch (error) {
//       console.error("Error fetching stories:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (pageNumber) => {
//     setPage(pageNumber);
//     window.scrollTo(0, 0);
//   };

//   const paginationNumbers = () => {
//     const pageNumbers = [];
//     const start = Math.max(page - 3, 0);
//     const end = Math.min(start + 9, totalPages - 1);

//     for (let i = start; i <= end; i++) {
//       pageNumbers.push(i);
//     }
//     return pageNumbers;
//   };

//   useEffect(() => {
//     fetchStories(
//       page,
//       searchQuery,
//       filter,
//       sortBy,
//       timeRange,
//       customStartDate,
//       customEndDate
//     );
//   }, [
//     page,
//     searchQuery,
//     filter,
//     sortBy,
//     timeRange,
//     customStartDate,
//     customEndDate,
//   ]);

//   return (
//     <div className="max-w-7xl w-full py-2 flex flex-col">
//       {stories.map((story, i) => (
//         <div key={i} className="mb-5">
//           <h2 className="font-medium">
//             <a
//               href={story.url}
//               className="break-words"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               {highlightText(story.title, searchQuery)}
//             </a>
//             <a
//               className="px-1  text-xs sm:text-sm text-gray-600 break-words"
//               href={story.url}
//             >
//               {highlightText(`(${story.url})`, searchQuery)}
//             </a>
//           </h2>
//           <p className="text-xs text-gray-600">
//             {story.points} points | {highlightText(story.author, searchQuery)} |{" "}
//             {story.num_comments} comments | {timeAgo(story.created_at)}
//           </p>
//           {story.story_text && (
//             <div
//               className="space-y-2 mt-1 break-words text-xs sm:text-sm"
//               dangerouslySetInnerHTML={{
//                 __html: story.story_text,
//               }}
//             />
//           )}
//         </div>
//       ))}

//       {!loading && (
//         <div className="mt-5 text-center flex items-center justify-center gap-1">
//           {/* Previous Button */}
//           {page > 0 && ( // Only render the button if the page is greater than 0
//             <button
//               onClick={() => handlePageChange(0)} // Always move to the first page
//               className={`md:px-2 px-1 text-gray-400 rounded text- md:text-md text-xs border-[1px] border-gray-400 hover:border-[#ff742b]`}
//             >
//               &lt;
//             </button>
//           )}

//           {/* Pagination Numbers */}
//           {paginationNumbers().map((num) => (
//             <button
//               key={num}
//               onClick={() => handlePageChange(num)}
//               disabled={page === num}
//               className={`md:px-2 px-1  text-gray-400 rounded text-xs md:text-md ${
//                 page === num
//                   ? "border-[1px] border-[#ff742b] cursor-not-allowed"
//                   : "border-[1px] border-gray-400"
//               }`}
//             >
//               {num + 1}
//             </button>
//           ))}

//           {/* Next Button */}
//           <button
//             onClick={() => handlePageChange(page + 1)}
//             disabled={page === totalPages - 1}
//             className={`md:px-2 px-1 text-gray-400 rounded text-xs md:text-md ${
//               page === totalPages - 1
//                 ? "border-[1px] border-gray-300 cursor-not-allowed"
//                 : "border-[1px] border-gray-400 hover:border-[#ff742b]"
//             }`}
//           >
//             &gt;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Data;

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

const Data = ({
  searchQuery,
  filter,
  sortBy,
  timeRange,
  customStartDate,
  customEndDate,
  onResultInfoUpdate,
}) => {
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

  const fetchStories = async (
    page,
    query,
    filter,
    sortBy,
    timeRange,
    customStartDate,
    customEndDate
  ) => {
    setLoading(true);
    const startTime = performance.now();

    try {
      let baseUrl = `http://hn.algolia.com/api/v1/search`;
      const filterTag = filter !== "all" ? `&tags=${filter}` : "";

      // Handle sorting
      if (sortBy === "date") {
        baseUrl = `http://hn.algolia.com/api/v1/search_by_date`;
      }

      // Handle time range filtering
      const now = Date.now() / 1000;
      let timeFilter = "";
      const timeRanges = {
        last_24h: now - 24 * 60 * 60,
        past_week: now - 7 * 24 * 60 * 60,
        past_month: now - 30 * 24 * 60 * 60,
        past_year: now - 365 * 24 * 60 * 60,
      };

      if (timeRange !== "all_time" && timeRanges[timeRange]) {
        timeFilter = `&numericFilters=created_at_i>${timeRanges[timeRange]}`;
      }

      // Handle custom date range
      if (timeRange === "custom_range" && customStartDate && customEndDate) {
        const customStartTimestamp = Math.floor(
          new Date(customStartDate).getTime() / 1000
        );
        const customEndTimestamp = Math.floor(
          new Date(customEndDate).getTime() / 1000
        );
        timeFilter = `&numericFilters=created_at_i>${customStartTimestamp},created_at_i<${customEndTimestamp}`;
      }

      const response = await fetch(
        `${baseUrl}?query=${query}${filterTag}${timeFilter}&page=${page}`
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

      // Pass updated values to Dashboard via callback
      onResultInfoUpdate(data.nbHits, timeDifference);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
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
    fetchStories(
      page,
      searchQuery,
      filter,
      sortBy,
      timeRange,
      customStartDate,
      customEndDate
    );
  }, [
    page,
    searchQuery,
    filter,
    sortBy,
    timeRange,
    customStartDate,
    customEndDate,
  ]);

  return (
    <div className="max-w-7xl w-full py-2 flex flex-col">
      {stories.map((story, i) => (
        <div key={i} className="mb-5">
          <h2 className="font-medium">
            <a
              href={story.url}
              className="break-words"
              target="_blank"
              rel="noopener noreferrer"
            >
              {highlightText(story.title, searchQuery)}
            </a>
            <a
              className="px-1  text-xs sm:text-sm text-gray-600 break-words"
              href={story.url}
            >
              {highlightText(`(${story.url})`, searchQuery)}
            </a>
          </h2>
          <p className="text-xs text-gray-600">
            {story.points} points | {highlightText(story.author, searchQuery)} |{" "}
            {story.num_comments} comments | {timeAgo(story.created_at)}
          </p>
          {story.story_text && (
            <div
              className="space-y-2 mt-1 break-words text-xs sm:text-sm"
              dangerouslySetInnerHTML={{
                __html: story.story_text,
              }}
            />
          )}
        </div>
      ))}

      {!loading && (
        <div className="mt-5 text-center flex items-center justify-center gap-1">
          {/* Previous Button */}
          {page > 0 && ( // Only render the button if the page is greater than 0
            <button
              onClick={() => handlePageChange(0)} // Always move to the first page
              className={`md:px-2 px-1 text-gray-400 rounded text- md:text-md text-xs border-[1px] border-gray-400 hover:border-[#ff742b]`}
            >
              &lt;
            </button>
          )}

          {/* Pagination Numbers */}
          {paginationNumbers().map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              disabled={page === num}
              className={`md:px-2 px-1  text-gray-400 rounded text-xs md:text-md ${
                page === num
                  ? "border-[1px] border-[#ff742b] cursor-not-allowed"
                  : "border-[1px] border-gray-400"
              }`}
            >
              {num + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages - 1}
            className={`md:px-2 px-1 text-gray-400 rounded text-xs md:text-md ${
              page === totalPages - 1
                ? "border-[1px] border-gray-300 cursor-not-allowed"
                : "border-[1px] border-gray-400 hover:border-[#ff742b]"
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Data;
