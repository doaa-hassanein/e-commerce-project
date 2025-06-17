import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ImSpinner8 } from "react-icons/im";

const WishList = () => {
  const { products, deleteItemFromWishList, setproducts } = useContext(wishListContext);
  const { addProductToCart } = useContext(cartContext);
  const [isLoading, setisLoading] = useState(false)

  async function addProduct(id) {
    try {
      const data = await addProductToCart(id);
      if (data) {
        toast.success(data.message);
      } else {
        toast.error("Error adding to cart");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function handleDelete(id) {
    try {
      const result = await deleteItemFromWishList(id);
      if (result?.status === "success") {
        setproducts((prev) => ({
          ...prev,
          data: prev.data.filter((product) => product._id !== id),
        }));
        toast.success("Item removed successfully");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  }

   if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <ImSpinner8 className="animate-spin text-4xl text-green-600" />
        </div>
      );
    }

  return (
    <section className="py-10 px-4 bg-gray-50 min-h-screen">
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-10"
  >
    <h1 className="text-4xl font-bold text-green-600">Your Wishlist</h1>
    <p className="text-gray-500 mt-2">Items you've saved for later</p>
  </motion.div>

  <div className="container mx-auto">
    {products?.data?.length ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.data.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
              <img
                src={item.imageCover}
                alt={item.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow gap-3">
              <h2 className="text-md font-semibold text-gray-800 line-clamp-2">{item.title}</h2>
              <p className="text-green-600 font-bold text-lg">{item.price} EGP</p>
              <div className="mt-auto flex justify-between gap-2 pt-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-1/2 bg-red-100 text-red-700 hover:bg-red-200 font-medium py-2 rounded-lg transition-colors"
                >
                  <i className="fa fa-trash mr-2"></i> Remove
                </button>
                <button
                  onClick={() => addProduct(item._id)}
                  className="w-1/2 bg-green-100 text-green-700 hover:bg-green-200 font-medium py-2 rounded-lg transition-colors"
                >
                  <i className="fa fa-cart-plus mr-2"></i> Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-semibold text-green-600">
          Your Wishlist is Empty 💔
        </h2>
        <p className="text-gray-500 mt-2">Start adding products you love</p>
      </motion.div>
    )}
  </div>
</section>

  );
};

export default WishList;
