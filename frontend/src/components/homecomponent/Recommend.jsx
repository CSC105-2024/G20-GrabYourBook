import React, { useRef, useState, useEffect } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { Navigate, useNavigate } from "react-router-dom";
import { Axios } from "../../utils/axiosInstance";

function Recommend() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const handleClick = (book) => {
    if (book.remainingCopies === 0) {
      navigate(`/detailbook/${book.BookId}`);
    } else {
      navigate(`/detailbookava/${book.BookId}`);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await Axios.get("/book/detailBook");
        if (res.data.success) {
          setBooks(res.data.data);
        }
      } catch (e) {
        console.error("error fetching books", e);
      }
    };
    fetchBooks();
  }, []);

  const scrollRef = useRef(null);
  const scrollAmount = 250;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  


  return (
    <div className="w-full flex justify-center items-center px-9">
      <div className="w-full h-full max-w-320 rounded-lg bg-white flex flex-col justify-center px-4 shadow-lg p-8 mx-5 relative">
        <h2 className="text-xl sm:text-2xl sm:text-left text-center font-bold sm:pl-20 pt-0 mb-5">
          Recommended
        </h2>
        <div className="items-center justify-center flex">
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-1 -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 sm:p-2 p-1 sm:ml-4 rounded-full"
          >
            <GoChevronLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory w-10/12 max-w-full scrollbar-hide"
          >
            {books.map((book, i) => (
              <div
                key={i}
                className="flex-none w-[85px] sm:w-[180px] snap-center"
              >
                {" "}
                <div onClick={() => handleClick(book)}>
                  <img
                    src={book.CoverUrl}
                    alt={book.title}
                    className="w-full h-[140px] sm:h-[270px] object-cover rounded-lg shadow"
                  />
                  <h3 className="text-sm sm:text-lg font-semibold mt-2 truncate">
                    {book.Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {book.Author}
                  </p>
                  <button
                    className={`mt-2 max-w-40 text-xs sm:text-sm py-1 px-2 rounded text-white ${
                      book.remainingCopies === 0 ? "bg-red-500" : "bg-[#418C86]"
                    }`}
                  >
                    {book.remainingCopies === 0 ? "Unavailable" : "Available"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-1 -translate-y-1/2 z-10 sm:mr-4 bg-gray-200 hover:bg-gray-300 sm:p-2 p-1 rounded-full"
          >
            <GoChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recommend;
