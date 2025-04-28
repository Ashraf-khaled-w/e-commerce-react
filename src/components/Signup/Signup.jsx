import React from "react";

const transitionClasses = "transition-all duration-300 ease-in-out";

const InputField = ({ label, type = "text", id, placeholder }) => (
  <div className="py-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className={`w-full border border-gray-300 rounded px-3 py-2
                 text-gray-900 placeholder-gray-500
                 hover:border-gray-400 hover:shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent // Using amber for signup focus? Or keep blue?
                 ${transitionClasses}`}
      placeholder={placeholder || `Enter your ${label.toLowerCase().replace(":", "")}...`}
    />
  </div>
);

function Signup() {
  return (
    <>
      <form className="flex justify-center flex-col items-center w-full">
        <div className="w-full max-w-md">
          <InputField label="Name:" type="text" id="name" />
          <InputField label="Email:" type="email" id="email" />
          <InputField label="Password:" type="password" id="password" />

          <InputField label="Confirm Password:" type="password" id="confirm-password" />
          <button
            type="submit"
            className={`mt-4 w-full bg-amber-500 text-white py-2 rounded
                     hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
                     ${transitionClasses}`}
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default Signup;
