import React from "react";
import { useNavigate } from "react-router-dom";
import { SlClose } from "react-icons/sl";
import warning from "../icons/warning.svg";

const CancleMyBookPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-neutral-200 px-4 overflow-hidden">
      <div className="w-[2000px] h-[1000px] left-[60%] top-[-30%] absolute bg-indigo-300 rounded-full blur-[150px]" />
      <div className="w-[1000px] h-[600px] left-[65%] top-[10%] absolute bg-blue-500 rounded-full blur-[250px]" />

      <div className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-md shadow-xl flex flex-col items-center text-center min-h-[380px]">
        <button
          onClick={() => navigate("/mybook")}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <div className="w-8 h-8 text-3xl font-semibold hover:bg-indigo-100 rounded-full">
            <SlClose />
          </div>
        </button>

        <div className="flex flex-col justify-center items-center flex-grow gap-5">
        <img
            src={warning}
            alt="warning"
            className="w-12 h-12 mb-4"
          />
          <h2 className="text-xl font-bold mb-6 text-black font-['Poppins']">
            Are you sure you want to cancel?
          </h2>
          <div className="grid grid-cols-2 gap-8 justify-center items-center">
            <button
              onClick={() => navigate("/mybook")}
              className=" text-[#061C6A] font-semibold px-6 py-2 rounded-full border-1 hover:bg-blue-800 hover:text-white transition font-['Poppins']"
            >
              No
            </button>
            <button
              onClick={() => navigate("/canclesuccess")}
              className="bg-[#061C6A] text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-800 transition font-['Poppins']"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancleMyBookPage;
