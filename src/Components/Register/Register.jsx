import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "./../../assets/images/pexels-catiamatos-1072179.jpg"; // تأكد من وضع الصورة في المسار الصحيح
import { div } from "framer-motion/client";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // to go to another page

  const user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  async function registerUser(values) {
    try {
      setIsLoading(true);
      const result = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      toast.success(result.data.message);
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  const validation = Yup.object().shape({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be at most 15 characters"),
    email: Yup.string()
      .required("Email is Required")
      .email("Enter a valid Email"),
    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^[A-Z][a-z0-9]{3,10}$/,
        "Password must start with an uppercase letter"
      ),
    rePassword: Yup.string()
      .required("Repassword is Required")
      .oneOf([Yup.ref("password")], "Repassword does not match with password"),
    phone: Yup.string()
      .required("Phone is Required")
      .matches(/01[0125][0-9]{8}/, "Enter a valid Egyptian phone number"),
  });

  const formik = useFormik({
    initialValues: user,
    onSubmit: registerUser,
    validationSchema: validation,
  });

  return (
    <div className="h-[50%] relative">
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-[110%] -z-10"
      />

      <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 px-4">
        <div className="mx-auto w-[90%]  bg-opacity-50 rounded-lg flex flex-row overflow-hidden">
          <div className=" bg-opacity-85 p-8 rounded-lg shadow-lg  w-[600px] mx-4 ms-20 ">
            <h1 className="text-5xl font-semibold text-white text-center mb-6 ">
              Registration Form
            </h1>

            <form onSubmit={formik.handleSubmit}>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="name"
                  className="block text-xl font-medium text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                  placeholder=" "
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                
              </div>
              {formik.errors.name && formik.touched.name && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">Error!</span>{" "}
                  {formik.errors.name}
                </div>
              )}

              <div className="relative z-0 w-full mb-5 group">
                 <label
                  htmlFor="email"
                 className="block text-xl font-medium text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                  placeholder=" "
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
               
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">Error!</span>{" "}
                  {formik.errors.email}
                </div>
              )}

              <div>
                  <label
                    htmlFor="password"
                    className="block text-xl font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-sm text-red-600 mt-1">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              {formik.errors.password && formik.touched.password && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">Error!</span>{" "}
                  {formik.errors.password}
                </div>
              )}

              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="rePassword"
                  className="block text-xl font-medium text-white"
                >
                  Repassword
                </label>
                <input
                  type="password"
                  name="rePassword"
                  id="rePassword"
                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                  placeholder=" "
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                
              </div>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">Error!</span>{" "}
                  {formik.errors.rePassword}
                </div>
              )}

              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="phone"
                 className="block text-xl font-medium text-white"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                  placeholder=" "
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                
              </div>
              {formik.errors.phone && formik.touched.phone && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">Error!</span>{" "}
                  {formik.errors.phone}
                </div>
              )}

              <div className="text-right">
                <button
                  type="submit"
                  className="w-full text-xl font-medium py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
                >
                
                  {isLoading ? (
                    <i className="fa-solid fa-spinner fa-spin text-white"></i>
                  ) : (
                    "Register now"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="w-1/2 flex flex-col justify-center items-start text-white p-12 mb-[100px] ms-60 ">
            <h1 className="text-5xl font-bold mb-10">Welcome Back</h1>
            <p className="text-xl text-white mb-6 leading-relaxed text-left ">
              It's a long established fact that a reader will be distracted
              <br />
              by the readable content of a page when looking at its layout.
              <br />
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum.
            </p>
            <div className="flex space-x-4 mt-6">
              <i className="fab fa-facebook-f text-2xl"></i>
              <i className="fab fa-twitter text-2xl"></i>
              <i className="fab fa-instagram text-2xl"></i>
              <i className="fab fa-youtube text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
