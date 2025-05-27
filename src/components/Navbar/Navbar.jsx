import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const transitionClasses = "transition-all duration-300 ease";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch cart and fav counts
  useEffect(() => {
    const fetchCounts = () => {
      const token = localStorage.getItem("UserToken");
      if (!token) {
        setCartCount(0);
        setFavCount(0);
        return;
      }
      axios
        .get("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token } })
        .then((res) => {
          setCartCount(res.data.data?.products?.length || 0);
        })
        .catch(() => setCartCount(0));
      axios
        .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers: { token } })
        .then((res) => {
          setFavCount(res.data.data?.length || 0);
        })
        .catch(() => setFavCount(0));
    };

    fetchCounts();

    // Listen for custom event
    window.addEventListener("cartOrFavChanged", fetchCounts);

    // Cleanup
    return () => window.removeEventListener("cartOrFavChanged", fetchCounts);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("UserName");
    setMenuOpen(false);
    navigate("/auth");
  };

  const token = localStorage.getItem("UserToken");
  const userName = localStorage.getItem("UserName");

  return (
    <>
      <nav className="navbar flex justify-between items-center content-baseline w-full border-b border-gray-300 px-4 py-2 shadow bg-white">
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
        <div className="auth flex justify-center items-center content-baseline space-x-3 relative">
          {token && userName ? (
            <div className="relative">
              <div
                className="auth border p-2 rounded-full bg-amber-500 text-white font-bold uppercase hover:scale-[1.1] hover:shadow-md cursor-pointer select-none"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {userName.slice(0, 2)}
              </div>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className={`auth border p-2 rounded-full hover:scale-[1.1] hover:shadow-md ${transitionClasses}`}
            >
              <NavLink to={"/auth"} className={`px-2 text-gray-700 `}>
                Login<span className="px-1">|</span>Signup
              </NavLink>
            </div>
          )}
          <div className="cart flex space-x-4 items-center">
            <NavLink to="/fav" className="flex items-center">
              <button
                id="FavBtn"
                className={`px-2 text-gray-600 hover:text-red-500 ${transitionClasses} ${
                  !token ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Favorites"
                disabled={!token}
              >
                <i className="fa-regular fa-heart text-2xl"></i>
              </button>
              {favCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {favCount}
                </span>
              )}
            </NavLink>
            <NavLink to="/cart" className="flex items-center">
              <button
                id="CartBtn"
                className={`px-2 text-gray-600 hover:text-blue-600 ${transitionClasses} ${
                  !token ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Shopping Cart"
                disabled={!token}
              >
                <i className="fa-solid fa-cart-shopping text-2xl"></i>
              </button>
              {cartCount > 0 && (
                <span className="ml-1 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
