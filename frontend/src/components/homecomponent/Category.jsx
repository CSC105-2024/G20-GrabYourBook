import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Fantasy from "../../images/fantasy.jpg";
import Comedy from "../../images/comedy.jpg";
import Romance from "../../images/romance.jpg";
import Lgbtq from "../../images/lgbtq.jpg";
import Drama from "../../images/drama.jpg";
import Horror from "../../images/horror.jpg";

function Category() {
  return (
    <div className="w-full flex item-center justify-center px-4">
      <div className="w-full h-full max-w-320 rounded-lg bg-white flex flex-col justify-center sm:items-center shadow-lg p-5 m-5">
        <div className="w-full justify-center sm:text-left items-center">
          
          <h2 className="text-xl sm:text-2xl sm:text-left text-center font-bold sm:pl-20 mt-5 mb-4">
            Categories
          </h2>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center items-center align-middle sm:gap-5">
            <Link
              to="/comedy"
              className="flex flex-col justify-center items-center m-3"
            >
              <img
                className="w-50 h-50 sm:w-70 sm:h-70 p-5 items-center rounded-3xl shadow-md"
                src={Comedy}
                alt="comedy"
              />
              <p className="text-md sm:text-2xl mt-4 ">Comedy</p>
            </Link>

            <Link
              to="/drama"
              className="flex flex-col justify-center items-center m-3"
            >
              <img
                className=" w-50 h-50 sm:w-70 sm:h-70 p-5 items-center rounded-3xl shadow-md"
                src={Drama}
                alt="drama"
              />
              <p className="text-md sm:text-2xl mt-4 ">Drama</p>
            </Link>
            <Link
              to="horror"
              className="flex flex-col justify-center items-center m-3"
            >
              <img
                className="w-50 h-50 sm:w-70 sm:h-70 p-5 items-center rounded-3xl shadow-md"
                src={Horror}
                alt="horror"
              />
              <p className="text-md sm:text-2xl mt-4 ">Horror</p>
            </Link>
            <Link
              to="romance"
              className="flex flex-col justify-center items-center m-3"
            >
              <img
                className=" w-50 h-50 sm:w-70 sm:h-70 p-5 items-center rounded-3xl shadow-md"
                src={Romance}
                alt="romance"
              />
              <p className="text-md sm:text-2xl mt-4 ">Romance</p>
            </Link>
            <Link
              to="fantasy"
              className="flex flex-col justify-center items-center m-3"
            >
              <img
                className="w-50 h-50 sm:w-70 sm:h-70 p-5 items-center rounded-3xl shadow-md"
                src={Fantasy}
                alt="fantasy"
              />
              <p className="text-md sm:text-2xl mt-4 ">Fantasy</p>
            </Link>
            <Link
              to="/lgbtq"
              className="flex flex-col justify-center items-center m-3"
            >
              <img
                className=" w-50 h-50 sm:w-70 sm:h-70 p-5 items-center rounded-3xl shadow-md"
                src={Lgbtq}
                alt="lgbtq"
              />
              <p className="text-md sm:text-2xl mt-4 ">LGBTQ+</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
