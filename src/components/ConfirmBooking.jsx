import React, { useState } from "react";
const today = new Date().toISOString().split("T")[0];

import Harry from "../images/harry.jpg";

const ConfirmBooking = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setStartDate(e.target.value);

    const calculatedEndDate = new Date(selectedDate);
    calculatedEndDate.setDate(calculatedEndDate.getDate() + 5);
    const formattedEndDate = calculatedEndDate.toISOString().split("T")[0];
    setEndDate(formattedEndDate);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-neutral-200 overflow-hidden relative flex justify-center items-center px-4">
      <div className="w-[2000px] h-[1000px] left-[60%] top-[-30%] absolute bg-indigo-300 rounded-full blur-[150px]" />
      <div className="w-[1000px] h-[600px] left-[65%] top-[10%] absolute bg-blue-500 rounded-full blur-[250px]" />
      <div className="w-[1500px] h-[700px] right-[70%] top-[-30%] absolute bg-indigo-200 rounded-full blur-[150px]" />
      <div className="z-20 w-full max-w-[800px] md:bg-white md:rounded-2xl md:shadow-xl p-6 flex flex-col items-center gap-15 md:w-[600px] md:h-[450px] md:gap-10">
        <h2 className="text-2xl font-bold text-center w-full md:text-2xl sm:text-xl mt-2">
          Confirm Booking
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-15 w-full justify-center">
          <div className="flex flex-col items-center w-full md:w-auto">
            <img
              src={Harry}
              alt="Harry Potter Book"
              className="w-42 h-62 rounded-lg shadow-md md:w-43 md:h-65"
            />
            <p className="mt-4 text-blue-900 font-bold text-lg text-center">
              From The Film...
            </p>
          </div>

          <form className="flex flex-col gap-7 items-center w-full md:items-start md:w-auto">
            <div className="w-full max-w-[220px]">
              <label className="block text-gray-700 font-medium mb-4 text-sm">
                Start Date:
              </label>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                min={today}
                className="w-full rounded-xl border border-gray-400 px-4 py-2 bg-gray-100 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="w-full max-w-[220px]">
              <label className="block text-gray-700 font-medium mb-4 text-sm">
                End Date:
              </label>
              <input
                type="date"
                value={endDate}
                readOnly
                className="w-full rounded-xl border border-gray-400 px-4 py-2 bg-gray-100 text-gray-300 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="self-center mt-2 px-6 py-2 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-700 transition w-[100px] max-w-[220px]"
            >
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
