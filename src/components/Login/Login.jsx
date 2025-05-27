import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const transitionClasses = "transition-all duration-300 ease-in-out";

const InputField = ({ label, id, error, touched, type = "text", placeholder, ...props }) => (
  <div className="py-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className={`w-full border rounded px-3 py-2
                 text-gray-900 placeholder-gray-500
                 hover:border-gray-400 hover:shadow-sm
                 focus:outline-none focus:ring-2 focus:border-transparent
                 ${transitionClasses}
                 ${
                   touched && error
                     ? "border-red-500 focus:ring-red-500"
                     : "border-gray-300 focus:ring-amber-500"
                 }`}
      placeholder={placeholder || `Enter your ${label.toLowerCase().replace(":", "")}...`}
      {...props}
    />
    {touched && error && (
      <p className="mt-1 text-xs text-red-600">{error}</p>
    )}
  </div>
);

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setApiError(null);
      try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );

        console.log("Login successful:", response.data);
        if (response.data.message === "success" && response.data.token) {
          localStorage.setItem("UserToken", response.data.token);
          navigate("/");
        } else {
          setApiError(response.data.message || "Login succeeded but no token received.");
        }
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        setApiError(error.response?.data?.message || "Invalid email or password.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex justify-center flex-col items-center w-full px-4 md:px-0"
      >
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login</h2>

          {apiError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center text-sm">
              {apiError}
            </div>
          )}

          <InputField
            label="Email:"
            id="login-email"
            placeholder="Enter your email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <InputField
            label="Password:"
            id="login-password"
            placeholder="Enter your password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          <button
            type="submit"
            disabled={isLoading || !formik.isValid || !formik.dirty}
            className={`mt-4 w-full bg-amber-500 text-white py-2 rounded
                     hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     ${transitionClasses}`}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
