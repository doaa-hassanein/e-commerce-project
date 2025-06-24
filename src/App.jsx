import React from "react";
import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import NotFoundPage from "./Components/NotFountPage/NotFoundPage";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./Context/AuthContextProvider";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDeatails/ProductDetails";
import CartContext from "./Context/CartContext";
import CartContextProvider from "./Context/CartContext";
import Cart from "./Components/Cart/Cart";
import Payment from "./Components/Payment/Payment";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AllOrders from "./Components/allOrders/allOrders";
import WishList from "./Components/WishList/WishList";
import WishListContextProvider from "./Context/WishListContext";

function App() {
  const x = new QueryClient();
  const myRouter = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/product",
          element: (
            <ProtectedRoute>
              {" "}
              <Products />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/",
          element: (
            <ProtectedRoute>
              {" "}
              <Home />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/Categories",
          element: (
            <ProtectedRoute>
              <Categories />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/WishList",
          element: (
            <ProtectedRoute>
              <WishList />{" "}
            </ProtectedRoute>
          ),
        },
        // to show pro id in url to use it in showing pro details
        {
          path: "/productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/payment",
          element: (
            <ProtectedRoute>
              <Payment />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: (
            <ProtectedRoute>
              <NotFoundPage />{" "}
            </ProtectedRoute>
          ),
        },

        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={x}>
      <AuthContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <Toaster />
            <RouterProvider router={myRouter}></RouterProvider>
          </CartContextProvider>
        </WishListContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
