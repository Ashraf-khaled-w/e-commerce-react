import React, { useState } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const transitionDuration = "duration-500";
const transitionTiming = "ease-in-out";
const baseTransition = `transition-all ${transitionDuration} ${transitionTiming}`;

function Auth() {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [showOverlayContent, setShowOverlayContent] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleAuthMode = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setShowOverlayContent(false);

    setTimeout(() => {
      setIsLoginActive(!isLoginActive);

      const durationMs = parseInt(transitionDuration.replace("duration-", ""));
      setTimeout(() => {
        setShowOverlayContent(true);
      }, durationMs / 2);

      setTimeout(() => {
        setIsTransitioning(false);
      }, durationMs);
    }, 100);
  };

  const loginContainerClasses = `
    flex justify-center items-center p-4 rounded-2xl
    ${baseTransition}
    ${
      isLoginActive
        ? "opacity-100 scale-100 z-5"
        : "opacity-0 scale-95 -z-10 pointer-events-none"
    }
  `;

  const signupContainerClasses = `
    flex justify-center items-center p-4 rounded-2xl
    ${baseTransition}
    ${
      !isLoginActive
        ? "opacity-100 scale-100 z-5"
        : "opacity-0 scale-95 -z-10 pointer-events-none"
    }
  `;

  const overlayClasses = `
    bg-gradient-to-br from-amber-500 to-orange-600
    absolute rounded-2xl
    ${baseTransition}
    z-10 // Overlay sits ON TOP (now z-10)

    // Small Screens (Default): Vertical Slide
    w-full h-[50%] left-0
    ${isLoginActive ? "top-[50%]" : "top-[0%]"}

    // Medium Screens and Up (md:): Horizontal Slide
    md:w-[50%] md:h-full md:top-0
    ${isLoginActive ? "md:left-[50%]" : "md:left-[0%]"}
  `;

  const overlayContentClasses = `
    transition-opacity duration-300 ease-in-out
    ${showOverlayContent ? "opacity-100" : "opacity-0"}
  `;

  return (
    <>
      <div className="min-h-screen w-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-amber-50 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 w-[90%] max-w-4xl min-h-[1100px] md:min-h-[500px] relative shadow-xl rounded-2xl bg-white overflow-hidden">
          <div id="login" className={loginContainerClasses}>
            <Login />
          </div>
          <div id="signup" className={signupContainerClasses}>
            <Signup />
          </div>
          <div id="slideBoxH" className={overlayClasses}>
            <div className="h-full w-full flex flex-col justify-center items-center p-8 text-center">
              <h2 className={`text-2xl font-bold text-white mb-4 ${overlayContentClasses}`}>
                {isLoginActive ? "New Here?" : "Already have account?"}
              </h2>
              <p className={`text-white mb-6 ${overlayContentClasses}`}>
                {isLoginActive ? "Sign up to get started." : "Login to access your account."}
              </p>
              <button
                id="toggleBtn"
                onClick={toggleAuthMode}
                disabled={isTransitioning}
                className={` border-2 border-white rounded-full bg-white/30 backdrop-blur-sm text-white p-3 px-6
                           hover:bg-white/40 active:scale-95
                           focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75
                           disabled:opacity-50 disabled:cursor-not-allowed
                           ${overlayContentClasses}`}
              >
                {isLoginActive ? "Sign Up" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
