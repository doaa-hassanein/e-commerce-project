import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext";
import { ImSpinner8 } from "react-icons/im";
import { BsCartPlus, BsHeartFill, BsStarFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";

function Products() {
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <ImSpinner8 className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading products!</div>;
  }

  const filteredProducts = data?.data?.data?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function addProduct(id) {
    try {
      const response = await addProductToCart(id);
      console.log(id);

      toast.success(response.message);
    } catch (error) {
      toast.error("Error adding product to cart");
    }
  }

  async function addToWishList(id) {
    try {
      const response = await addProductToWishList(id);
      toast.success(response.message);

      setWishlistedProducts((prev) => {
        const newSet = new Set(prev);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        return newSet;
      });
    } catch (error) {
      toast.error("Error adding product to wishlist");
    }
  }

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="w-[85%] mx-auto">
        <div className="mb-12">
          
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
    </section>
  );
}

export default Products;
