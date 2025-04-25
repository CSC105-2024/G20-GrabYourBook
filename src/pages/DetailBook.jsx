import React from "react";
import Navbar from "../components/Navbar";
import pic from "../images/harry.jpg";
import { Navigate, useNavigate } from "react-router-dom";

function DetailBook() {

    const navigate = useNavigate();

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
            <img src={pic} alt="book" className="w-full h-80 rounded-2xl" />

            <div className="flex flex-row">
              <p className="text-yellow-900 font-normal">Remaining 0 opies</p>
            </div>

            <div className="text-center text-[#E54545] text-2xl font-semibold leading-tight">
              <p>Currently</p>
              <p>not available</p>
            </div>
            <button
              onClick={() => navigate("/booking/1")}
              className="bg-[#001F8B] hover:bg-blue-700 text-white px-10 py-2 rounded-xl font-semibold"
            >
              Borrow a book
            </button>

            <div className="flex flex-row ">
              <p className="text-xs text-yellow-900 text-center mt-1">
                Nearest available date : 29/02/2025
              </p>
            </div>
          </div>

          <div className="Right Box flex flex-col gap-6 text-black max-w-xl  ">
            <h1 className="text-2xl md:text-4xl font-bold text-[#061C6A]">
              From The Films Of Harry Potter
            </h1>
            <p>
              <span className="font-bold md:text-3xl">Author :</span>
              <span className="font-semi md:text-xl"> JODY REVENSON</span>
            </p>
            <p>
              <span className="font-bold md:text-3xl">Category :</span>
              <span className="font-semi md:text-xl"> Novel, Comedy</span>
            </p>
            <div>
              <p className="font-bold md:text-3xl ">Description :</p>
              <p className="text-sm  md:text-xl text-justify mt-1 leading-relaxed">
                Harry Potter in 100 Objects presents a host of incredible props,
                artefacts and set items from the legendary Harry Potter movies.
                Through colourful photography and insider facts from the
                creators of all eight films, readers will discover the
                significance of each object and its unique role in shaping the
                beloved series. Filled with cast and crew interviews,
                behind-the-scenes accounts, concept art and film facts, this is
                a must-have for all Harry Potter fans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailBook;
