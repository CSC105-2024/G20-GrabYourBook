import React, { useRef } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import Harry from "../../images/harry.jpg";
import Lotr from "../../images/lordofthering.jpg";
import Elizabeth from "../../images/elizabeth.jpg";
import Gameofthrone from "../../images/gameofthrone.jpg";
import Hobbit from "../../images/hobbit.jpg";
import Percy from "../../images/Percy.jpg";
import Sherlock from "../../images/sherlock.jpg";
import Alchemist from "../../images/alchemist.jpg";
import Little from "../../images/littlemermaid.jpg";
import WomenInMe from "../../images/womeninme.jpg";

function Recommend() {
  const books = [
    { title: "Harry Potter ...", author: "J.K Rowling's", cover: Harry },
    { title: "The Women In...", author: "Britney Spears", cover: WomenInMe },
    { title: "The Lord Of T...", author: "J.R.R Tolkien", cover: Lotr },
    { title: "Elizabeth", author: "Gyles Brandreth", cover: Elizabeth },
    { title: "The Little Mer ...", author: "Hans Christian", cover: Little },
    {
      title: "Game of Thrones",
      author: "George R.R. Martin",
      cover: Gameofthrone,
    },
    { title: "The Hobbit", author: "J.R.R Tolkien", cover: Hobbit },
    { title: "Percy Jackson", author: "Rick Riordan", cover: Percy },
    { title: "Sherlock Holmes", author: "Arthur Conan Doyle", cover: Sherlock },
    { title: "The Alchemist", author: "Paulo Coelho", cover: Alchemist },
  ];

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
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-[140px] sm:h-[270px] object-cover rounded-lg shadow"
                />
                <h3 className="text-sm sm:text-lg font-semibold mt-2 truncate">
                  {book.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  {book.author}
                </p>
                <button className="mt-2 max-w-40 text-xs sm:text-sm py-1 px-2 bg-[#418C86] text-white rounded">
                  Available
                </button>
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
