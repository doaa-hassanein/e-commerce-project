import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "./../../assets/images/background.jpg"; // تأكد من وضع الصورة في المسار الصحيح

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-white bg-opacity-85 p-8 rounded-lg shadow-lg  w-[600px] mx-4">
        <h1 className="text-3xl font-semibold text-teal-600 text-center mb-6 ">
          Registration Form
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=" "
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
          </div>
          {formik.errors.name && formik.touched.name && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              <span className="font-medium">Error!</span> {formik.errors.name}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email Address
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              <span className="font-medium">Error!</span> {formik.errors.email}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              <span className="font-medium">Error!</span>{" "}
              {formik.errors.password}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=" "
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="rePassword"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Repassword
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              <span className="font-medium">Error!</span>{" "}
              {formik.errors.rePassword}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=" "
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              <span className="font-medium">Error!</span> {formik.errors.phone}
            </div>
          )}

          <div className="text-right">
            <button
              type="submit"
              className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin text-white"></i>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
