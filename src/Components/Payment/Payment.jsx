import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCreditCard, FiDollarSign, FiX, FiAlertCircle } from "react-icons/fi";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

const Payment = () => {
  const { cartID, setnumOfItems, setproducts, settotalPrice } =
    useContext(cartContext);
  const [formData, setFormData] = useState({
    details: "",
    phone: "",
    city: "",
  });
  const [showAlert, setShowAlert] = useState(false); // alert if any input is empty
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    // name : input name (phone , city , details)
    // value : value that user put it in input
    // prev : النسخة القديمة من ال form data
    // ...prev : بننسخ كل القيم القديمة

    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.details && formData.phone && formData.city;

  async function cashPayment() {
    if (!isFormValid) {
      setShowAlert(true); // missing data
      return;
    }
    // زى ال loading page كدا
    // set data from formData into shippingAddress
    // payload : data that user worte it in inputs
    setIsProcessing(true);
    const payload = {
      shippingAddress: {
        ...formData,
      },
    };

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        payload,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      toast.success(data.status);
      setnumOfItems(0);
      settotalPrice(0);
      setproducts([]);
    } catch (error) {
      toast.error("Error processing cash payment");
    } finally {
      setIsProcessing(false);
    }
  }

  async function onlinePayment() {
    if (!isFormValid) {
      setShowAlert(true);
      return;
    }

    setIsProcessing(true);
    const payload = {
      shippingAddress: {
        ...formData,
      },
    };

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:5173/E-commerce`,
        payload,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      window.open(data.session.url);
    } catch (error) {
      toast.error("Error processing online payment");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-medium text-gray-800 mb-4"
        >
          Complete Your Purchase
        </motion.h2>
      </div>

      {/* Payment Form */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-[60%] mx-auto bg-white rounded-xl shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg"
      >
        <div className="p-8">
          <h3 className="text-2xl font-medium text-gray-800 mb-6">
            Shipping Information
          </h3>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="+20 123 456 7890"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="Cairo, Alexandria, etc."
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Details
              </label>
              <textarea
                rows="3"
                name="details"
                id="details"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="Building number, street, district"
                value={formData.details}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onlinePayment}
              disabled={isProcessing}
              className={`w-full flex items-center justify-center px-6 py-4 rounded-lg ${
                isProcessing ? "bg-gray-300" : "bg-gray-800 hover:bg-gray-700"
              } text-white transition-colors`}
            >
              <FiCreditCard className="mr-3 text-xl" />
              {isProcessing ? "Processing..." : "Pay with Credit Card"}
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={cashPayment}
              disabled={isProcessing}
              className={`w-full flex items-center justify-center px-6 py-4 rounded-lg ${
                isProcessing ? "bg-gray-300" : "bg-green-600 hover:bg-green-700"
              } text-white transition-colors`}
            >
              <FiDollarSign className="mr-3 text-xl" />
              {isProcessing ? "Processing..." : "Cash on Delivery"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Alert Modal */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6"
            >
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-4">
                  <FiAlertCircle className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Missing Information
                  </h3>
                  <p className="text-gray-600">
                    Please fill in all required fields to proceed with your
                    payment.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowAlert(false)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Payment;
