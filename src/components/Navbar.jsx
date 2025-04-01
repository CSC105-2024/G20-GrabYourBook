import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { GoPersonFill } from "react-icons/go";
import { HiMenuAlt3 } from "react-icons/hi";

function Navbar() {
  const [dropdownCategoryOpen, setDropdownCategoryOpen] = useState(false);
  const [dropdownProfileOpen, setDropdownProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between p-5 w-full h-16 items-center shadow-md bg-gray-50">
      <button
        className="lg:hidden flex items-center text-2xl"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <HiMenuAlt3 />
      </button>
      <p className="text-xl font-bold text-[#092737]">Grab Your Book</p>

      {/* Desktop */}
      <div className="hidden lg:flex gap-80 justify-between items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-black font-semibold pb-1" : "hover:text-[#B1ACE4]"
          }
        >
          Home
        </NavLink>
        {/* Category */}
        <div className="relative">
          <button
            onClick={() => setDropdownCategoryOpen(!dropdownCategoryOpen)}
            className="flex items-center gap-1 hover:text-[#B1ACE4] focus:outline-none"
          >
            Category{" "}
            {dropdownCategoryOpen ? <GoChevronUp /> : <GoChevronDown />}
          </button>

          {dropdownCategoryOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
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

        {/* My Book */}
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
      <div className="relative">
        <button
          onClick={() => setDropdownProfileOpen(!dropdownProfileOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 hover:text-[#B1ACE4] focus:outline-none"
        >
          <GoPersonFill className="text-2xl" />
        </button>

        {dropdownProfileOpen && (
          <div className="absolute mt-2 w-48 right-0 bg-white shadow-lg rounded-lg overflow-hidden">
            <NavLink
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition"
            >
              Log Out
            </NavLink>
          </div>
        )}
      </div>

      {/* Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-gray-50 absolute top-16 left-0 right-0 shadow-md z-10">
          <div className="flex flex-col items-center">
            <NavLink
              to="/"
              className="py-3 text-xl text-gray-700 hover:bg-[#95B9FF] hover:text-white transition w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            {/* Category */}
            <div className="w-full">
              <button
                onClick={() => setDropdownCategoryOpen(!dropdownCategoryOpen)}
                className="w-full py-3 text-xl text-gray-700 hover:bg-[#95B9FF] hover:text-white transition"
              >
                Category{" "}
                {dropdownCategoryOpen ? <GoChevronUp /> : <GoChevronDown />}
              </button>

              {dropdownCategoryOpen && (
                <div className="flex flex-col items-center">
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
            {/* My book */}
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
