import React, { useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Navbar from "../components/Navbar";
import Harry from "../images/harry.jpg";
import Lotr from "../images/lordofthering.jpg";
import Elizabeth from "../images/elizabeth.jpg";
import Gameofthrone from "../images/gameofthrone.jpg";
import Hobbit from "../images/hobbit.jpg";
import Percy from "../images/Percy.jpg";
import Sherlock from "../images/sherlock.jpg";
import Alchemist from "../images/alchemist.jpg";
import Little from "../images/littlemermaid.jpg";
import WomenInMe from "../images/womeninme.jpg";

function Fantasy() {
  const books = [
    {
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K Rowling's",
      cover: Harry,
    },
    { title: "The Women In Me", author: "Britney Spears", cover: WomenInMe },
    { title: "The Lord Of The Ring", author: "J.R.R Tolkien", cover: Lotr },
    { title: "Elizabeth", author: "Gyles Brandreth", cover: Elizabeth },
    { title: "The Little Mermaid", author: "Hans Christian", cover: Little },
    {
      title: "Game of Thrones",
      author: "George R.R. Martin",
      cover: Gameofthrone,
    },
    { title: "The Hobbit", author: "J.R.R Tolkien", cover: Hobbit },
    { title: "Percy Jackson", author: "Rick Riordan", cover: Percy },
    { title: "Sherlock Holmes", author: "Conan Doyle", cover: Sherlock },
    { title: "The Alchemist", author: "Paulo Coelho", cover: Alchemist },
    { title: "The Hobbit", author: "J.R.R Tolkien", cover: Hobbit },
    { title: "Percy Jackson", author: "Rick Riordan", cover: Percy },
    { title: "Sherlock Holmes", author: "Conan Doyle", cover: Sherlock },
    { title: "The Alchemist", author: "Paulo Coelho", cover: Alchemist },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const truncateText = (text, max) =>
    text.length > max ? text.slice(0, max - 3) + "..." : text;

  const booksPerPage = 12;
  const pages = Array.from(
    { length: Math.ceil(books.length / booksPerPage) },
    (_, i) => books.slice(i * booksPerPage, i * booksPerPage + booksPerPage)
  );
  const currentBooks = pages[currentPage - 1];

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full overflow-hidden flex items-center justify-center absolute ">
          <div className="w-[1000px] h-[1400px] left-[-300px] top-[-500px] sm:w-[1360px] sm:h-[1500px] sm:left-[40%] sm:top-[-30%] absolute bg-[#8B73A0] rounded-full blur-[100px] sm:blur-[254.50px]" />
          <div className="w-[900px] h-[1200px] right-[-200px] top-[-700px] sm:w-[1200px] sm:h-[1500px] sm:right-[-400px] sm:top-[-70%] absolute bg-[#4E7DD7] blur-[150px] sm:blur-[254.50px]" />
        </div>
      </div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-64px)] items-center px-4 py-4 mt-6 w-full max-w-screen-xl mx-auto">
        <h3 className="font-bold flex w-full text-2xl text-white sm:text-[#092737] mb-6">
          Fantasy
        </h3>

        <div className="w-full bg-white/60 rounded-2xl p-4 sm:p-6 shadow">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {currentBooks.map((book, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="bg-white w-full aspect-[7/10] rounded-lg overflow-hidden flex items-center justify-center p-2">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <h3 className="text-sm text-left font-semibold mt-2 w-full truncate">
                  {truncateText(book.title, isMobile ? 14 : 22)}
                </h3>
                <p className="text-xs text-left text-gray-600 w-full truncate">
                  {truncateText(book.author, isMobile ? 16 : 28)}
                </p>
              </div>
            ))}
          </div>
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
            {currentPage} / {pages.length}
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

export default Fantasy;
