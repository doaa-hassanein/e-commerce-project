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
      <nav className="py-3 bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 hover:shadow-md overflow-x-hidden text-sm">
        <div className="container mx-auto px-3 flex flex-col lg:flex-row justify-between items-center">
          {/* Logo Section with Animation */}
          <div className="logo transform transition duration-500 hover:scale-105">
            <NavLink to="/">
              <img src={logo} alt="logo" className="h-10 mx-auto lg:mx-0" />
            </NavLink>
          </div>

          {/* Navigation Links with Hover Effects */}
          <div className="navlink mt-3 lg:mt-0">
            <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-5 items-center">
              {token && (
                <>
                  <li className="relative group">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `px-2 py-1 text-sm font-semibold transition-colors duration-300 ${
                          isActive
                            ? "text-green-600"
                            : "text-gray-800 hover:text-green-600"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          Home
                          <span className="absolute bottom-[-3px] left-0 w-0 h-[3px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                          {isActive && (
                            <span className="absolute bottom-[-3px] left-0 w-full h-[3px] bg-green-600"></span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>

                  <li className="relative group">
                    <NavLink
                      to="/product"
                      className={({ isActive }) =>
                        `px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-700 hover:text-green-600"
                        }`
                      }
                    >
                      Products
                      <span className="absolute bottom-[-3px] left-0 w-0 h-[3px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>

                  <li className="relative group">
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        `px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-700 hover:text-green-600"
                        }`
                      }
                    >
                      Cart
                      {numOfItems > 0 && (
                        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-600 rounded-full transition duration-300 group-hover:scale-110">
                          {numOfItems}
                        </span>
                      )}
                      <span className="absolute bottom-[-3px] left-0 w-0 h-[3px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>

                  <li className="relative group">
                    <NavLink
                      to="/WishList"
                      className={({ isActive }) =>
                        `px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-700 hover:text-green-600"
                        }`
                      }
                    >
                      Wish List
                      <span className="absolute bottom-[-3px] left-0 w-0 h-[3px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>

                  <li className="relative group">
                    <NavLink
                      to="/Categories"
                      className={({ isActive }) =>
                        `px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-700 hover:text-green-600"
                        }`
                      }
                    >
                      Categories
                      <span className="absolute bottom-[-3px] left-0 w-0 h-[3px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>

                  <li className="relative group">
                    <NavLink
                      to="/brands"
                      className={({ isActive }) =>
                        `px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-700 hover:text-green-600"
                        }`
                      }
                    >
                      Brands
                      <span className="absolute bottom-[-3px] left-0 w-0 h-[3px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>

                  <li className="relative group">
                    <NavLink
                      to="/allorders"
                      className={({ isActive }) =>
                        `px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-700 hover:text-green-600"
                        }`
                      }
                    >
                      All Orders
                      <span className="absolute bottom-[-3px] left-0 w-0 h-[3px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Social & Auth Section */}
          <div className="flex flex-col lg:flex-row items-center space-y-3 lg:space-y-0 lg:space-x-4 mt-3 lg:mt-0">
            {/* Social Icons with Hover Effects */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-pink-600 hover:brightness-90 transition-all duration-300 transform hover:scale-110"
              >
                <i className="fa-brands fa-instagram fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-blue-600 hover:brightness-90 transition-all duration-300 transform hover:scale-110"
              >
                <i className="fa-brands fa-facebook-f fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-black hover:brightness-90 transition-all duration-300 transform hover:scale-110"
              >
                <i className="fa-brands fa-tiktok fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-sky-500 hover:brightness-90 transition-all duration-300 transform hover:scale-110"
              >
                <i className="fa-brands fa-twitter fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-indigo-700 hover:brightness-90 transition-all duration-300 transform hover:scale-110"
              >
                <i className="fa-brands fa-linkedin fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-red-600 hover:brightness-90 transition-all duration-300 transform hover:scale-110"
              >
                <i className="fa-brands fa-youtube fa-lg"></i>
              </a>
            </div>

            {/* Auth Buttons with Animation */}
            <div className="flex space-x-3">
              {token ? (
                <button
                  onClick={Logout}
                  className="px-3 py-1 bg-red-700 text-white rounded-md font-medium transition-all duration-300 hover:bg-red-800 hover:shadow-sm"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="px-3 py-1 text-green-600 border border-green-600 rounded-md font-medium transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-sm"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-3 py-1 bg-green-600 text-white rounded-md font-medium transition-all duration-300 hover:bg-green-700 hover:shadow-sm"
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
