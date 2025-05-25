import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GoChevronDown, GoChevronUp, GoPersonFill } from "react-icons/go";
import { HiMenuAlt3 } from "react-icons/hi";
import Logo from "../images/logo.jpg";
import LoginContext from "../context/LoginContext";
import { logoutUser } from "../api/logout";

function Navbar() {
  const [dropdownCategoryOpen, setDropdownCategoryOpen] = useState(false);
  const [dropdownProfileOpen, setDropdownProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = async() => {
    const res = await logoutUser();

    if(res.success) {
      console.log("Logout Success: ", res.msg);
      setIsLogin(false);
      navigate("/login");
    } else {
      console.log("Logout failed: ", res.msg);
    }
  }

  return (
    <nav className="flex justify-between p-5 w-full h-16 items-center shadow-md bg-gray-50 z-[9999] relative">
      <button
        className="lg:hidden flex items-center text-2xl"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <HiMenuAlt3 />
      </button>
      <div className="flex flex-row items-center">
        <img
          src={Logo}
          alt="logo"
          className="h-6 sm:h-7 rounded mr-2 justify-center"
        />
        <p className="sm:text-xl text-lg font-bold text-[#092737] font-['Libre_Caslon_Text']">
          Grab Your Book
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex w-4/6 justify-between items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-black font-semibold pb-1" : "hover:text-[#B1ACE4]"
          }
        >
          Home
        </NavLink>

        {/* Category */}
        <div className="relative z-[9999]">
          <button
            onClick={() => setDropdownCategoryOpen(!dropdownCategoryOpen)}
            className="flex items-center gap-1 hover:text-[#B1ACE4] focus:outline-none"
          >
            Category{" "}
            {dropdownCategoryOpen ? <GoChevronUp /> : <GoChevronDown />}
          </button>

          {dropdownCategoryOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-[9999]">
              <NavLink
                to="/comedy"
                className="block px-4 py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition"
              >
                Comedy
              </NavLink>
              <NavLink
                to="/drama"
                className="block px-4 py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition"
              >
                Drama
              </NavLink>
              <NavLink
                to="/horror"
                className="block px-4 py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition"
              >
                Horror
              </NavLink>
              <NavLink
                to="/romance"
                className="block px-4 py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition"
              >
                Romance
              </NavLink>
              <NavLink
                to="/fantasy"
                className="block px-4 py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition"
              >
                Fantasy
              </NavLink>
              <NavLink
                to="/lgbtq"
                className="block px-4 py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition"
              >
                LGBTQ+
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/mybook"
          className={({ isActive }) =>
            isActive ? "text-black font-semibold pb-1" : "hover:text-[#B1ACE4]"
          }
        >
          My Book
        </NavLink>
      </div>

      {/* Profile */}
      <div className="relative z-[9999]">
        <button
          onClick={() => setDropdownProfileOpen(!dropdownProfileOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 hover:text-[#B1ACE4] focus:outline-none"
        >
          <GoPersonFill className="text-2xl" />
        </button>

        {dropdownProfileOpen && (
          <div className="absolute mt-2 w-48 right-0 bg-white shadow-lg rounded-lg overflow-hidden z-[9999]">
            {isLogin ? (
              <NavLink
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition"
              >
                Log Out
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition"
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/register"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-gray-50 absolute top-16 left-0 right-0 shadow-md z-[9999]">
          <div className="flex flex-col items-center">
            <NavLink
              to="/"
              className="py-3 text-xl text-gray-700 hover:bg-[#95B9FF] hover:text-white transition w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <div className="w-full">
              <button
                onClick={() => setDropdownCategoryOpen(!dropdownCategoryOpen)}
                className="w-full py-2 gap-2 text-xl text-gray-700 hover:bg-[#95B9FF] hover:text-white transition flex text-center justify-center"
              >
                Category
                <div className="flex justify-center items-center">
                  {dropdownCategoryOpen ? <GoChevronUp /> : <GoChevronDown />}
                </div>
              </button>

              {dropdownCategoryOpen && (
                <div className="flex flex-col items-center z-[9999]">
                  <NavLink
                    to="/comedy"
                    className="py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Comedy
                  </NavLink>
                  <NavLink
                    to="/drama"
                    className="py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Drama
                  </NavLink>
                  <NavLink
                    to="/horror"
                    className="py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Horror
                  </NavLink>
                  <NavLink
                    to="/romance"
                    className="py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Romance
                  </NavLink>
                  <NavLink
                    to="/fantasy"
                    className="py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Fantasy
                  </NavLink>
                  <NavLink
                    to="/lgbtq"
                    className="py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    LGBTQ+
                  </NavLink>
                </div>
              )}
            </div>
            <NavLink
              to="/mybook"
              className="py-3 text-xl text-gray-700 hover:bg-[#95B9FF] hover:text-white transition w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Book
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
