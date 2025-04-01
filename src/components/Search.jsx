import "../App.css";
import React, { useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";

function Search() {
  return (
    <div className="search w-85 sm:w-320 h-40 rounded-lg bg-white flex flex-col justify-center items-center mt-5 shadow-lg">
      <h2 className="sm:text-3xl text-xl font-bold text-[#092737] mb-5">
        What are you looking for?
      </h2>
      <div className="flex flex-row">
        <input
          className="bg-gray-50 sm:w-200 w-60 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 shadow-sm mr-5"
          placeholder="Search for Book, Categories, Author"
        />
        <button className="p-1.5 text-3xl w-12 h-12 text-gray-300 bg-gray-50 rounded-lg border border-gray-300 hover:bg-gray-200 shadow-sm">
          <CiSearch />
        </button>
      </div>
    </div>
  );
}

export default Search;
