import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import ProductPage from "./components/ProductPage/ProductPage";
import About from "./components/About/About";
import Auth from "./components/Auth/Auth";

function App() {
  let routers = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "productPage", element: <ProductPage /> },
          { path: "about", element: <About /> },
        ],
      },
      { path: "auth", element: <Auth /> },
    ],
    { basename: "/e-commerce-react/" }
  );

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
