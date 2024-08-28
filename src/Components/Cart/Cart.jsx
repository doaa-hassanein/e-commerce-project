import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, totalPrice, updateCount, deleteItemFromCart, clearCart } =
    useContext(cartContext);

  console.log(products, "cart page");

  return (
    // <section className="py-5">
    //   <div className="w-full md:w-[80%] mx-auto p-5 ">
    //     {products.length != 0 ? (
    //       <>
    //         <h1 className="p-3  font-semibold tracking-wider text-4xl mb-3">
    //           Cart Shop
    //         </h1>

    //         <div className="flex felx-warp justify-between items-center ">
    //           <h2 className=" p-3 font-mono font-semibold text-2xl mb-3">
    //             Total Price : <span className="text-emerald-600">{totalPrice} EGP</span>
    //           </h2>

    //           <h2 className="p-3 font-mono font-semibold text-2xl mb-3">
    //            Total number of items : <span className="text-emerald-600">{} EGP</span>
    //           </h2>
    //         </div>
    //         <Link
    //           to="/payment"
    //           className="focus:outline-none text-white font-mono tracking-wider bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-bold rounded-xl text-xl px-5 py-2.5 me-2 mb-2 mt-3 "
    //         >
    //           <i className="fa-solid fa-comments-dollar me-3 text-xl"></i>
    //           Payment
    //         </Link>

    //         {products?.map((item, index) => (
    //           <div key={index}>
    //             <div className=" flex flex-wrap items-center justify-center border-b-2 border-green-600">
    //               <div className=" w-1/6 p-5">
    //                 <img
    //                   src={item.product.imageCover}
    //                   className="w-full"
    //                   alt=""
    //                 />
    //               </div>

    //               <div className=" w-4/6 p-5">
    //                 <h2 className="mb-3 text-xl tracking-wider font-semibold text-gray-800">
    //                   {" "}
    //                   {item.product.title}{" "}
    //                 </h2>
    //                 <h2 className="mb-3 text-xl tracking-wider text-green-600 font-semibold">
    //                   {" "}
    //                   Price : {item.price} EGP{" "}
    //                 </h2>
    //                 <h2 className="mb-3 text-xl tracking-wider text-green-600 font-semibold">
    //                   {" "}
    //                   {item.product.id}{" "}
    //                 </h2>

    //                 <button
    //                   onClick={() => deleteItemFromCart(item.product.id)}
    //                   className="focus:outline-none text-white font-mono tracking-wider  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2  mt-3 "
    //                 >
    //                   <i className="fa fa-trash me-3" aria-hidden="true"></i>
    //                   Remove
    //                 </button>
    //               </div>

    //               <div className=" w-1/6 p-5">
    //                 <div className="flex flex-wrap items-center justify-between">
    //                   <button
    //                     onClick={() =>
    //                       updateCount(item.product.id, item.count + 1)
    //                     }
    //                     className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-3 "
    //                   >
    //                     +
    //                   </button>

    //                   <h2 className="">{item.count}</h2>

    //                   <button
    //                     onClick={() =>
    //                       updateCount(item.product.id, item.count - 1)
    //                     }
    //                     disabled={item.count == 0 ? true : false}
    //                     className={`${
    //                       item.count == 0 ? "disabled:opacity-50" : ""
    //                     }  focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-3`}
    //                   >
    //                     -
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //         <div className="flex justify-center mt-5">
    //           <button
    //             onClick={clearCart}
    //             className="focus:outline-none text-red-800 font-mono tracking-wider bg-transparent0 font-medium rounded-lg text-2xl px-5 py-2.5"
    //           >
    //             <i className="fa fa-trash text-red-700 me-3" aria-hidden="true"></i>
    //             Clear Cart items
    //           </button>
    //         </div>
    //       </>
    //     ) : (
    //       <div>
    //         <h2 className="text-center py-6 text-green-600 font-mono font-bold text-5xl">
    //           {" "}
    //           No data in cart to display{" "}
    //         </h2>
    //       </div>
    //     )}
    //   </div>
    // </section>

    <section className="py-8 ">
      <div className="w-full md:w-4/5 lg:w-3/4 mx-auto p-6 bg-white rounded-lg shadow-lg">
        {products.length > 0 ? (
          <>
            <h1 className="text-4xl font-semibold text-center text-teal-700 mb-6">
              Cart Shop
            </h1>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Total Price:{" "}
                <span className="text-teal-600">{totalPrice} EGP</span>
              </h2>
              <h2 className="text-2xl font-semibold text-gray-800">
                Total Number of Items:{" "}
                <span className="text-teal-600">{products.length}</span>
              </h2>
            </div>

            <Link
              to="/payment"
              className=" text-center bg-teal-600 text-white font-semibold rounded-lg text-xl px-6 py-3 mb-6 hover:bg-teal-700 transition-colors"
            >
              <i className="fa-solid fa-comments-dollar me-2 text-xl"></i>
              Payment
            </Link>

            {products.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center border-b border-gray-300 py-4 mb-4"
              >
                <div className="w-full md:w-1/4 p-4">
                  <img
                    src={item.product.imageCover}
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                    alt={item.product.title}
                  />
                </div>

                <div className="w-full md:w-1/2 p-4 text-center md:text-left">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.product.title}
                  </h2>
                  <h3 className="text-lg font-semibold text-teal-600 mb-4">
                    Price: {item.price} EGP
                  </h3>
                  <div className="flex justify-center md:justify-between gap-4 mb-4">
                    <button
                      onClick={() => deleteItemFromCart(item.product.id)}
                      className="flex items-center text-red-700 border border-red-700 bg-transparent font-medium rounded-lg text-lg px-4 py-2 hover:bg-red-50 transition-colors"
                    >
                      <i className="fa fa-trash me-2" aria-hidden="true"></i>
                      Remove
                    </button>

                    <div className="flex flex-wrap items-center justify-between">
                      <button

                        onClick={() =>
                          updateCount(item.product.id, item.count + 1)
                        }
                        //  className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-3 "
    //                   >
                        className="flex items-center text-teal-600 border border-teal-600 bg-transparent font-medium rounded-lg text-lg px-4 py-2 hover:bg-teal-50 transition-colors me-6
                        "
                      >
                        +
                      </button>
                      <h2 className="text-xl font-semibold">{item.count}</h2>
                      <button
                        onClick={() =>
                          updateCount(item.product.id, item.count - 1)
                        }
                        disabled={item.count <= 0}
                        className={`me-2 ms-6 flex items-center text-teal-600 border border-teal-600 bg-transparent font-medium rounded-lg text-lg px-4 py-2 ${
                          item.count <= 0
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-teal-50"
                        } transition-colors`}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-6">
              <button
                onClick={clearCart}
                className="flex items-center text-red-700 border border-red-700 bg-transparent font-medium rounded-lg text-xl px-6 py-3 hover:bg-red-50 transition-colors"
              >
                <i
                  className="fa fa-trash me-2 text-red-600"
                  aria-hidden="true"
                ></i>
                Clear Cart Items
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <h2 className="text-3xl font-bold text-teal-600">
              No data in cart to display
            </h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
