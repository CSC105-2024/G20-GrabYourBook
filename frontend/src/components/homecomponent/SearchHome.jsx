import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchHome() {
  return (
    <div className="w-full flex justify-center items-center px-4 mt-10">
      <div className="w-full max-w-320 bg-white rounded-lg shadow-lg flex flex-col items-center p-5 m-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#092737] mb-5 text-center">
          What are you looking for?
        </h2>
        <div className="flex flex-row w-3/4 gap-3 items-center sm:items-stretch">
          <input
            className="w-2/3 sm:w-auto flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3 shadow-sm"
            placeholder="Search for Book, Categories, Author"
          />
          <button className="w-12 h-12 flex items-center justify-center text-2xl text-gray-400 bg-gray-50 rounded-lg border border-gray-300 hover:bg-gray-200 shadow-sm">
            <CiSearch />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchHome;
