import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import HomeSlider from "../HomeSlider/HomeSilder";
import CatgorySlider from "../CategorySlider/CatgorySlider";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext";
import { ImSpinner8 } from "react-icons/im";
import { FiSearch, FiHeart } from "react-icons/fi";
import { BsHeartFill, BsCartPlus, BsStarFill } from "react-icons/bs";

function Home() {
  const { addProductToWishList, wishlist } = useContext(wishListContext);
  const { addProductToCart } = useContext(cartContext);

  const [wishlistedProducts, setWishlistedProducts] = useState(
    new Set(wishlist)
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setWishlistedProducts(new Set(wishlist));
  }, [wishlist]);

  async function getProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, error } = useQuery("products", getProducts);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ImSpinner8 className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
        Error loading products!
      </div>
    );
  }

  const filteredProducts = data?.data?.data?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function addProduct(id) {
    try {
      const response = await addProductToCart(id);
      toast.success(response.message, {
        style: {
          borderRadius: "8px",
          background: "#fff",
          color: "#333",
        },
      });
    } catch (error) {
      toast.error("Error adding product to cart", {
        style: {
          borderRadius: "8px",
          background: "#fff",
          color: "#333",
        },
      });
    }
  }

  async function addToWishList(id) {
    try {
      const response = await addProductToWishList(id);
      toast.success(response.message, {
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
      });

      setWishlistedProducts((prev) => {
        const newSet = new Set(prev);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        return newSet;
      });
    } catch (error) {
      toast.error("Error adding product to wishlist", {
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="w-[85%] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Hero Slider */}
        <div className="mb-10 rounded-xl overflow-hidden shadow-md">
          <HomeSlider />
        </div>

        {/* Category Slider */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <CatgorySlider />
        </div>

        {/* Search Bar */}
        <div className="relative mb-10 max-w-sm mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400 text-sm" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            placeholder="Search products..."
          />
        </div>

        {/* Products Grid */}

        <div className="">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Featured Products
          </h2>
          {filteredProducts?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base">
                No products found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

              {filteredProducts?.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
                >
                  <Link
                    to={`/productDetails/${item.id}`}
                    className="block flex-grow"
                  >
                    <div className="relative pb-[120%]">
                      <img
                        src={item.imageCover}
                        alt={item.title}
                        className="absolute h-full w-full object-cover"
                      />
                    </div>
                    <div
                      className="p-3 flex flex-col"
                      style={{ minHeight: "150px" }}
                    >
                      <span className="text-sm font-bold text-green-600 uppercase tracking-wider">
                        {item.category.name}
                      </span>
                      <h3 className="mt-2 text-sm font-medium text-gray-900 line-clamp-2 flex-grow">
                        {item.category.name.split(" ").slice(0, 2).join(" ")}
                      </h3>

                      <div className="mt-auto pt-3 flex justify-between items-center">
                        <span className="text-gray-900 font-semibold text-sm">
                          {item.price} EGP
                        </span>
                        <div className="flex items-center bg-gray-100 px-2 py-1 rounded ">
                          <BsStarFill className="text-yellow-400 mr-1" />
                          <span className="text-gray-600 text-sm font-semibold">
                            {item.ratingsAverage}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="px-5 pb-4 mt-auto">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => addProduct(item.id)}
                        className="flex-1 flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 mr-3 text-sm sm:text-base"
                      >
                        <BsCartPlus className="mr-2" />
                        Add to Cart
                      </button>

                      <button
                        onClick={() => addToWishList(item.id)}
                        className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Add to wishlist"
                      >
                        {wishlistedProducts.has(item.id) ? (
                          <BsHeartFill className="text-red-500 text-xl" />
                        ) : (
                          <FiHeart className="text-gray-500 text-xl hover:text-red-500 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
