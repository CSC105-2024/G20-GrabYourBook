import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import bookingSuccessIcon from "../../icons/bookingSuccesIcon.svg";
import xIcon from "../../icons/xIcon.svg";

const BookingSuccessPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-200">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <p className="text-xl font-bold text-red-600">Invalid Booking ID</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center bg-neutral-200 px-4 overflow-hidden">
      <div className="w-[2000px] h-[1000px] left-[60%] top-[-30%] absolute bg-indigo-300 rounded-full blur-[150px]" />
      <div className="w-[1000px] h-[600px] left-[65%] top-[10%] absolute bg-blue-500 rounded-full blur-[250px]" />

      <div className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-md shadow-xl flex flex-col items-center text-center min-h-[380px] animate-fadeInScale">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <img
            src={xIcon}
            alt="Close"
            className="w-8 h-8 hover:bg-indigo-100 rounded-full"
          />
        </button>

        <div className="flex flex-col justify-center items-center flex-grow gap-5">
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
    </div>
  );
};

export default BookingSuccessPage;
