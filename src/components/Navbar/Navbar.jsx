import React from "react";
import { NavLink } from "react-router-dom";

const transitionClasses = "transition-all duration-300 ease";

function Navbar() {
  return (
    <>
      <nav className="navbar flex justify-between items-center content-baseline w-full border-b border-gray-300 px-4 py-2 shadow bg-white">
        {" "}
        {/* Added bg-white, adjusted border color */}
        <h1 className="text-2xl font-bold text-gray-800">E-commerce</h1>
        <div className="Navlinks">
          <ul className="flex justify-center items-center content-baseline space-x-4">
            <li className="px-2">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `hover:text-blue-600 ${transitionClasses} ${
                    isActive ? "font-bold text-2xl font-sans  text-blue-700 " : "text-gray-700"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink
                to={"/about"}
                className={({ isActive }) =>
                  `hover:text-blue-600 ${transitionClasses} ${
                    isActive
                      ? "font-bold text-2xl font-sans  text-blue-700  "
                      : "text-gray-700"
                  }`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="auth flex justify-center items-center content-baseline space-x-3">
          <div className="auth border p-2 rounded-full hover:shadow-md">
            <NavLink
              to={"/auth"}
              className={`px-2 text-gray-700 hover:text-blue-600 ${transitionClasses}`}
            >
              Login<span className="px-1">|</span>Signup
            </NavLink>
          </div>
          <div className="cart flex space-x-2">
            <button
              id="FavBtn"
              className={`px-2 text-gray-600 hover:text-red-500 ${transitionClasses}`}
              aria-label="Favorites"
            >
              <i className="fa-regular fa-heart text-2xl"></i>
              <span id="favCount" className="ml-1 text-sm"></span>
            </button>
            <button
              id="CartBtn"
              className={`px-2 text-gray-600 hover:text-blue-600 ${transitionClasses}`}
              aria-label="Shopping Cart"
            >
              <i className="fa-solid fa-cart-shopping text-2xl"></i>
              <span id="cartCount" className="ml-1 text-sm"></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
