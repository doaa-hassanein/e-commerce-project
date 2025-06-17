// import React, { useContext } from "react";
// import { cartContext } from "../../Context/CartContext";
// import { Link } from "react-router-dom";

// const Cart = () => {
//   const { products, totalPrice, updateCount, deleteItemFromCart, clearCart } =
//     useContext(cartContext);

//   console.log(products, "cart page");

//   return (

//     <section className="py-8 ">
//       <div className="w-full md:w-4/5 lg:w-3/4 mx-auto p-6 bg-white rounded-lg shadow-lg">
//         {products.length > 0 ? (
//           <>
//             <h1 className="text-4xl font-semibold text-center text-green-700 mb-6">
//               Cart Shop
//             </h1>

//             <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Total Price:{" "}
//                 <span className="text-teal-600">{totalPrice} EGP</span>
//               </h2>
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Total Number of Items:{" "}
//                 <span className="text-teal-600">{products.length}</span>
//               </h2>
//             </div>

//             <Link
//               to="/payment"
//               className=" text-center bg-teal-600 text-white font-semibold rounded-lg text-xl px-6 py-3 mb-6 hover:bg-teal-700 transition-colors"
//             >
//               <i className="fa-solid fa-comments-dollar me-2 text-xl"></i>
//               Payment
//             </Link>

//             {products.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col md:flex-row items-center border-b border-gray-300 py-4 mb-4"
//               >
//                 <div className="w-full md:w-1/4 p-4">
//                   <img
//                     src={item.product.imageCover}
//                     className="w-full h-40 object-cover rounded-lg shadow-md"
//                     alt={item.product.title}
//                   />
//                 </div>

//                 <div className="w-full md:w-1/2 p-4 text-center md:text-left">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                     {item.product.title}
//                   </h2>
//                   <h3 className="text-lg font-semibold text-teal-600 mb-4">
//                     Price: {item.price} EGP
//                   </h3>
//                   <div className="flex justify-center md:justify-between gap-4 mb-4">
//                     <button
//                       onClick={() => deleteItemFromCart(item.product.id)}
//                       className="flex items-center text-red-700 border border-red-700 bg-transparent font-medium rounded-lg text-lg px-4 py-2 hover:bg-red-50 transition-colors"
//                     >
//                       <i className="fa fa-trash me-2" aria-hidden="true"></i>
//                       Remove
//                     </button>

//                     <div className="flex flex-wrap items-center justify-between">
//                       <button

//                         onClick={() =>
//                           updateCount(item.product.id, item.count + 1)
//                         }
//                         //  className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-3 "
//     //                   >
//                         className="flex items-center text-teal-600 border border-teal-600 bg-transparent font-medium rounded-lg text-lg px-4 py-2 hover:bg-teal-50 transition-colors me-6
//                         "
//                       >
//                         +
//                       </button>
//                       <h2 className="text-xl font-semibold">{item.count}</h2>
//                       <button
//                         onClick={() =>
//                           updateCount(item.product.id, item.count - 1)
//                         }
//                         disabled={item.count <= 0}
//                         className={`me-2 ms-6 flex items-center text-teal-600 border border-teal-600 bg-transparent font-medium rounded-lg text-lg px-4 py-2 ${
//                           item.count <= 0
//                             ? "opacity-50 cursor-not-allowed"
//                             : "hover:bg-teal-50"
//                         } transition-colors`}
//                       >
//                         -
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={clearCart}
//                 className="flex items-center text-red-700 border border-red-700 bg-transparent font-medium rounded-lg text-xl px-6 py-3 hover:bg-red-50 transition-colors"
//               >
//                 <i
//                   className="fa fa-trash me-2 text-red-600"
//                   aria-hidden="true"
//                 ></i>
//                 Clear Cart Items
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="text-center py-6">
//             <h2 className="text-3xl font-bold text-teal-600">
//               No data in cart to display
//             </h2>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Cart;

import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, totalPrice, updateCount, deleteItemFromCart, clearCart } =
    useContext(cartContext);

  const totalItems = products.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="py-14  bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 ">
        {products.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Cart Header */}
                <div className="bg-white p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                      <i className="fa-solid fa-cart-shopping text-green-500"></i>
                      Your Shopping Bag
                    </h1>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-base font-medium">
                      {totalItems} {totalItems > 1 ? "Items" : "Item"}
                    </span>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-gray-100">
                  {products.map((item, index) => (
                    <div
                      key={index}
                      className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative w-full sm:w-1/4 lg:w-1/5">
                        <img
                          src={item.product.imageCover}
                          className="w-full h-48 object-contain rounded-xl bg-gray-50 p-4 border border-gray-200"
                          alt={item.product.title}
                        />
                        <div className="absolute -top-2 -right-2">
                          <button
                            onClick={() => deleteItemFromCart(item.product.id)}
                            className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
                            aria-label="Remove item"
                          >
                            <i className="fa-solid fa-xmark text-base"></i>
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {item.product.title}
                            </h3>
                          </div>
                          <p className="text-lg font-bold text-green-600 whitespace-nowrap">
                            {item.price} EGP
                          </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateCount(item.product.id, item.count - 1)
                              }
                              disabled={item.count <= 1}
                              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                item.count <= 1
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-red-50 text-red-600 hover:bg-red-100"
                              } transition-colors`}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.count}
                            </span>
                            <button
                              onClick={() =>
                                updateCount(item.product.id, item.count + 1)
                              }
                              className="w-9 h-9 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition-colors"
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Actions */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-wrap justify-between gap-4">
                  <Link
                    to="/"
                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2 font-medium"
                  >
                    <i className="fa-solid fa-arrow-left-long"></i>
                    Continue Shopping
                  </Link>

                  <button
                    onClick={clearCart}
                    className="px-6 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 text-xl font-medium"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{totalPrice} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Included</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-green-600">
                    {totalPrice} EGP
                  </span>
                </div>

                <Link
                  to="/payment"
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-lock"></i>
                  Proceed to Checkout
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <i className="fa-solid fa-shield"></i>
                  <span>Secure Payment</span>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    We Accept
                  </h3>
                  <div className="flex gap-3">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <i className="fa-brands fa-cc-visa text-blue-800"></i>
                    </div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <i className="fa-brands fa-cc-mastercard text-red-600"></i>
                    </div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <i className="fa-brands fa-cc-paypal text-blue-700"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="w-40 h-40 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-8">
                <i className="fa-solid fa-cart-shopping text-5xl text-green-400"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Your cart feels light
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                There's nothing in your cart yet. Let's find something special
                for you!
              </p>
              <Link
                to="/"
                className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg px-8 py-3 text-lg transition-all hover:shadow-lg"
              >
                <i className="fa-solid fa-bag-shopping mr-2"></i>
                Start Shopping
              </Link>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                  New Customer?
                </h3>
                <Link
                  to="/register"
                  className="text-green-600 hover:text-green-800 font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  Create an account for faster checkout
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
