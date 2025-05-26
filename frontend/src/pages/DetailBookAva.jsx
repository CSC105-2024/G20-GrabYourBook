import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Axios } from "../utils/axiosInstance";

function DetailBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null); 
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await Axios.get(`/book/${id}`);
        if (res.data.success) {
          setBook(res.data.data);
        }
      } catch (e) {
        console.error("Error fetching book detail:", e);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <>
        <div className="text-center mt-20 text-lg text-gray-500">
          Loading...
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
              className="w-full h-80 rounded-2xl object-cover"
            />

            <div className="flex flex-row">
              <p className="text-yellow-900 font-normal">
                Remaining {book.remainingCopies} copies
              </p>
            </div>

            <div className="text-center text-[#418C86] text-2xl font-semibold leading-tight">
              <p>{book.remainingCopies > 0 ? "Currently" : "Not"}</p>
              <p>{book.remainingCopies > 0 ? "available" : "available"}</p>
            </div>
            <button
              onClick={() => navigate(`/booking/${book.BookId}`)}
              className="bg-[#001F8B] hover:bg-blue-700 text-white px-10 py-2 rounded-xl font-semibold"
              disabled={book.remainingCopies <= 0}
            >
              Borrow a book
            </button>
          </div>

          <div className="Right Box flex flex-col gap-6 text-black max-w-xl mt-0 ">
            <h1 className="text-2xl md:text-5xl font-bold text-[#061C6A]">
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
              <p className="font-bold md:text-3xl">Description :</p>
              <p className="text-sm md:text-xl text-justify mt-1 leading-relaxed">
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
