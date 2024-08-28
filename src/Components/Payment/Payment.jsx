import React, { useContext, useState } from "react";
import "./Payment.css";
import toast from "react-hot-toast";
import axios from "axios";
import { cartContext } from "../../Context/CartContext";

const Payment = () => {
  const { cartID, setnumOfItems, setproducts, settotalPrice } = useContext(cartContext);
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [showAlert, setShowAlert] = useState(false);


  const isFormValid = details && phone && city;

  async function cashPayment() {
    if (!isFormValid) {
      setShowAlert(true);
      return;
    }

    const payload = {
      shippingAddress: {
        details,
        phone,
        city,
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
    }
  }

  async function onlinePayment() {
    const payload = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:5173`,
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
    }
  }

  return (
    <section className="payment-section py-12 ">
      <h2 className="text-center text-5xl font-bold text-teal-600 mb-8">Payment Details</h2>

      <div className="w-full md:w-3/4 lg:w-1/2 mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <div className="form-group mb-6">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone number:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter your phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group mb-6">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter your city"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-group mb-6">
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Details:</label>
          <textarea
            rows="4"
            name="details"
            id="details"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter additional details"
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={cashPayment}
            className="flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
          >
            <svg
              className="me-2 w-[35px] h-[35px] text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.1"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Cash Payment
          </button>

          <button
            onClick={onlinePayment}
            className="flex items-center justify-center px-6 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
          >
             <svg
              className="me-2 w-[35px] h-[35px] text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.1"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Online Payment
          </button>
        </div>
      </div>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-red-600 mb-4">Error</h3>
            <p className="text-gray-700">Please fill in all required fields.</p>
            <button
              onClick={() => setShowAlert(false)}
              className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Payment;
