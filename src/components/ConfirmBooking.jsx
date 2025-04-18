import "../App.css";
import React from "react";

const ConfirmBooking = () => {
  return (
    <>
      <div className="w-full h-screen bg-neutral-200 overflow-hidden relative">
        <div className="w-[3000px] h-[1500px] left-[60%] top-[-30%] absolute bg-indigo-300 rounded-full blur-[150px]" />
        <div className="w-[1000px] h-[600px] left-[65%] top-[10%] absolute bg-blue-500 rounded-full blur-[250px]" />
        <div className="w-[1500px] h-[700px] right-[70%] top-[-30%] absolute bg-indigo-200 rounded-full blur-[150px]" />
      </div>
    </>
  );
};

export default ConfirmBooking;
