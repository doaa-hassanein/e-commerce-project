import logo from "./../../assets/icon.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* App Promotion Section */}
        <div className="text-center mb-8">
          <span className="text-3xl font-semibold text-teal-600">
            Get the FrshCart App
          </span>
          <p className="text-lg text-gray-600 mt-2">
            We will send you a link; open it on your phone to download the app.
          </p>
        </div>

        {/* Email Subscription and Button */}
        <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-4">
          <input
            type="text"
            className="w-full md:w-2/3 lg:w-1/3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your email..."
          />
          <button className="mt-4 md:mt-0 bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 text-lg">
            Share App Link
          </button>
        </div>

        {/* Payment Methods Section */}
        <div className="mt-8 border-t border-b border-gray-300 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            {/* Payment Methods */}
            <div className="flex flex-col md:flex-row md:items-center mb-8 md:mb-0">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0 md:mr-4 flex items-center">
                <span className="mr-2">Payment Methods</span>
                <div className="flex space-x-4">
                  <i className="fa-brands fa-amazon-pay text-3xl text-yellow-400 hover:text-yellow-500 transition-colors"></i>
                  <svg
                  className="mt-[-9px]"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#3F51B5"
                    d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"
                  ></path>
                  <path
                    fill="#FFC107"
                    d="M30 14A10 10 0 1 0 30 34A10 10 0 1 0 30 14Z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M22.014,30c-0.464-0.617-0.863-1.284-1.176-2h5.325c0.278-0.636,0.496-1.304,0.637-2h-6.598C20.07,25.354,20,24.686,20,24h7c0-0.686-0.07-1.354-0.201-2h-6.598c0.142-0.696,0.359-1.364,0.637-2h5.325c-0.313-0.716-0.711-1.383-1.176-2h-2.973c0.437-0.58,0.93-1.122,1.481-1.595C21.747,14.909,19.481,14,17,14c-5.523,0-10,4.477-10,10s4.477,10,10,10c3.269,0,6.162-1.575,7.986-4H22.014z"
                  ></path>
                </svg>
                  <i className="fa-brands fa-cc-paypal text-3xl text-sky-400 hover:text-sky-600 transition-colors"></i>
                  <i className="fa-brands fa-cc-visa text-3xl text-blue-600 hover:text-blue-700 transition-colors"></i>
                </div>
              </h2>
            </div>

            {/* Delivery Info */}
            <div className="flex flex-col md:flex-row md:items-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0 md:mr-4 flex items-center">
                <span className="mr-2">Get Deliveries with FrshCart</span>
                <div className="flex space-x-4">
                  <i className="fa-brands fa-cc-apple-pay text-2xl text-gray-500 hover:text-gray-600 transition-colors"></i>
                  <i className="fa-brands fa-google-play text-2xl text-orange-500 hover:text-orange-600 transition-colors"></i>
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
