import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import harryImg from "../../images/harry.jpg";
import hobbitImg from "../../images/hobbit.jpg";
import Percy from "../../images/Percy.jpg";
import Sherlock from "../../images/sherlock.jpg";
import confirmErrorIcon from "../../icons/bookingError.svg";

const books = [
  {
    id: "1",
    title: "Harry Potter and the Order of the Phoenix",
    image: harryImg,
    description: "",
  },
  {
    id: "2",
    title: "The Hobbit",
    image: hobbitImg,
    description: "",
  },
  {
    id: "3",
    title: "Percy",
    image: Percy,
    description: "",
  },
  {
    id: "4",
    title: "Sherlock",
    image: Sherlock,
    description: "",
  },
];

const cutTitle = (title, maxLength = 20) => {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
};

const addToMyBooks = (book, startDate, endDate) => {
  const currentBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
  const newBook = {
    id: book.id,
    title: book.title,
    cover: book.image,
    reserveStart: startDate,
    reserveEnd: endDate,
  };
  localStorage.setItem("myBooks", JSON.stringify([...currentBooks, newBook]));
};

const ConfirmBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const foundBook = books.find((b) => b.id === id);
    setBook(foundBook);

    if (bookingError) {
      const timer = setTimeout(() => {
        setBookingError("");
        setShakeTrigger(false);
      }, 3000);
      return () => setTimeout(timer);
    }
  }, [id, bookingError]);

  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setStartDate(e.target.value);

    const calculatedEndDate = new Date(selectedDate);
    calculatedEndDate.setDate(calculatedEndDate.getDate() + 5);
    const formattedEndDate = calculatedEndDate.toISOString().split("T")[0];
    setEndDate(formattedEndDate);
  };

  const [shakeTrigger, setShakeTrigger] = useState(false);

  const triggerShake = () => {
    setShakeTrigger(false);
    requestAnimationFrame(() => {
      setShakeTrigger(true);
    });
  };

  const handleBooking = () => {
    if (!startDate) {
      setBookingError("Please select a start date before booking.");
      triggerShake();
      return;
    }

    setBookingError("");
    addToMyBooks(book, startDate, endDate);
    navigate(`/booking-success/${id}`);
  };

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading book info...</p>
      </div>
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

        <div className="z-20 w-full max-w-[800px] md:bg-white md:rounded-2xl md:shadow-xl p-6 flex flex-col items-center gap-10 md:w-[600px] md:h-[450px]">
          <h2 className="text-2xl font-bold text-center w-full mt-3 font-['Poppins']">
            Confirm Booking
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full justify-center">
            <div className="flex flex-col items-center w-full md:w-auto">
              <img
                src={book.image}
                alt={book.title}
                className="w-40 h-60 rounded-lg shadow-md object-cover font-['Poppins']"
              />
              <p className="mt-4 text-blue-900 font-bold text-lg text-center font-['Poppins']">
                {cutTitle(book.title)}
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
