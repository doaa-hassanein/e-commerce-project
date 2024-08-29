import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authcontext } from "./../../Context/AuthContextProvider";
import background from "./../../assets/images/background.jpg";
import logo from "./../../assets/images/logo.png";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isCodeVerification, setIsCodeVerification] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [emailForReset, setEmailForReset] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [codeVerified, setCodeVerified] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(authcontext);

  const user = {
    email: "",
    password: "",
  };

  async function loginUser(values) {
    try {
      setIsLoading(true);
      const result = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      toast.success(result.data.message);
      setIsLoading(false);
      navigate("/");
      setToken(result.data.token);
      localStorage.setItem("tkn", result.data.token);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  async function handleForgotPassword(values) {
    try {
      setIsLoading(true);
      setEmailForReset(values.email);
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      toast.success("Password reset link sent to your email.");
      setIsForgotPassword(false);
      setIsCodeVerification(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  async function verifyResetCode() {
    try {
      setIsLoading(true);
      console.log("Verifying code:", resetCode);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );

      console.log("Response data:", response.data);
      const { success, message } = response.data;

      if (response.data) {
        toast.success("Code verified successfully.");
        setCodeVerified(true);
      } else {
        toast.error(message || "Verification failed. Please try again.");
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);

      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function resetPassword() {
    try {
      setIsLoading(true);

      if (!emailForReset || !newPassword) {
        throw new Error("Email and new password are required.");
      }

      console.log("Resetting password:", { emailForReset, newPassword });

      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        { email: emailForReset, newPassword }
      );

      console.log("Response data:", response.data);

      const { success, message } = response.data;

      if (response.data) {
        toast.success("Password has been reset successfully.");
        setIsCodeVerification(false);
        setIsForgotPassword(false);
      } else {
        toast.error(message || "Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error resetting password:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const validation = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{3,10}$/,
        "Password must start with an uppercase letter"
      ),
  });

  const forgotPasswordValidation = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
  });

  const formik = useFormik({
    initialValues: user,
    onSubmit: loginUser,
    validationSchema: validation,
  });

  const forgotPasswordFormik = useFormik({
    initialValues: { email: "" },
    onSubmit: handleForgotPassword,
    validationSchema: forgotPasswordValidation,
  });

  return (
    <div className="h-[50%] relative">
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-[110%] -z-10"
      />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
        <div className="mb-4">
          <img src={logo} alt="Logo" className="w-32 h-auto" />
        </div>
        <div className="bg-white bg-opacity-85 p-8 rounded-lg shadow-lg w-full sm:w-[600px] max-w-md login-card">
          <h1 className="text-4xl my-4 font-bold text-teal-600 text-center">
            Login Form
          </h1>
          <div className="w-[80%] mx-auto">
            <form onSubmit={formik.handleSubmit}>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block py-3 px-0 w-full text-base text-gray-800 bg-transparent border-0 border-b-2 border-teal-500 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  placeholder=" "
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="email"
                  className="absolute text-base text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              {formik.errors.email && formik.touched.email && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
                  role="alert"
                >
                  <span className="font-medium">Error!</span>{" "}
                  {formik.errors.email}
                </div>
              )}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block py-3 px-0 w-full text-base text-gray-800 bg-transparent border-0 border-b-2 border-teal-500 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  placeholder=" "
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="password"
                  className="absolute text-base text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              {formik.errors.password && formik.touched.password && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
                  role="alert"
                >
                  <span className="font-medium">Error!</span>{" "}
                  {formik.errors.password}
                </div>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  className="mb-4 text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center"
                >
                  {isLoading ? (
                    <i className="fa-solid fa-spinner fa-spin text-white"></i>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-lg text-blue-500 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isForgotPassword && !isCodeVerification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[600px]">
            <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
            <form onSubmit={forgotPasswordFormik.handleSubmit}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="email"
                  id="forgot-email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  placeholder=" "
                  value={forgotPasswordFormik.values.email}
                  onChange={forgotPasswordFormik.handleChange}
                  onBlur={forgotPasswordFormik.handleBlur}
                />
                <label
                  htmlFor="forgot-email"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              {forgotPasswordFormik.errors.email &&
                forgotPasswordFormik.touched.email && (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
                    role="alert"
                  >
                    <span className="font-medium">Error!</span>{" "}
                    {forgotPasswordFormik.errors.email}
                  </div>
                )}
              <div className="text-center">
                <button
                  type="submit"
                  className="me-4 mb-4 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {isLoading ? (
                    <i className="fa-solid fa-spinner fa-spin text-white"></i>
                  ) : (
                    "Send Reset Code"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="mb-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCodeVerification && !codeVerified && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[600px]">
            <h2 className="text-xl font-bold mb-4">Verify Reset Code</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Reset Code"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={verifyResetCode}
                className="me-4 mb-4 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin text-white"></i>
                ) : (
                  "Verify Code"
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsCodeVerification(false)}
                className="mb-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isCodeVerification && codeVerified && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[600px]">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={resetPassword}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  value={emailForReset}
                  onChange={(e) => setEmailForReset(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="me-4 mb-4 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {isLoading ? (
                    <i className="fa-solid fa-spinner fa-spin text-white"></i>
                  ) : (
                    "Reset Password"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCodeVerification(false)}
                  className="mb-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
