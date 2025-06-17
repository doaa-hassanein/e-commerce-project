import { useContext } from "react";
import logo from "./../../assets/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { authcontext } from "../../Context/AuthContextProvider";
import { cartContext } from "../../Context/CartContext";
import "./style.css";

function Navbar() {
  const { numOfItems } = useContext(cartContext);

  const { setToken, token } = useContext(authcontext);

  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="py-4 bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 hover:shadow-md overflow-x-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">
          {/* Logo Section with Animation */}
          <div className="logo transform transition duration-500 hover:scale-105">
            <NavLink to="/">
              <img src={logo} alt="logo" className="h-12 mx-auto lg:mx-0" />
            </NavLink>
          </div>

          {/* Navigation Links with Hover Effects */}
          <div className="navlink mt-4 lg:mt-0">
            <ul className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-8 items-center">
              {token && (
                <>
                  <li className="relative group">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `px-3 py-2 text-lg font-bold transition-colors duration-300 ${
                          isActive
                            ? "text-green-600"
                            : "text-gray-800 hover:text-green-600"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          Home
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                          {isActive && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600"></span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                  <li className="relative group">
                    <NavLink
                      to="/product"
                      className={({ isActive }) =>
                        `px-3 py-2 text-lg font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-700 hover:text-green-600"
                        }`
                      }
                    >
                      Products
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>

                  <li className="relative group">
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        `px-3 py-2 text-lg font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-700 hover:text-green-600"
                        }`
                      }
                    >
                      Cart
                      {numOfItems > 0 && (
                        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 rounded-full transform transition duration-300 group-hover:scale-110">
                          {numOfItems}
                        </span>
                      )}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>

                  <li className="relative group">
                    <NavLink
                      to="/WishList"
                      className={({ isActive }) =>
                        `px-3 py-2 text-lg font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-700 hover:text-green-600"
                        }`
                      }
                    >
                      Wish List
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>

                  <li className="relative group">
                    <NavLink
                      to="/Categories"
                      className={({ isActive }) =>
                        `px-3 py-2 text-lg font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-700 hover:text-green-600"
                        }`
                      }
                    >
                      Categories
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>

                  <li className="relative group">
                    <NavLink
                      to="/brands"
                      className={({ isActive }) =>
                        `px-3 py-2 text-lg font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-700 hover:text-green-600"
                        }`
                      }
                    >
                      Brands
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>

                  <li className="relative group">
                    <NavLink
                      to="/allorders"
                      className={({ isActive }) =>
                        `px-3 py-2 text-lg font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-700 hover:text-green-600"
                        }`
                      }
                    >
                      All Orders
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Social & Auth Section */}
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 mt-4 lg:mt-0">
            {/* Social Icons with Hover Effects */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-fuchsia-800 transition-colors duration-300 transform hover:scale-125"
              >
                <i className="fa-brands fa-instagram fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors duration-300 transform hover:scale-125"
              >
                <i className="fa-brands fa-facebook-f fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-800 transition-colors duration-300 transform hover:scale-125"
              >
                <i className="fa-brands fa-tiktok fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-sky-500 transition-colors duration-300 transform hover:scale-125"
              >
                <i className="fa-brands fa-twitter fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-700 transition-colors duration-300 transform hover:scale-125"
              >
                <i className="fa-brands fa-linkedin fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-red-600 transition-colors duration-300 transform hover:scale-125"
              >
                <i className="fa-brands fa-youtube fa-lg"></i>
              </a>
            </div>

            {/* Auth Buttons with Animation */}
            <div className="flex space-x-4">
              {token ? (
                <button
                  onClick={Logout}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-md"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="px-4 py-2 text-green-600 border border-green-600 rounded-lg font-medium transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-md"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-green-700 hover:shadow-md"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
