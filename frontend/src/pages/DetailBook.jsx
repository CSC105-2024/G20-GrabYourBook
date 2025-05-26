import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Axios } from "../utils/axiosInstance";

function DetailBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nextAvailable, setNextAvailable] = useState(null);

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await Axios.get(`/book/${id}`);
        if (res.data.success) {
          setBook(res.data.data);

          if (res.data.data.remainingCopies === 0) {
            const nextDateRes = await Axios.get(
              `/book/availableDate?bookId=${res.data.data.BookId}`
            );
            if (nextDateRes.data.success) {
              setNextAvailable(nextDateRes.data.nextAvailableDate);
            }
          }
        }
      } catch (e) {
        console.error("Book fetch error:", e);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-gray-600">Loading book...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden">
        <div className="BG hidden md:flex absolute inset-0 items-center justify-center -z-10">
          <div className="w-[1095px] h-[1319px] bg-blue-500 blur-[254.5px]" />
        </div>
        <div className="md:hidden absolute top-0 left-0 -z-10">
          <div className="w-[600px] h-[600px] bg-blue-500 blur-[254.5px] rounded-full -translate-x-1/3 -translate-y-1/3" />
        </div>

        <div
          className=" All Content w-full max-w-[1000px] md:rounded-[20px] px-6 md:px-16 py-8 md:py-16
            md:bg-white bg-transparent md:shadow-lg shadow-none
            flex flex-col md:flex-row gap-18 justify-center items-center z-10"
        >
          <div className="Left Box flex flex-col items-center gap-3 w-[258px]">
            <img
              src={book.CoverUrl}
              alt="book"
              className="w-full h-80 rounded-2xl"
            />
            <div className="flex flex-row">
              <p className="text-yellow-900 font-normal">
                Remaining {book.remainingCopies} copies
              </p>
            </div>
            <div
              className={`text-center text-2xl font-semibold leading-tight ${
                book.remainingCopies === 0 ? "text-[#E54545]" : "text-green-600"
              }`}
            >
              <p>
                {book.remainingCopies === 0
                  ? "Currently unavailable"
                  : "Available now"}
              </p>
            </div>
            {nextAvailable && (
              <div className="text-yellow-900 font-normal justify-center items-center flex flex-col">
                <div>Nearest available date:</div>
                <div>{nextAvailable}</div>
              </div>
            )}
            <button
              onClick={() => navigate(`/booking/${book.BookId}`)}
              disabled={book.remainingCopies === 0}
              className={`px-10 py-2 rounded-xl font-semibold text-white mt-4 
             ${
               book.remainingCopies === 0
                 ? "bg-gray-400 cursor-not-allowed"
                 : "bg-[#001F8B] hover:bg-blue-700"
             }`}
            >
              Reserve this book
            </button>
          </div>

          <div className="Right Box flex flex-col gap-6 text-black max-w-xl  ">
            <h1 className="text-2xl md:text-4xl font-bold text-[#061C6A]">
              {book.Title}
            </h1>
            <p>
              <span className="font-bold md:text-3xl">Author :</span>
              <span className="font-semi md:text-xl"> {book.Author}</span>
            </p>
            <p>
              <span className="font-bold md:text-3xl">Category :</span>
              <span className="font-semi md:text-xl"> {book.Category}</span>
            </p>
            <div>
              <p className="font-bold md:text-3xl ">Description :</p>
              <p className="text-sm  md:text-xl text-justify mt-1 leading-relaxed">
                {book.Description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailBook;
