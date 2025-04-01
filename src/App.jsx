<<<<<<< HEAD
import { useState } from 'react'
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <div>
      <Navbar/>
    </div>
    </>
  );
}

export default App;

=======
import React, { useState } from "react";
import { z } from "zod";
import errorIcons from "./icons/errorIcons.svg";
import successfullyIcon from "./icons/successfullyIcons.svg";

// Define a schema for validation using zod
const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Mock data for correct login credentials
const correctUsername = "user123";
const correctPassword = "password123";

const LoginPage = () => {
  // State for form fields, errors, and login status
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState(""); // "success" or "error"

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data
    const result = userSchema.safeParse(formData);

    if (result.success) {
      // Check if username and password match the mock credentials
      if (
        formData.username === correctUsername &&
        formData.password === correctPassword
      ) {
        setLoginStatus("success"); // Show success message
      } else {
        setLoginStatus("error"); // Show error message
      }
    } else {
      const newErrors = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      setLoginStatus(""); // Reset status if validation fails
    }
  };

  return (
    <div className="w-full h-screen bg-neutral-200 overflow-hidden relative">
      {/* Background circles */}
      <div className="w-[500px] h-[500px] left-[20%] top-[-20%] absolute bg-indigo-300 rounded-full blur-[150px]" />
      <div className="w-[600px] h-[600px] left-[60%] top-[50%] absolute bg-blue-500 rounded-full blur-[150px]" />

      {/* Centered login status */}
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md p-4">
        {loginStatus && (
          <div
            className={`flex items-center justify-center gap-2 text-center mb-4 py-2 px-4 rounded-xl text-black ${
              loginStatus === "success" ? "bg-white font-bold" : "bg-white font-bold"
            }`}
          >
            {loginStatus === "error" && (
              <img 
                src={errorIcons} 
                alt="Error icon" 
                className="w-8 h-8" />
            )}
            {loginStatus === "success" && (
              <img
                src={successfullyIcon}
                alt="Success icon"
                className="w-5 h-5"
              />
            )}
            <span>
              {loginStatus === "success"
                ? "Log In Successful"
                : "Username or Password is incorrect"}
            </span>
          </div>
        )}
      </div>

      {/* Login form */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md p-6 bg-white rounded-3xl shadow-lg">
        <div className="text-start mb-6">
          <div className="text-black text-4xl font-bold font-['Poppins']">
            Log In
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className="mb-4">
            <label className="block text-xl text-black font-normal font-['Poppins']">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full h-14 p-4 bg-zinc-100 rounded-2xl outline-none"
            />
            {errors.username && (
              <div className="text-red-500 text-sm">{errors.username}</div>
            )}
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label className="block text-xl text-black font-normal font-['Poppins']">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full h-14 p-4 bg-zinc-100 rounded-2xl outline-none"
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-4 bg-blue-950 text-white text-2xl rounded-2xl"
          >
            Log In
          </button>
        </form>

        {/* Register link */}
        <div className="mt-4 text-center">
          <span className="text-black text-lg">Not a member? </span>
          <span className="text-blue-500 text-lg underline">Register Now</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
>>>>>>> fabb96e (commit before pull from main)
