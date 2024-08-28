import { useContext } from "react";
import logo from "./../../assets/freshcart-logo.svg"
import { NavLink, useNavigate } from "react-router-dom";
import { authcontext } from "../../Context/AuthContextProvider";
import { cartContext } from "../../Context/CartContext";

function Navbar() {
  const { numOfItems , totalPrice , products} = useContext(cartContext)

  const { setToken, token } = useContext(authcontext)

  const navigate = useNavigate()

  function Logout() {
    localStorage.removeItem("tkn")
    setToken(null)
    navigate("/login")
  }
  return (
    <>
      <nav className=" py-5 bg-slate-100">

        <div className="lg:w-[90%] mx-auto lg:flex lg:flex-wrap lg:justify-between lg:items-center">

          <div className="logo">
            <NavLink to="/">
              <img src={logo} alt="logo" className="text-center m-auto" />
            </NavLink>
          </div>

          <div className="navlink text-center">
            <ul className="lg:flex lg:flex-wrap lg:justify-between lg:items-center text-gray-700 lg:me-[300px]">

              {token ? <>

                <li className="mt-4 lg:me-8 relative text-xl">
                  <NavLink to="/cart">
                    Cart
                    <div className="absolute inline-flex items-center justify-center w-7 h-7 text-xs font-bold text-white bg-teal-400  rounded-lg -top-4 -end-4 dark:border-gray-900">{numOfItems}</div>

                  </NavLink>
                </li>

                <li className="mt-4 lg:me-8 text-xl">
                  <NavLink to="/">
                    Products
                  </NavLink>
                </li>

                <li className="mt-4 lg:me-8 text-xl">
                  <NavLink to="/WishList">
                    Wish List
                  </NavLink>
                </li>

                <li className="mt-4  lg:me-8 text-xl">
                  <NavLink to="/Categories">
                    Categories
                  </NavLink>
                </li>

                <li className="mt-4 lg:me-8 text-xl">
                  <NavLink to="/brands">
                    Brands
                  </NavLink>
                </li>

                <li className="mt-4 lg:me-8 text-xl">
                  <NavLink to="/allorders">
                    All Orders
                  </NavLink>
                </li>

              </> : ""}

            </ul>
          </div>

          <div className="social text-center lg:flex lg:flex-wrap lg:justify-between lg:items-center">
            <div className="mt-4">
              <i className="fa-brands fa-instagram lg:me-5 me-4 fa-xl text-fuchsia-800"></i>
              <i className="fa-brands fa-facebook-f lg:me-5 me-4 fa-xl text-blue-600"></i>
              <i className="fa-brands fa-tiktok lg:me-5 me-4 fa-xl text-gray-700"></i>
              <i className="fa-brands fa-twitter lg:me-5 me-4 fa-xl text-sky-600"></i>
              <i className="fa-brands fa-linkedin lg:me-5 me-4 fa-xl text-indigo-700"></i>
              <i className="fa-brands fa-youtube lg:me-5 me-4 fa-xl text-red-600"></i>
            </div>

            <div className="mt-4 text-gray-500">

              {token ? (<button onClick={Logout} className="lg:me-5 text-2xl text-red-700">Logout</button>) : <> <NavLink to="/login" className="lg:me-5 me-3 text-xl text-teal-600">Login</NavLink>

                <NavLink to="/register" className="lg:me-5 text-xl text-teal-600">Register</NavLink>
              </>}
            </div>
          </div>
        </div>
      </nav >
    </>
  )
}

export default Navbar




// import { useContext } from "react";
// import logo from "./../../assets/freshcart-logo.svg";
// import { NavLink, useNavigate } from "react-router-dom";
// import { authcontext } from "../../Context/AuthContextProvider";
// import { cartContext } from "../../Context/CartContext";

// function Navbar() {
//   const { numOfItems } = useContext(cartContext);
//   const { setToken, token } = useContext(authcontext);
//   const navigate = useNavigate();

//   function Logout() {
//     localStorage.removeItem("tkn");
//     setToken(null);
//     navigate("/login");
//   }

//   return (
//     <nav className="bg-slate-100 py-5">
//       <div className="container mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between px-4">
//         {/* Logo */}
//         <div className="flex items-center justify-between mb-4 lg:mb-0">
//           <NavLink to="/">
//             <img src={logo} alt="FreshCart Logo" className="h-12" />
//           </NavLink>
//         </div>

//         {/* Navigation Links */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 text-gray-700">
//           <ul className="flex flex-col lg:flex-row lg:space-x-6 lg:space-y-0 space-y-4">
//             {token && (
//               <>
//                 <li className="relative text-lg">
//                   <NavLink to="/cart" className="flex items-center space-x-2 text-xl">
//                     <span>Cart</span>
//                     {numOfItems > 0 && (
//                       <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-teal-400 rounded-full -top-2 -right-2">
//                         {numOfItems}
//                       </div>
//                     )}
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/"
//                     className="hover:text-teal-600 transition-colors text-xl"
//                   >
//                     Products
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/WishList"
//                     className="hover:text-teal-600 transition-colors text-xl"
//                   >
//                     Wish List
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/Categories"
//                     className="hover:text-teal-600 transition-colors text-xl"
//                   >
//                     Categories
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/brands"
//                     className="hover:text-teal-600 transition-colors text-xl"
//                   >
//                     Brands
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/allorders"
//                     className="hover:text-teal-600 transition-colors text-xl"
//                   >
//                     All Orders
//                   </NavLink>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>

//         {/* User Actions and Social Icons */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 mt-4 lg:mt-0">
//           <div className="flex space-x-4 mb-4 lg:mb-0">
//             <a
//               href="#"
//               className="text-fuchsia-800 hover:text-fuchsia-600 transition-colors"
//             >
//               <i className="fa-brands fa-instagram fa-xl"></i>
//             </a>
//             <a
//               href="#"
//               className="text-blue-600 hover:text-blue-500 transition-colors"
//             >
//               <i className="fa-brands fa-facebook-f fa-xl"></i>
//             </a>
//             <a
//               href="#"
//               className="text-gray-700 hover:text-gray-600 transition-colors"
//             >
//               <i className="fa-brands fa-tiktok fa-xl"></i>
//             </a>
//             <a
//               href="#"
//               className="text-sky-600 hover:text-sky-500 transition-colors"
//             >
//               <i className="fa-brands fa-twitter fa-xl"></i>
//             </a>
//             <a
//               href="#"
//               className="text-indigo-700 hover:text-indigo-600 transition-colors"
//             >
//               <i className="fa-brands fa-linkedin fa-xl"></i>
//             </a>
//             <a
//               href="#"
//               className="text-red-600 hover:text-red-500 transition-colors"
//             >
//               <i className="fa-brands fa-youtube fa-xl"></i>
//             </a>
//           </div>

//           <div className="flex space-x-4">
//             {token ? (
//               <button
//                 onClick={Logout}
//                 className="text-red-700 hover:text-red-600 transition-colors text-lg font-semibold"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <NavLink
//                   to="/login"
//                   className="text-teal-600 hover:text-teal-500 transition-colors text-lg font-semibold"
//                 >
//                   Login
//                 </NavLink>
//                 <NavLink
//                   to="/register"
//                   className="text-teal-600 hover:text-teal-500 transition-colors text-lg font-semibold"
//                 >
//                   Register
//                 </NavLink>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
