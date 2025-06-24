import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiCreditCard,
  FiDollarSign,
  FiPackage,
} from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";

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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <ImSpinner8 className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  return (
    <section className="py-6 bg-gray-50">
      <div className="flex flex-wrap items-center justify-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-bold text-center text-3xl tracking-wide text-green-600">
            Your Order History
          </h1>
        </motion.div>
      </div>

      <div className="w-full px-4 md:w-11/12 lg:w-4/5 mx-auto">
        {allOrders?.map((order, idx) => (
          <div
            key={idx}
            className="p-4 mb-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            {/* Grid for cart items - responsive columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 border-b border-gray-300 pb-3">
              {order.cartItems?.map((cartItem, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-gray-100 rounded-lg shadow-sm flex flex-col items-center text-center"
                >
                  <img
                    src={cartItem.product.imageCover}
                    alt={cartItem.product.title}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mb-1"
                  />
                  <h2 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-1">
                    {cartItem.product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <h3 className="text-xs text-gray-600 mt-1">
                    {cartItem.product.brand.name}
                  </h3>
                  <h4 className="text-xs sm:text-sm font-bold text-green-600 mt-1">
                    {cartItem.price} EGP
                  </h4>
                </div>
              ))}
            </div>

            <div className="p-4">
              {/* Grid for order details - now 2x2 on mobile */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <div className="bg-green-50 p-2 rounded-full mr-3">
                    <FiDollarSign className="text-green-600 text-base" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      Total Amount
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                      {order.totalOrderPrice} EGP
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-blue-50 p-2 rounded-full mr-3">
                    <FiCreditCard className="text-blue-600 text-base" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      Payment Method
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-800 capitalize">
                      {order.paymentMethodType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-purple-50 p-2 rounded-full mr-3">
                    <FiCalendar className="text-purple-600 text-base" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      Last Updated
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                      {new Date(order.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-amber-50 p-2 rounded-full mr-3">
                    <FiPackage className="text-amber-600 text-base" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      Order Status
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                      Delivered
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {allOrders?.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPackage className="text-gray-400 text-2xl" />
          </div>
          <h2 className="text-xl font-light text-gray-600 mb-2">
            No orders found
          </h2>
          <p className="text-gray-500 max-w-md mx-auto mb-4 text-sm">
            You haven't placed any orders yet. Start shopping to see your order
            history here.
          </p>
          <button className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm">
            Shop Now
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default AllOrders;
