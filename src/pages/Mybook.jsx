import React, { useState } from "react";
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


const App = () => {
  const books = [
    {
      id: 1,
      title: "The Lord of the Rings",
      reserveStart: new Date("2025-04-23T05:56:20.916Z"),
      reserveEnd: new Date("2025-04-27T05:56:20.916Z"),
      cover: Harry,
    },
    {
      id: 2,
      title: "Animal Farm",
      reserveStart: new Date("2025-04-20T13:36:03.869Z"),
      reserveEnd: new Date("2025-04-23T13:36:03.869Z"),
      cover: Lotr,
    },
    {
      id: 3,
      title: "The Alchemist",
      reserveStart: new Date("2025-05-27T11:00:30.769Z"),
      reserveEnd: new Date("2025-06-17T11:00:30.769Z"),
      cover: Elizabeth,
    },
    {
      id: 4,
      title: "The Shining",
      reserveStart: new Date("2025-06-05T21:03:34.739Z"),
      reserveEnd: new Date("2025-06-15T21:03:34.739Z"),
      cover: Gameofthrone,
    },
    {
      id: 5,
      title: "The Odyssey",
      reserveStart: new Date("2025-04-30T10:15:27.838Z"),
      reserveEnd: new Date("2025-05-19T10:15:27.838Z"),
      cover: Hobbit,
    },
    {
      id: 6,
      title: "Don Quixote",
      reserveStart: new Date("2025-05-23T22:01:45.974Z"),
      reserveEnd: new Date("2025-06-11T22:01:45.974Z"),
      cover: Percy,
    },
    {
      id: 7,
      title: "Moby Dick",
      reserveStart: new Date("2025-04-30T05:20:10.217Z"),
      reserveEnd: new Date("2025-05-13T05:20:10.217Z"),
      cover: Sherlock,
    },
    {
      id: 8,
      title: "War and Peace",
      reserveStart: new Date("2025-05-16T07:54:17.480Z"),
      reserveEnd: new Date("2025-05-28T07:54:17.480Z"),
      cover: Alchemist,
    },
    {
      id: 9,
      title: "Pride and Prejudice",
      reserveStart: new Date("2025-06-07T03:09:38.643Z"),
      reserveEnd: new Date("2025-06-11T03:09:38.643Z"),
      cover: Little,
    },
    {
      id: 10,
      title: "Moby Dick",
      reserveStart: new Date("2025-04-25T14:29:49.889Z"),
      reserveEnd: new Date("2025-04-30T14:29:49.889Z"),
      cover: WomenInMe,
    },
    
  ];

  const [reservedBooks, setReservedBooks] = useState([]);

  const handleAddBook = () => {
    const randIdx = parseInt((Math.random() * (books.length - 1)).toFixed(0));
    setReservedBooks((prev) => [...prev, books[randIdx]]);
  };

  const handleRemoveBook = (id) => {
    setReservedBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const AddBookComponent = () => (
    <div
      className="w-160 h-50 min-h-40 bg-white/37 flex justify-center items-center border-2 border-black rounded-2xl border-dashed cursor-pointer hover:bg-white/50 transition"
      onClick={handleAddBook}
    >
      <p className="text-center text-xl font-semibold">+ Add more books</p>
    </div>
  );

  const BookComponent = ({ book, onRemove }) => {
    return (
      <div className="w-[60%] max-w-[700px] bg-white rounded-2xl shadow-md p-6 flex gap-10 items-center border ">
        
        <div className="min-w-[110px] h-[160px] overflow-hidden rounded-xl border border-gray-200">
          <img
            src={book.cover}
            alt={book.title}
            className="object-cover w-full h-full"
          />
        </div>


        <div className="flex flex-col justify-between h-full w-full gap-6">
          <div className="mb-0 space-y-2 ">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              {book.title}
            </h1>
            <p className="text-base sm:text-l font-medium text-black ">
              Start Date:{" "}
              {new Date(book.reserveStart).toLocaleDateString("en-GB")}
            </p>
            <p className="text-base font-medium sm:text-l text-black">
              End Date: {new Date(book.reserveEnd).toLocaleDateString("en-GB")}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => onRemove(book.id)}
              className="bg-[#001F8B] text-white text-sm sm:text-base font-semibold px-6 py-2 rounded-xl hover:bg-[#0033cc] transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <>
      <div className="w-full h-full bg-neutral-200 relative -z-10">
        <div className="w-[1246px] h-[1529px] right-[50%] top-[-500px] absolute bg-indigo-300 rounded-full blur-[300px] -z-10" />
        <div className="w-[690px] h-[921px] right-[85%] top-[-315px] absolute bg-blue-500 blur-[380px] -z-10" />
      </div>
      <div>
        <Navbar />
      </div>

      <div className="flex justify-center items-center m-4 my-12">
        <div className="text-center justify-center text-blue-950 text-4xl font-bold font-['Poppins']">
          Your bookshelf
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="MiddleContainer gap-8 w-200 h-fit max-h-8/12 overflow-scroll bg-white/45 rounded-2xl flex flex-col items-center py-10 justify-center">
          {reservedBooks.map((r, i) => (
            <BookComponent book={r} key={i} onRemove={handleRemoveBook} />
          ))}
          <AddBookComponent />
        </div>
      </div>
    </>
  );
};

export default App;
