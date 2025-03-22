import "../App.css";
import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Grabyourbook from "../components/Grabyourbook";
import Search from "../components/Search";
import Recommend from "../components/Recommend";
import Category from "../components/Category";

function HomePage() {
  

  return (
    <div className="flex flex-col w-full bg-blue-100 justify-center items-center">
      <Navbar />
      <Grabyourbook />
      <Search />
      <Recommend />
      <Category />
    </div>
  );
}

export default HomePage;
