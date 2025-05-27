import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <main className="flex-grow min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
