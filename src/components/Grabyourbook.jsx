import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import Hobbit from "../images/hobbit.jpg";
import Percy from "../images/Percy.jpg";
import Sherlock from "../images/sherlock.jpg";

function Grabyourbook() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col md:flex-row md:space-x-20">
            <div className="text-center md:text-left">
              <div className="text-blue-950 text-4xl md:text-8xl sm:mb-10 sm:mt-20 mt-5 font-normal font-['Libre_Caslon_Text']">
                <h1 className="sm:mb-8 mb-3">Grab Your Book</h1>
                <h1>Choose Your Vibe</h1>
              </div>
              <div>
                <div className="flex gap-6 mt-6 justify-center md:justify-start">
                  <Link
                    to="/register"
                    className="px-6 py-3 bg-blue-950 text-white font-semibold rounded-2xl items-center justify-center"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="px-6 py-3 text-blue-950 border-2 border-blue-950 font-semibold rounded-2xl"
                  >
                    Log In
                  </Link>
                </div>
              </div>
              <div className="sm:mt-8 mt-4 text-xl w-70 sm:w-120 text-center md:text-left text-gray-700 font-['Libre_Caslon_Display']">
                <p>
                  "Neque porro quisquam est qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit..."
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="hidden md:block">
            <div className="flex flex-col md:flex-row gap-8 justify-center md:justify-start mt-5 md:mt-8">
              <div className="text-center justify-center items-center flex flex-col">
                <img
                  className="w-30 h-auto rounded-md shadow-lg"
                  src={Hobbit}
                  alt="hobbit"
                />
                <p className="text-md text-white w-full mt-4 font-['Libre_Caslon_Text']">
                  The Hobbit
                </p>
              </div>
              <div className="text-center justify-center mt-40 items-center flex flex-col">
                <img
                  className="w-30 h-auto rounded-md shadow-lg"
                  src={Percy}
                  alt="percy"
                />
                <p className="text-md w-full text-white mt-4 text-center font-['Libre_Caslon_Text']">
                  Percy Jackson
                </p>
              </div>
              <div className="text-center justify-center items-center flex flex-col">
                <img
                  className="w-30 h-auto rounded-md shadow-lg"
                  src={Sherlock}
                  alt="Sherlock"
                />
                <p className="text-md w-30 text-white mt-4 font-['Libre_Caslon_Text']">
                  The Adventures of Sherlock Holmes
                </p>
              </div>
            </div>
          </div>
        </div></div>
      </div>
    </div>
  );
}

export default Grabyourbook;
