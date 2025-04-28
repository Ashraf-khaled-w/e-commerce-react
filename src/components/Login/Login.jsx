import React from "react";

const transitionClasses = "transition-all duration-300 ease";
const InputField = ({ label, type = "text", id }) => (
  <div className="py-2">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      className={`w-full border-1 border-gray-600 hover:shadow-2xl rounded ${transitionClasses}}`}
    />
  </div>
);

function Login() {
  return (
    <form className="flex justify-center flex-col items-center w-full">
      <div className="w-full max-w-md">
        <InputField label="Email:" 
        type="email" 
        id="email" 
        />
        <InputField
          label="Password:"
          type="password"
          id="password"
        />
        <button
          type="submit"
          className={`mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600  ${transitionClasses}`}
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default Login;
