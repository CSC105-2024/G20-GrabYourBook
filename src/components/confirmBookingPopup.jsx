import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import bookingSuccessIcon from "../icons/bookingSuccesIcon.svg";
import xIcon from "../icons/xIcon.svg";

const BookingSuccessPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-neutral-200 px-4 overflow-hidden">
      <div className="absolute w-[2000px] h-[1000px] left-[60%] top-[-30%] bg-indigo-300 rounded-full blur-[150px]" />
      <div className="absolute w-[1000px] h-[600px] left-[65%] top-[10%] bg-blue-500 rounded-full blur-[250px]" />

      <div className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-md shadow-xl flex flex-col items-center text-center">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <img src={xIcon} alt="Close" className="w-8 h-8 hover:bg-indigo-100 rounded-full" />
        </button>

        <img
          src={bookingSuccessIcon}
          alt="Success"
          className="w-12 h-12 mb-4"
        />
        <h2 className="text-xl font-bold mb-6 text-black font-['Poppins']">
          Booking Successful!
        </h2>
        <button
          onClick={() => navigate("/mybook")}
          className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-800 transition font-['Poppins']"
        >
          My Book
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessPage;