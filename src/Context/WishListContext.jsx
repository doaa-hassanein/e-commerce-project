import React, { createContext, useContext, useEffect, useState } from "react";
import { authcontext } from "./AuthContextProvider";
import axios from "axios";

export const wishListContext = createContext();

const WishListContextProvider = ({ children }) => {
  const [numOfItems, setnumOfItems] = useState(0);
  const [products, setproducts] = useState([]);
  const [cartID, setcartID] = useState("");
  const { token } = useContext(authcontext);

  async function getWishListCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

     
      setnumOfItems(data.numOfCartItems);
      setproducts(data);

      setcartID(data.data._id);

      return data;
    } catch (error) {
      console.log(error, "get user wish list context");
    }
  }

  useEffect(
    function () {
      if (token != null) {
        getWishListCart();
      }
    },
    [token]
  );

  async function addProductToWishList(proID) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: proID,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      console.log("added to wish list");
      getWishListCart();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

    async function deleteItemFromWishList(id) {
      //
      try {
        const { data } = await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
          {
            headers: {
              token: localStorage.getItem("tkn"),
            },
          }
        );

        getWishListCart()
        // setproducts(data);

        setcartID(data._id);

        console.log("wish list delete item");
        
        return data;
        
      } catch (error) {
        console.log(error, "error from delete item from cart !!!!!");
      }
    }


  return (
    <wishListContext.Provider
      value={{
        addProductToWishList,
        products,
        numOfItems,
        deleteItemFromWishList,
        cartID,
        setnumOfItems,
        setproducts,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
};

export default WishListContextProvider;
