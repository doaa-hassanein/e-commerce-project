import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

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
      <div className="h-screen bg-teal-500 flex justify-center items-center">
        <Bars
          height="80"
          width="80"
          color="white"
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <section className="w-full md:w-4/5 lg:w-3/4 mx-auto">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col lg:flex-row h-auto ">
          <div className="w-full lg:w-1/2 p-4 lg:p-6">
            <img
              src={data?.data.data.imageCover}
              className="w-full h-[70%] object-cover rounded-lg shadow-md"
              alt={data?.data.data.title}
            />
          </div>

          <div className="w-full lg:w-1/2 p-6 flex flex-col justify-start">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {data?.data.data.title}
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                {data?.data.data.description}
              </p>
              <p className="text-lg text-teal-800 font-semibold mb-4">
                {data?.data.data.category.name}
              </p>
              <div className="flex items-center mb-4">
                <h4 className="text-2xl font-bold text-gray-900 mr-4">
                  {data?.data.data.price} EGP
                </h4>
                <div className="flex items-center">
                  <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
                  <span className="text-lg text-gray-800">
                    {data?.data.data.ratingsAverage}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={addProduct}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
            >
              {loader ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
