import React, { useState } from "react"; 
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";



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
                     ? "border-red-500 focus:ring-red-500" // Error state
                     : "border-gray-300 focus:ring-amber-500" // Default/Focus state
                 }`}
      placeholder={placeholder || `Enter your ${label.toLowerCase().replace(":", "")}...`}
      {...props}
    />
    {touched && error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);


const signupSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .matches(
      /^[A-Za-z0-9]{6,20}$/,
      "Password must be 6-20 characters long (letters or numbers)"
    )
    .required("Password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  phone: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number")
    .required("Phone number is required"),
});

function Signup() {
  

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setApiError(null);
      setApiSuccess(null);
      try {
        const { name, email, password, rePassword, phone } = values;
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          { name, email, password, rePassword, phone }
        );

        console.log("Signup successful:", response.data);
        if (response.data.message === "success" && response.data.token) {
          setApiSuccess("Signup successful! Redirecting...");
          localStorage.setItem("UserToken", response.data.token);
          
        } else {
          setApiError(response.data.message || "Signup succeeded but no token received.");
        }
      } catch (error) {
        console.error("Signup error:", error.response?.data || error.message);
        setApiError(
          error.response?.data?.message || "An unexpected error occurred. Please try again."
        );
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
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Create Account
          </h2>

          {apiSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center text-sm">
              {apiSuccess}
            </div>
          )}
          {apiError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center text-sm">
              {apiError}
            </div>
          )}

          <InputField
            label="Name:"
            id="name"
            placeholder="Enter your name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.errors.name}
            touched={formik.touched.name}
          />
          <InputField
            label="Email:"
            id="email"
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
            label="Phone:"
            id="phone"
            placeholder="Enter your phone number"
            name="phone"
            type="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            error={formik.errors.phone}
            touched={formik.touched.phone}
          />
          <InputField
            label="Password:"
            id="password"
            placeholder="Enter your password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          <InputField
            label="Confirm Password:"
            id="rePassword"
            placeholder="Confirm your password"
            name="rePassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            error={formik.errors.rePassword}
            touched={formik.touched.rePassword}
          />

          <button
            type="submit"
            disabled={isLoading || !formik.isValid || !formik.dirty}
            className={`mt-4 w-full bg-amber-500 text-white py-2 rounded
                     hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     ${transitionClasses}`}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Signup;
