import React, { useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Navbar from "../components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Axios } from "../utils/axiosInstance";

function SearchResult() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!query.trim()) return;
    Axios.get(`/book/search?name=${query}`)
      .then((res) => {
        setBooks(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch search results:", err);
      });
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query });
  };

  const truncateText = (text, max) =>
    text.length > max ? text.slice(0, max - 3) + "..." : text;

  const booksPerPage = 12;
  const pages = Array.from(
    { length: Math.ceil(books.length / booksPerPage) },
    (_, i) => books.slice(i * booksPerPage, i * booksPerPage + booksPerPage)
  );
  const currentBooks = pages[currentPage - 1] || [];

  const handleClick = (book) => {
    navigate(`/detailbook?id=${book.BookId}`);
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full overflow-hidden flex items-center justify-center absolute ">
          <div className="w-[170vw] h-[140vh] left-[-40%] top-[-10%] sm:w-[100vh] sm:h-[180vw]  md:w-[100vw] md:h-[180vh] md:left-[20%] md:top-[-10%] absolute bg-[#8B73A0] rounded-full blur-[100px] sm:blur-[250px]" />
          <div className="w-[160vw] h-[130vh] right-[-18%] top-[-50%] sm:w-[90vh] sm:h-[160vh]  md:w-[90vw]  md:h-[160vh] md:right-[-30%] md:top-[-50%] absolute bg-[#4E7DD7] blur-[150px] sm:blur-[250px]" />
        </div>
      </div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="relative z-10 flex flex-col min-w-[70svw] justify-center items-center px-4 py-2 mt-6 w-full max-w-screen-xl mx-auto gap-3">
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-[1000px] h-[50px] bg-white/70 backdrop-blur-md rounded-lg shadow-md outline-[0.5px] outline-black flex items-center px-4"
        >
          <input
            type="search"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-full bg-transparent focus:outline-none"
          />
        </form>

        <div className="w-full bg-white/60 rounded-2xl p-4 sm:p-6 shadow">
          {currentBooks.length === 0 ? (
            <div className="w-full text-center py-10 text-xl font-semibold text-gray-600">
              No results found.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-y-15">
              {currentBooks.map((book, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center cursor-pointer"
                  onClick={() => handleClick(book)}
                >
                  <div className="bg-white w-full aspect-[7/10] max-sm:max-w-[12rem] rounded-lg overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={book.CoverUrl}
                      alt={book.Title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <h3 className="text-sm text-left font-semibold mt-3 max-sm:max-w-[12rem] w-full truncate">
                    {truncateText(book.Title || book.title, isMobile ? 14 : 22)}
                  </h3>
                  <p className="text-xs text-left text-gray-600 max-sm:max-w-[12rem] w-full truncate">
                    {truncateText(
                      book.Author || book.author,
                      isMobile ? 16 : 28
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-white/60 hover:bg-white text-[#092737] text-xs rounded-full w-8 h-8 flex items-center justify-center shadow"
            disabled={currentPage === 1}
          >
            <SlArrowLeft />
          </button>
          <span className="text-[#092737] text-sm font-medium">
            {currentPage} / {pages.length || 1}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pages.length))
            }
            className="bg-white/60 hover:bg-white text-[#092737] text-xs rounded-full w-8 h-8 flex items-center justify-center shadow"
            disabled={currentPage === pages.length}
          >
            <SlArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;