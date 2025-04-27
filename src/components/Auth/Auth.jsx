import React, { useState } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

function Auth() {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const toggleAuthMode = () => {
    setIsLoginActive(!isLoginActive);
  };

  return (
    <>
      <div className="bg-gray-900 text-white h-screen w-screen flex justify-center items-center overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] max-w-4xl relative">
          <div id="login" className="flex justify-center items-center p-4">
            <Login />
          </div>
          <div id="signup" className="flex justify-center items-center p-4">
            <Signup />
          </div>
          <div
            id="slideBoxH"
            className={`bg-black absolute top-0 bottom-0 w-[50%] rounded-2xl transition-all duration-500 ease-in-out ${
              isLoginActive ? "left-[0]" : "left-[50%]"
            }`}
          >
            <div className="h-full w-full flex flex-col justify-end items-center pb-8">
              <button
                id="toggleBtn"
                onClick={toggleAuthMode}
                className="mb-4 border-2 rounded-full bg-amber-600 text-white p-3 px-6 hover:shadow-2xl hover:bg-amber-700 transition-all duration-300 ease focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75" 
              >
                {isLoginActive ? "Login" : "SignUp"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
