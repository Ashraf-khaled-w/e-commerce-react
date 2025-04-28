import React from "react";



const InputField = ({ label, type = "text", id, placeholder }) => (
  <div className="py-2">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-full border-1 border-gray-600 hover:shadow-2xl rounded transition-all duration-300 ease"
    />
  </div>
);

function Signup() {
  return (
    <form className="flex justify-center flex-col items-center w-full">
      <div className="w-full max-w-md">
        {" "}
        <InputField label="Name:" id="name" placeholder="Name..." />
        <InputField label="Email:" type="email" id="email" placeholder="Email..." />
        <InputField
          label="Password:"
          type="password"
          id="password"
          placeholder="Password..."
        />
        <InputField
          label="Confirm Password:"
          type="password"
          id="repassword"
          placeholder="Confirm password..."
        />
        <InputField label="Phone:" type="tel" id="phone" placeholder="Phone..." />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-all duration-300 ease"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default Signup;
