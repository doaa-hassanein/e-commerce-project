import logo from "./../../assets/icon.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 py-6 border-t border-gray-200">
      <div className="mx-auto max-w-screen-xl px-6">
        {/* Newsletter - Modern */}
        <div className="mb-7">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6 text-base">
              Subscribe to our newsletter for the latest offers and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                className="flex-grow px-5 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500 shadow-sm"
                placeholder="Your email address"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Payment & Social - Enhanced */}
        <div className="border-t border-gray-300 pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Payment Methods */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-3 text-gray-900">
                We Accept
              </h4>
              <div className="flex justify-center md:justify-start gap-3">
                {[
                  { icon: "fa-cc-visa", color: "text-blue-900" },
                  { icon: "fa-cc-mastercard", color: "text-red-600" },
                  { icon: "fa-cc-paypal", color: "text-blue-500" },
                  { icon: "fa-cc-apple-pay", color: "text-black" },
                  { icon: "fa-cc-amazon-pay", color: "text-amber-600" },
                ].map((method, index) => (
                  <div
                    key={index}
                    className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
                  >
                    <i
                      className={`fa-brands ${method.icon} text-2xl ${method.color}`}
                    ></i>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-3 text-gray-900">
                Connect With Us
              </h4>
              <div className="flex justify-center md:justify-start gap-3">
                {[
                  {
                    icon: "fa-facebook-f",
                    color: "bg-blue-600 hover:bg-blue-700",
                  },
                  { icon: "fa-twitter", color: "bg-sky-500 hover:bg-sky-600" },
                  {
                    icon: "fa-instagram",
                    color: "bg-pink-600 hover:bg-pink-700",
                  },
                  {
                    icon: "fa-linkedin-in",
                    color: "bg-blue-700 hover:bg-blue-800",
                  },
                  { icon: "fa-youtube", color: "bg-red-600 hover:bg-red-700" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`${social.color} w-12 h-12 flex items-center justify-center rounded-full text-white transition-all duration-300 shadow hover:shadow-lg`}
                  >
                    <i className={`fa-brands ${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright - Enhanced */}
          <div className="mt-5 pt-8 border-t border-gray-300 text-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} FreshCart. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Shipping Policy",
                "Returns",
                "Contact Us",
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-600 hover:text-green-600 text-sm font-medium transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
