import { useNavigate, useRouteError } from "react-router-dom";
import errorIcon from "../icons/Error.svg";
import xIcon from "../icons/xIcon.svg";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-neutral-200 px-4 overflow-hidden">
      <div className="w-[2000px] h-[1000px] left-[60%] top-[-30%] absolute bg-indigo-300 rounded-full blur-[150px]" />
      <div className="w-[1000px] h-[600px] left-[65%] top-[10%] absolute bg-blue-500 rounded-full blur-[250px]" />

      <div className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-md shadow-xl flex flex-col items-center text-center min-h-[380px] animate-fadeInScale">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <img
            src={xIcon}
            alt="Close"
            className="w-8 h-8 hover:bg-red-100 rounded-full"
          />
        </button>

        <div className="flex flex-col justify-center items-center flex-grow gap-5">
          <img src={errorIcon} alt="Error" className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold mb-2 text-black font-['Poppins']">
            Oops! Something went wrong.
          </h2>
          <p className="text-sm text-gray-600 mb-6 max-w-xs font-['Poppins']">
            {error?.message ||
              "Please try again later."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-800 transition font-['Poppins']"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;