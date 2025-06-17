import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authcontext } from "./../../Context/AuthContextProvider";
import background from "./../../assets/images/pexels-catiamatos-1072179.jpg";

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

      <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 px-4">

        <div className="mx-auto w-[95%] bg-opacity-50 rounded-lg flex flex-col md:flex-row overflow-hidden">


          <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-white p-6 md:p-12 mb-8 md:mb-[100px]">

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

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-opacity-60 p-6 md:p-12">

            <div className="w-full max-w-md">
              <h2 className="text-5xl font-bold mb-6 text-white text-center">
                Sign in
              </h2>

              <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-5">
                {/* Email */}
                <div>
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
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-sm text-red-600 mt-1">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
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

                {/* Remember me + Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-lg font-medium text-gray-300">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-lg font-medium text-white hover:underline"
                  >
                    Forget password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full text-xl font-medium py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
                >
                  {isLoading ? (
                    <i className="fa-solid fa-spinner fa-spin text-white"></i>
                  ) : (
                    "Sign in now"
                  )}
                </button>
              </form>

              {/* Terms */}
              <p className="text-sm text-center text-white mt-6">
                By clicking on "Sign in now" you agree to our{" "} <br/>
                <a href="#" className="text-white hover:underline">
                  Terms of Service
                </a>{" "}
                &{" "}
                <a href="#" className="text-white hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
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
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-500 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                  value={forgotPasswordFormik.values.email}
                  onChange={forgotPasswordFormik.handleChange}
                  onBlur={forgotPasswordFormik.handleBlur}
                />
                <label
                  htmlFor="forgot-email"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                  className="me-4 mb-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
                  className="mb-4 text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-500 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={verifyResetCode}
                className="me-4 mb-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
                className="mb-4 text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-500 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  value={emailForReset}
                  onChange={(e) => setEmailForReset(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-500 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="me-4 mb-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
                  className="mb-4 text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
