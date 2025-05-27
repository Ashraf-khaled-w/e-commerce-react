import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import ProductPage from "./components/ProductPage/ProductPage";
import About from "./components/About/About";
import Auth from "./components/Auth/Auth";
import Cart from "./components/Cart/Cart";
import Fav from "./components/Fav/Fav";

function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "product/:id", element: <ProductPage /> },
        { path: "about", element: <About /> },
        { path: "cart", element: <Cart /> },
        { path: "fav", element: <Fav /> },
      ],
    },
    { path: "auth", element: <Auth /> },
  ]);

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
