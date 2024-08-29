import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { wishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";



const WishList = () => {
  const { products, deleteItemFromWishList, setproducts } =
    useContext(wishListContext);

  console.log(products.data, "wish page");

  const { addProductToCart } = useContext(cartContext);

  // function to call addProductToCart
  async function addProduct(id) {
    const data = await addProductToCart(id);
    console.log(data);

    if (data) {
      toast.success(data.message);
    } else {
      toast.error("error");
    }
  }

  //   const handleDelete = async (id) => {
  //     try {
  //       const result = await deleteItemFromWishList(id);
  //       if (result.success) {

  //         setproducts(products.filter((product) => product._id !== id));
  //         toast.success("Item removed successfully");
  //       } else {
  //         toast.error("Failed to remove item");
  //       }
  //     } catch (error) {
  //       toast.error("An error occurred");
  //     }
  //   };

  return (
   

    <section className="py-8 ">
      <div className="w-full md:w-[90%] mx-auto p-6 bg-white rounded-lg shadow-md">
        {products.length !== 0 ? (
          <>
            <h1 className="text-4xl font-semibold text-center text-teal-700 mb-6">
              My Wish List
            </h1>
            {products?.data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center border-b border-gray-300 py-4"
              >
                
                <div className="w-full md:w-1/4 p-4 ">
                  <img
                    src={item.imageCover}
                    className="w-full h-60 object-cover rounded-lg shadow-md"
                    alt={item.title}
                  />
                   
                </div>
                <div className="w-full md:w-1/2 p-4 text-center md:text-left">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h2>
                  <h3 className="text-lg font-semibold text-teal-600 mb-4">
                    {item.price} EGP
                  </h3>
                  <div className="flex justify-center md:justify-start gap-4">
                    <button
                      onClick={() => deleteItemFromWishList(item._id)}
                      className="flex items-center text-red-700 border border-red-700 bg-transparent font-medium rounded-lg text-lg px-4 py-2 hover:bg-red-50 transition-colors"
                    >
                      <i className="fa fa-trash me-2" aria-hidden="true"></i>
                      Remove
                    </button>
                    <button
                      onClick={() => addProduct(item._id)}
                      className="flex items-center text-teal-600 border border-teal-600 bg-transparent font-medium rounded-lg text-lg px-4 py-2 hover:bg-teal-50 transition-colors"
                    >
                      <i
                        className="fa fa-cart-plus me-2"
                        aria-hidden="true"
                      ></i>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-6">
            <h2 className="text-2xl font-semibold text-teal-600">
              Your Wish List is Empty
            </h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishList;
