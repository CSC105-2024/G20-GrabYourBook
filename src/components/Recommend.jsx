import "../App.css";
import React, { useState, useRef } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
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
  const scrollAmount = 200;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
     
          <div className="flex flex-col w-85 sm:w-320 sm:h-140 mt-5 bg-white rounded-xl shadow-lg justify-center items-center relative">
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl text-left font-bold pl-20 mt-4 mb-4">
                Recommended
              </h2>
            </div>

            <button
              onClick={scrollLeft}
              className="absolute left-2 sm:left-15 z-10 sm-p-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <GoChevronLeft size={24} />
            </button>
            <div
              ref={scrollRef}
              className="flex gap-1 sm:gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide w-62 sm:w-239 "
            >
              {books.map((book, i) => (
                <div
                  key={i}
                  className="flex-none w-30 h-70 sm:w-45 sm:h-100 sm:p-2 p-1/2 rounded-lg snap-center"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-30 h-50 sm:w-45 sm:h-70 object-cover rounded"
                  />
                  <h3 className="text-xs sm:text-lg font-semibold mt-2">{book.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{book.author}</p>
                  <button className="text-xs sm:text-sm mt-1 sm:mt-2 px-2 py-1/2 sm:px-4 sm:py-1 bg-[#418C86] text-white rounded">
                    Available
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={scrollRight}
              className="absolute right-2 sm:right-15 z-10 sm:p-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <GoChevronRight size={24} />
            </button>
          </div>
          
                   
             
    </div>
  );
}

export default Recommend;




