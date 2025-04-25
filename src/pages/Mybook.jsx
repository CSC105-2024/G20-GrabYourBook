import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Mybook = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [reservedBooks, setReservedBooks] = useState([]);

  useEffect(() => {
    const locationBooks = location.state?.books;
    if (locationBooks) {
      setReservedBooks(locationBooks);
      localStorage.setItem("reservedBooks", JSON.stringify(locationBooks));
    } else {
      const saved = localStorage.getItem("reservedBooks");
      setReservedBooks(saved ? JSON.parse(saved) : []);
    }
  }, [location.state]);

  const handleCancle = (bookingId) => {
    navigate("/canclewarning", {
      state: { bookingId, books: reservedBooks },
    });
  };

  const AddBookComponent = () => (
    <div
      className="w-full max-w-[700px] h-50 min-h-40 bg-white/37 flex justify-center items-center border-2 border-black rounded-2xl border-dashed cursor-pointer hover:bg-white/50 transition"
      onClick={() => navigate("/search")}
    >
      <p className="text-center text-xl font-semibold">+ Add more books</p>
    </div>
  );

  const BookComponent = ({ book }) => (
    <div className="w-full max-w-[700px] bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-16 items-center">
      <div className="w-[120px] h-[170px] sm:w-[100px] sm:h-[150px] md:w-[130px] md:h-[180px] overflow-hidden rounded-xl border border-gray-200 flex-shrink-0">
        <img
          src={book.cover}
          alt={book.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between w-full gap-4 sm:gap-6">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
            {book.title}
          </h1>
          <p className="text-sm sm:text-base font-medium text-black font-['Poppins']">
            Start Date:{" "}
            {new Date(book.reserveStart).toLocaleDateString("en-GB")}
          </p>
          <p className="text-sm sm:text-base font-medium text-black font-['Poppins']">
            End Date: {new Date(book.reserveEnd).toLocaleDateString("en-GB")}
          </p>
        </div>
        <div className="flex sm:justify-end">
          <button
            onClick={() => handleCancle(book.bookingId)}
            className="bg-[#001F8B] hover:bg-[#0033cc] text-white text-sm sm:text-base font-semibold px-6 py-2 rounded-xl w-full md:w-[40%] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative w-full flex -z-10">
        <div className="w-[1246px] h-[1529px] right-[50%] top-[-500px] absolute bg-indigo-400 rounded-full blur-[400px] -z-10" />
        <div className="w-[690px] h-[921px] right-[85%] top-[-315px] absolute bg-blue-400 blur-[520px] -z-10" />
      </div>

      <Navbar />
      <div className="flex justify-center items-center m-4 my-12">
        <div className="text-center justify-center text-blue-950 text-4xl font-bold font-['Poppins']">
          Your bookshelf
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="MiddleContainer gap-8 w-[50%] h-[700px] overflow-y-auto bg-white/45 rounded-2xl flex flex-col items-center py-10 px-4 shadow-xl">
          {reservedBooks.map((book, i) => (
            <BookComponent book={book} key={book.id} />
          ))}
          <AddBookComponent />
        </div>
      </div>
    </>
  );
};

export default Mybook;