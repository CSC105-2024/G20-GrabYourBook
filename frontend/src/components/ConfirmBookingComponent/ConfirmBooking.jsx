import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import confirmErrorIcon from "../../icons/bookingError.svg";
import { Axios } from "../../utils/axiosInstance";





const cutTitle = (title, maxLength = 20) =>
title.length > maxLength ? title.slice(0, maxLength) + "..." : title;



const ConfirmBooking = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await Axios.get(`/book/${id}`);
        if (res.data.success) {
          setBook(res.data.data);
        }
      } catch (e) {
        console.error("Error loading book", e);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    if (bookingError) {
      const timer = setTimeout(() => {
        setBookingError("");
        setShakeTrigger(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [bookingError]);

  const triggerShake = () => {
    setShakeTrigger(false);
    requestAnimationFrame(() => setShakeTrigger(true));
  };

  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setStartDate(e.target.value);

    const calculatedEnd = new Date(selectedDate);
    calculatedEnd.setDate(calculatedEnd.getDate() + 5);
    const formattedEnd = calculatedEnd.toISOString().split("T")[0];
    setEndDate(formattedEnd);
  };

  const isLoggedIn = () => {
    return document.cookie.includes("authToken");
  };

const handleBooking = async () => {
  if (!isLoggedIn()) {
    navigate("/login");
    return;
  }

  if (!startDate) {
    setBookingError("Please select a start date before booking.");
    triggerShake();
    return;
  }

  try {
    const res = await Axios.post(
      `/borrow/borrow`,
      {
        bookId: Number(id),
        reserveDate: startDate,
      },
      { withCredentials: true }
    );

    if (res.data.success) {
      navigate(`/borrow/booking-success/${id}`);
    } else {
      setBookingError(res.data.msg || "Booking failed.");
      triggerShake();
    }
  } catch (e) {
    console.error("Booking Error:", e?.response?.data || e.message || e);
    setBookingError("Booking failed.");
    triggerShake();
  }
};



  if (!book) {
    return (
      <>
       
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-xl text-gray-600">Loading book info...</p>
        </div>
      </>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-neutral-200 overflow-hidden relative flex justify-center items-center px-4">
      <div className="w-[2000px] h-[1000px] left-[60%] top-[-30%] absolute bg-indigo-300 rounded-full blur-[150px]" />
      <div className="w-[1000px] h-[600px] left-[65%] top-[10%] absolute bg-blue-500 rounded-full blur-[250px]" />
      <div className="w-[1500px] h-[700px] right-[70%] top-[-30%] absolute bg-indigo-200 rounded-full blur-[150px]" />

      <div className=" flex flex-col justify-center">
        {bookingError && (
          <div
            className={`max-w-[800px] max-h-[60px] md:rounded-2xl md:shadow-xl p-3 flex flex-row text-xs md:flex-row  justify-center gap-1 md:gap-5 items-center md:w-[600px] mb-4 w-full bg-white text-black md:text-lg text-bold rounded-xl text-center font-semibold z-30 font-['Poppins'] ${
              shakeTrigger ? "animate-shake" : "animate-fadeInScale"
            }`}
          >
            <img
              src={confirmErrorIcon}
              alt="error icon"
              className="w-5 h-5 md:w-10 md:h-10 mb-2 mt-1"
            />
            <span>{bookingError}</span>
          </div>
        )}

        <div className="z-20 w-full max-w-[800px] md:bg-white md:rounded-2xl md:shadow-xl p-6 flex flex-col items-center gap-10 md:w-[600px] md:h-[450px] animate-fadeInScale">
          <h2 className="text-2xl font-bold text-center w-full mt-3 font-['Poppins']">
            Confirm Booking
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full justify-center">
            <div className="flex flex-col items-center w-full md:w-auto">
              <img
                src={book.CoverUrl}
                alt={book.Title}
                className="w-40 h-60 rounded-lg shadow-md object-cover font-['Poppins']"
              />
              <p className="mt-4 text-blue-900 font-bold text-lg text-center font-['Poppins']">
                {cutTitle(book.Title)}
              </p>
            </div>

            <form className="flex flex-col gap-7 items-center w-full md:items-start md:w-auto">
              <div className="w-full max-w-[220px]">
                <label className="block text-gray-700 font-medium mb-2 text-sm font-['Poppins']">
                  Start Date:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  min={today}
                  className="w-full rounded-xl border border-gray-400 px-4 py-2 bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-['Poppins']"
                />
              </div>

              <div className="w-full max-w-[220px]">
                <label className="block text-gray-700 font-medium mb-2 text-sm font-['Poppins']">
                  End Date:
                </label>
                <input
                  type="date"
                  value={endDate}
                  readOnly
                  className="w-full rounded-xl border border-gray-400 px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed font-['Poppins']"
                />
              </div>

              <button
                type="button"
                onClick={handleBooking}
                className="self-center mt-2 px-6 py-2 bg-[#001F8B] text-white font-bold rounded-xl hover:bg-blue-700 transition w-[100px] max-w-[220px] font-['Poppins']"
              >
                Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
