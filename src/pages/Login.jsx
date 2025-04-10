import React, { useState, useEffect } from "react";
import { z } from "zod";
import errorIcons from "../icons/errorIcons.svg";
import successfullyIcon from "../icons/successfullyIcons.svg";
import { Link } from "react-router-dom";

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const correctUsername = "user123";
const correctPassword = "password123";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState("");
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (touched[name]) {
      const result = userSchema.safeParse({
        ...formData,
        [name]: value,
      });

      if (!result.success) {
        const fieldError = result.error.errors.find(
          (error) => error.path[0] === name
        );
        setErrors((prev) => ({
          ...prev,
          [name]: fieldError ? fieldError.message : "",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const result = userSchema.safeParse(formData);
    if (!result.success) {
      const fieldError = result.error.errors.find(
        (error) => error.path[0] === name
      );
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError ? fieldError.message : "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = userSchema.safeParse(formData);

    if (result.success) {
      if (
        formData.username === correctUsername &&
        formData.password === correctPassword
      ) {
        setLoginStatus("success");
      } else {
        setLoginStatus("error");
      }
    } else {
      const newErrors = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      setLoginStatus("");
    }
  };

  return (
    <div className="w-full h-screen bg-neutral-200 overflow-hidden relative">
      <div className="w-[3000px] h-[1500px] left-[60%] top-[-30%] absolute bg-indigo-300 rounded-full blur-[150px]" />
      <div className="w-[1000px] h-[600px] left-[65%] top-[10%] absolute bg-blue-500 rounded-full blur-[250px]" />

      {loginStatus && (
  <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 z-10 w-[90%] max-w-md">
    <div
      className={`w-full flex items-center justify-center gap-2 text-center py-2 px-4 rounded-xl text-black ${
        loginStatus === "success"
          ? "bg-white font-bold animate-bounce"
          : "bg-white font-bold animate-bounce"
      }`}
    >
      {loginStatus === "error" && (
        <img
          src={errorIcons}
          alt="Error icon"
          className="w-6 h-6 md:w-8 md:h-8"
        />
      )}
      {loginStatus === "success" && (
        <img
          src={successfullyIcon}
          alt="Success icon"
          className="w-5 h-5 md:w-6 md:h-6"
        />
      )}
      <span className="text-sm md:text-base">
        {loginStatus === "success"
          ? "Log In Successful"
          : "Username or Password is incorrect"}
      </span>
    </div>
  </div>
)}


      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[90%] max-w-md p-6 bg-white rounded-3xl shadow-lg">
        <div className="text-start mb-6">
          <div className="text-black text-4xl font-bold font-['Poppins']">
            Log In
          </div>
        </div>

        <form onSubmit={handleSubmit}>
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
              onBlur={handleBlur}
              className="w-full h-14 p-4 bg-zinc-100 rounded-2xl outline-none"
            />
            {errors.username && touched.username && (
              <div className="text-red-500 text-sm mt-1">{errors.username}</div>
            )}
          </div>

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
              onBlur={handleBlur}
              className="w-full h-14 p-4 bg-zinc-100 rounded-2xl outline-none"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-950 hover:bg-blue-800 text-white text-2xl rounded-2xl"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-black text-lg">Not a member? </span>
          <Link to="/register" className="text-blue-500 text-lg underline">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};
  );
};

export default Login;
export default Login;
