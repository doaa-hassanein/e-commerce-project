import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

const ProductDetails = () => {
  const [loader, setLoader] = useState(false);
  const { id } = useParams();

  async function getEachProduct() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  const { addProductToCart } = useContext(cartContext);

  async function addProduct() {
    setLoader(true);
    const data = await addProductToCart(id);

    if (data) {
      toast.success(data.message);
      setLoader(false);
    } else {
      toast.error("Error adding product to cart.");
      setLoader(false);
    }
  }

  const { data, isLoading } = useQuery(`productDetails${id}`, getEachProduct);

  if (isLoading) {
   return (
       <div className="min-h-screen flex items-center justify-center bg-white">
         <ImSpinner8 className="animate-spin text-4xl text-green-600" />
       </div>
     );
  }

  

 return (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <section className="w-full max-w-6xl mx-auto">
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
      
      {/* Image Section */}
      <div className="w-full lg:w-1/2 p-4 flex items-center justify-center">
        <img
          src={data?.data.data.imageCover}
          className="w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain rounded-lg"
          alt={data?.data.data.title}
        />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col">
        <div className="flex-grow">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full mb-4">
            {data?.data.data.category.name}
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {data?.data.data.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-2 sm:gap-4">
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star ${i < Math.floor(data?.data.data.ratingsAverage) ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {data?.data.data.ratingsAverage.toFixed(1)}
              </span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              {data?.data.data.price} EGP
            </span>
          </div>

          <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
            {data?.data.data.description}
          </p>
        </div>

        <button
          onClick={addProduct}
          disabled={loader}
          className={`w-full py-3 sm:py-4 px-6 rounded-lg font-medium text-white transition-all duration-300 ${
            loader ? 'bg-green-600' : 'bg-green-700 hover:bg-green-800'
          } flex items-center justify-center space-x-2`}
        >
          {loader ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              <span>Adding...</span>
            </>
          ) : (
            <>
              <i className="fas fa-shopping-cart mr-2"></i>
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  </section>
</div>

);
};

export default ProductDetails;
