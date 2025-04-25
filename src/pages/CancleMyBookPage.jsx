import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import warning from "../icons/warning.svg";
import xIcon from "../icons/xIcon.svg";
import Navbar from "../components/Navbar";

const CancleMyBookPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId, books } = location.state || {};

  const handleYes = () => {
    const updateBooks = books.filter((book) => book.id !== bookId);
    localStorage.setItem("reservedBooks", JSON.stringify(updateBooks));
    navigate("/canclesuccess", { state: { books: updateBooks } });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-200">
      <div className="w-[2000px] h-[1000px] left-[60%] top-[-30%] absolute bg-indigo-300 rounded-full blur-[150px]" />
      <div className="w-[1000px] h-[600px] left-[65%] top-[10%] absolute bg-blue-500 rounded-full blur-[250px]" />

      <div className="relative z-20">
        <Navbar />
      </div>
      <div className="relative w-full h-screen flex items-center justify-center  px-4 ">
        <div className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-md shadow-xl flex flex-col items-center text-center min-h-[380px]">
          <button
            onClick={() => navigate("/mybook", { state: { books } })}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full"
          >
            <img
              src={xIcon}
              alt="Close"
              className="w-8 h-8 hover:bg-indigo-100 rounded-full"
            />
          </button>

          <div className="flex flex-col justify-center items-center flex-grow gap-5">
            <img src={warning} alt="warning" className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-bold mb-6 text-black font-['Poppins']">
              Are you sure you want to cancel?
            </h2>
            <div className="grid grid-cols-2 gap-8 justify-center items-center">
              <button
                onClick={() => navigate("/mybook", { state: { books } })}
                className=" text-[#061C6A] font-semibold px-6 py-2 rounded-full border-1 hover:bg-blue-800 hover:text-white transition font-['Poppins']"
              >
                No
              </button>
              <button
                onClick={handleYes}
                className="bg-[#061C6A] text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-800 transition font-['Poppins']"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancleMyBookPage;
