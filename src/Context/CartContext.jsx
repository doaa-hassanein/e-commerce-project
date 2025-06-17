import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authcontext } from "./AuthContextProvider";
import toast from "react-hot-toast";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [numOfItems, setnumOfItems] = useState(0);
  const [products, setproducts] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [cartID, setcartID] = useState("");

  const { token } = useContext(authcontext);

  // add numOfItems to cart (badge)  RED MARK
  async function getUserCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setnumOfItems(data.numOfCartItems);
      setproducts(data.data.products);
      settotalPrice(data.data.totalCartPrice);
      setcartID(data.data._id);
      return data;
    } catch (error) {
      toast.error("Error adding product to cart");
    }
  }

  useEffect(
    function () {
      if (token != null) {
        getUserCart();
      }
    },
    [token]
  );

  async function addProductToCart(proID) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: proID,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      getUserCart();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCount(id, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count, // body
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      // to updata data without refresh
      setnumOfItems(data.numOfCartItems);
      setproducts(data.data.products);
      settotalPrice(data.data.totalCartPrice);
      setcartID(data.data._id);

      return data;
    } catch (error) {
      console.log(error, "error update count ");
    }
  }

  async function deleteItemFromCart(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setnumOfItems(data.numOfCartItems);
      setproducts(data.data.products);
      settotalPrice(data.data.totalCartPrice);
      setcartID(data.data._id);

      return data;
    } catch (error) {
      console.log(error, "error from delete item from cart !!!!!");
    }
  }

  async function clearCart() {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setnumOfItems(0);
      setproducts([]);
      settotalPrice(0);
      return data;
    } catch (error) {
      console.log(error, "error from delete item from cart !!!!!");
    }
  }
  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        products,
        numOfItems,
        totalPrice,
        updateCount,
        deleteItemFromCart,
        clearCart,
        cartID,
        setnumOfItems,
        setproducts,
        settotalPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
export default CartContextProvider;
