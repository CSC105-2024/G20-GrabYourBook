import React from "react";
import Navbar from "../components/Navbar";
import pic from "../images/harry.jpg";

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        {/* Desktop blur background - centered */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center z-0">
          <div className="w-[1095px] h-[1319px] bg-blue-500 blur-[254.5px]" />
        </div>

        {/* Mobile top-left corner blur */}
        <div className="md:hidden absolute top-0 left-0 z-0">
          <div className="w-[600px] h-[600px] bg-blue-500 blur-[254.5px] rounded-full -translate-x-1/3 -translate-y-1/3" />
        </div>

        {/* Card */}
        <div className="w-full  md:max-w-[1150px] md:h-[615px] md:bg-white bg-transparent md:rounded-[20px] rounded-none md:shadow-lg shadow-none z-10">
          {/* Inner layout responsive */}
          <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-[1150px] md:h-[538px]   pr-0 mt-5">
            {/* Left Box */}
            <div className="flex flex-col justify-center my-0 items-center mb-0 mt-0  gap-3 p-4 pl-7   ">
              <img className="w-52 h-80 rounded-3xl" src={pic} alt="Book" />

              <div className="text-[#418C86] text-xl font-semibold font-['Poppins']">
                Available
              </div>

              <div className="w-52 px-5 py-2.5 bg-blue-950 rounded-2xl inline-flex justify-center items-center gap-2.5">
                <button className="text-white text-xl font-semibold font-['Poppins']">
                  Borrow a book
                </button>
              </div>

              <div className="text-yellow-900 text-sm md:text-lg font-medium font-['Poppins']">
                Remaining: 2 copies
              </div>
            </div>

            {/* Right Box */}
            <div className="w-full md:max-w-[1150px] md:h-[615px] flex flex-col justify-center items-start gap-5  md:px-20 md:pl-10 md:py-10 px-8 py-8">
              <div className="text-blue-950 text-2xl md:text-3xl font-bold font-['Poppins'] text-center md:text-left w-full">
                From The Films Of Harry Potter
              </div>

              <div className="flex flex-row gap-2">
                <div className="text-black text-lg md:text-2xl font-bold font-['Poppins']">
                  Author :
                </div>
                <div className="text-black text-lg md:text-2xl font-normal font-['Poppins']">
                  JODY REVENSON
                </div>
              </div>

              <div className="flex flex-row gap-2">
                <div className="text-black text-lg md:text-2xl font-bold font-['Poppins']">
                  Category :
                </div>
                <div className="text-black text-lg md:text-2xl font-normal font-['Poppins']">
                  Novel, Comedy
                </div>
              </div>

              <div className="flex flex-col">
                <div className="text-black text-lg md:text-2xl font-bold font-['Poppins']">
                  Description :
                </div>
                <div className="text-black text-sm md:text-2xl font-normal font-['Poppins'] text-justify">
                  Harry Potter in 100 Objects presents a host of incredible
                  props, artefacts and set items from the legendary Harry Potter
                  movies. Through colourful photography and insider facts from
                  the creators of all eight films, readers will discover the
                  significance of each object and its unique role in shaping the
                  beloved series. Filled with cast and crew interviews,
                  behind-the-scenes accounts, concept art and film facts, this
                  is a must-have for all Harry Potter fans.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
