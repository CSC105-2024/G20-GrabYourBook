import React, { useState, useEffect } from "react";
import { z } from "zod";
import errorIcons from "../icons/errorIcons.svg";
import successfullyIcon from "../icons/successfullyIcons.svg";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/register";

const registerSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [registerStatus, setRegisterStatus] = useState("");
  const [shakeTrigger, setShakeTrigger] = useState(false);

  const triggerShake = () => {
    setShakeTrigger(false);
    requestAnimationFrame(() => setShakeTrigger(true));
  };

  useEffect(() => {
    if (registerStatus === "success") {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (registerStatus === "error" || registerStatus === "empty") {
      const timer = setTimeout(() => {
        setRegisterStatus("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registerStatus, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isSubmitting) return;
    setIsSubmitting(true);

    console.log("Submit Register with: ", formData);

    const isUsernameEmpty = !formData.username.trim();
    const isPasswordEmpty = !formData.password.trim();
    const isConfirmPasswordEmpty = !formData.confirmPassword.trim();

    // if (isUsernameEmpty && isPasswordEmpty && isConfirmPasswordEmpty) {
    //   setRegisterStatus("empty");
    //   setErrors({});
    //   triggerShake();
    //   return;
    // }


    const fieldErrors = {};
    if (isUsernameEmpty) fieldErrors.username = "Username is required";
    if (isPasswordEmpty) fieldErrors.password = "Password is required";
    if (isConfirmPasswordEmpty) {
      fieldErrors.confirmPassword = "Please confirm your password";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setRegisterStatus("error");
      triggerShake();
      setIsSubmitting(false);
      return;
    }

    const result = registerSchema.safeParse(formData);
  if (result.success) {
    const res = await registerUser({
      username: formData.username,
      password: formData.password,
    });

    if (res.success) {
      setRegisterStatus("success");
      setErrors({});
    } else {
      setRegisterStatus("error");
      setErrors({ username: res.msg });
      triggerShake();
    }
  } else {
    const newErrors = {};
    result.error.errors.forEach((error) => {
      newErrors[error.path[0]] = error.message;
    });
    setErrors(newErrors);
    setRegisterStatus("error");
    triggerShake();
  }

  setIsSubmitting(false);
};

  return (
    <div className="w-full h-screen bg-neutral-200 overflow-hidden relative flex justify-center items-center">
      <div className="absolute w-[3000px] h-[1500px] bg-indigo-300 rounded-full blur-[150px] left-[60%] top-[-30%]" />
      <div className="absolute w-[1000px] h-[600px] bg-blue-500 rounded-full blur-[250px] left-[65%] top-[10%]" />

      <div className="z-10 flex flex-col items-center w-full max-w-md px-4">
        {registerStatus && (
          <div
            className={`w-full mb-4 transition-all ${
              registerStatus === "success"
                ? "animate-fadeInScale"
                : shakeTrigger
                ? "animate-shake"
                : ""
            }`}
          >
            <div className="w-full flex items-center justify-center gap-2 text-center py-2 px-4 rounded-xl text-black bg-white font-bold shadow-md">
              <img
                src={
                  registerStatus === "success" ? successfullyIcon : errorIcons
                }
                alt="status icon"
                className="w-6 h-6"
              />
              <span className="text-sm md:text-base">
                {registerStatus === "success"
                  ? "Registration Successful"
                  : registerStatus === "empty"
                  ? "Please fill your username and password"
                  : errors.confirmPassword ||
                    errors.username ||
                    errors.password ||
                    "Please correct the errors in the form"}
              </span>
            </div>
          </div>
        )}

        <div className="w-full p-6 bg-white rounded-3xl shadow-lg">
          <div className="text-start mb-6">
            <div className="text-black text-4xl font-bold font-['Poppins']">
              Register
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xl text-black font-['Poppins']">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                className="w-full h-14 p-4 bg-zinc-100 rounded-2xl outline-none"
              />
              {errors.username && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.username}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-xl text-black font-['Poppins']">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className="w-full h-14 p-4 bg-zinc-100 rounded-2xl outline-none"
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-xl text-black font-['Poppins']">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className="w-full h-14 p-4 bg-zinc-100 rounded-2xl outline-none"
              />
              {errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-950 hover:bg-blue-800 text-white text-2xl rounded-2xl"
            >
              Register
            </button>
            
          </form>

          <div className="mt-4 text-center">
            <span className="text-black text-lg">Already a member? </span>
            <Link to="/login" className="text-blue-500 text-lg underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;