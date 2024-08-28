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
    // <section className="py-5 ">
    //   <div className="w-full md:w-[80%] mx-auto p-5 bg-slate-100">
    //     {products.length !== 0 ? (
    //       <>
    //         <h1 className="p-3  font-semibold tracking-wider text-4xl mb-3">
    //           My wish list
    //         </h1>
    //         {products?.data.map((item, index) => (
    //           <div key={index}>
    //             <div className=" flex flex-wrap items-center justify-center border-b-2 border-green-300 py-5">
    //               <div className=" w-1/6 p-5">
    //                 <img src={item.imageCover} className="w-full" alt="" />
    //               </div>

    //               <div className=" w-4/6 p-5">
    //                 <h2 className="mb-3 text-xl tracking-wider font-semibold text-gray-800">
    //                   {" "}
    //                   {item.title}{" "}
    //                 </h2>
    //                 <h2 className="mb-3 text-xl tracking-wider text-green-600 font-semibold">
    //                   {" "}
    //                   {item.price} EGP{" "}
    //                 </h2>

    //                 <button
    //                   onClick={() => deleteItemFromWishList(item._id)}
    //                   className="focus:outline-none text-red-700 border border-red-700 bg-transparent font-mono tracking-wider   font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2  mt-3 "
    //                 >
    //                   <i className="fa fa-trash me-3" aria-hidden="true"></i>
    //                   Remove
    //                 </button>
    //               </div>

    //               <div className=" w-1/6 p-5">
    //                 <div className="flex flex-wrap items-center justify-between">
    //                   <button
    //                     onClick={() => addProduct(item._id)}
    //                     className="focus:outline-none bg-transparent text-emerald-600 border border-emerald-600 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 mt-3 "
    //                   >
    //                     + add To Cart
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </>
    //     ) : (
    //       <div>
    //         <h2 className="text-center py-6 text-green-600 font-mono font-bold text-5xl">
    //           {" "}
    //           My wish List{" "}
    //         </h2>
    //       </div>
    //     )}
    //   </div>
    // </section>

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
