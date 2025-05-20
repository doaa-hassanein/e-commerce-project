import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

const AllOrders = () => {
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState(null);

  // id => id of user
  const { id } = jwtDecode(localStorage.getItem("tkn"));

  console.log(id, "id of user");

  async function getAllOrders() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );

      console.log(data);
      console.log("dodo");

      setAllOrders(data);
      setLoading(false);
    } catch (error) {
      console.log(error, "error from get all orders");
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-teal-600 flex flex-wrap justify-center items-center">
        <Bars
          height="80"
          width="80"
          color="#fff"
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    );
  }
  return (
    // <section className="py-10">
    //   <div className="flex flex-wrap items-center justify-center mb-8">
    //     <h1 className="font-bold text-center text-5xl tracking-wider text-emerald-600">
    //       All Orders
    //     </h1>
    //   </div>
    //   <div className="w-full md:w-[90%] mx-auto">
    //     {allOrders?.map((order, idx) => (
    //       <div key={idx} className="py-10 px-5 mb-5 bg-slate-100 rounded-lg shadow-lg ">
    //         <div className="flex flex-wrap gap-4 border-b-2 border-b-slate-300 pb-4">
    //           {order.cartItems?.map((cartItem, idx) => (
    //             <div
    //               key={idx}
    //               className="w-full md:w-1/4 lg:w-1/5 p-3 bg-white rounded-lg shadow-md flex flex-col items-center"
    //             >
    //               <img
    //                 src={cartItem.product.imageCover}
    //                 alt={cartItem.product.title}
    //                 className="w-full h-60 object-cover rounded-lg"
    //               />
    //               <div className="text-center mt-2">
    //                 <h2 className="font-semibold text-lg">
    //                   {cartItem.product.title.split(" ").slice(0, 2).join(" ")}
    //                 </h2>
    //                 <h3 className="text-gray-600 text-md mt-1">
    //                   {cartItem.product.brand.name}
    //                 </h3>
    //                 <h4 className="text-emerald-700 text-lg font-semibold mt-2">
    //                   {cartItem.price} EGP
    //                 </h4>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //         <div className="mt-4">
    //           <h2 className="text-2xl font-semibold">
    //             Total Order Price:{" "}
    //             <span className="text-emerald-700">
    //               {order.totalOrderPrice} EGP
    //             </span>
    //           </h2>
    //           <h2 className="text-2xl font-semibold mt-2">
    //             Payment Method Type:{" "}
    //             <span className="text-emerald-700">
    //               {order.paymentMethodType}
    //             </span>
    //           </h2>
    //           <h2 className="text-2xl font-semibold mt-2">
    //             Last Update:{" "}
    //             <span className="text-emerald-700">
    //               {new Date(order.updatedAt).toLocaleDateString()}
    //             </span>
    //           </h2>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </section>

    <section className="py-10 bg-gray-50">
      <div className="flex flex-wrap items-center justify-center mb-8">
        <h1 className="font-bold text-center text-5xl tracking-wider text-teal-600">
          All Orders
        </h1>
      </div>
      <div className="w-full md:w-4/5 lg:w-3/4 mx-auto">
        {allOrders?.map((order, idx) => (
          <div
            key={idx}
            className="p-6 mb-6 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex flex-wrap gap-6 border-b-2 border-gray-300 pb-4">
              {order.cartItems?.map((cartItem, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-1/3 lg:w-1/5 p-2 bg-gray-100 rounded-lg shadow-sm flex flex-col items-center text-center"
                >
                  <img
                    src={cartItem.product.imageCover}
                    alt={cartItem.product.title}
                    className="w-full h-60 object-cover rounded-lg mb-2"
                  />
                  <h2 className="text-lg font-semibold text-gray-800">
                    {cartItem.product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <h3 className="text-md text-gray-600 mt-1">
                    {cartItem.product.brand}
                  </h3>
                  <h4 className="text-lg font-bold text-teal-600 mt-2">
                    {cartItem.price} EGP
                  </h4>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Total Order Price:{" "}
                <span className="text-teal-600">
                  {order.totalOrderPrice} EGP
                </span>
              </h2>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Payment Method Type:{" "}
                <span className="text-teal-600">{order.paymentMethodType}</span>
              </h2>
              <h2 className="text-xl font-semibold text-gray-700">
                Last Update:{" "}
                <span className="text-teal-600">
                  {new Date(order.updatedAt).toLocaleDateString()}
                </span>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllOrders;
