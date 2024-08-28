import axios from "axios";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import HomeSlider from "../HomeSlider/HomeSilder";
import CatgorySlider from "../CategorySlider/CatgorySlider";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext";

function Products() {
  const { addProductToWishList, wishlist } = useContext(wishListContext);
  const { addProductToCart } = useContext(cartContext);

  const [wishlistedProducts, setWishlistedProducts] = useState(
    new Set(wishlist)
  );
  /////////////////////////////////////////////// search ////////////////////////////////////////////

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setWishlistedProducts(new Set(wishlist));
  }, [wishlist]);

  async function getProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, error } = useQuery("products", getProducts);
  console.log("products ", data);

  if (isLoading) {
    return (
      <div className="h-screen bg-teal-500 flex flex-wrap justify-center items-center">
        <Bars
          height="80"
          width="80"
          color="#fff"
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error loading products!</div>;
  }

  /////////////////////////////////////////////// search ////////////////////////////////////////////

  // filter products based on search term
  const filteredProducts = data?.data?.data?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function addProduct(id) {
    try {
      const response = await addProductToCart(id);
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
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    } catch (error) {
      toast.error("Error adding product to wishlist");
    }
  }

  return (
    <>
      <section className="py-8">
        <div className="w-full md:w-[90%] m-auto">
          <HomeSlider />
          <CatgorySlider />

          <div className="mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // updata incoming value
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-[80%] mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 mt-10"
              placeholder="search......"
              required
            />
          </div>

          <div className="flex flex-wrap justify-center items-center my-10 gap-4">
            {filteredProducts?.map((item) => (
              <div
                className="sm:w-1/2 md:w-1/3 lg:w-1/5 p-4 product-card gap-2"
                key={item.id}
              >
                <div className="inner p-3 ">
                  <Link to={`/productDetails/${item.id}`}>
                    <img src={item.imageCover} alt="img" className="w-full" />
                    <h2 className="text-teal-500 mt-3">{item.category.name}</h2>
                    <h2 className="mt-3 font-medium">
                      {item.title.split(" ").slice(0, 2).join(" ")}
                    </h2>

                    <div className="flex flex-wrap justify-between items-center mt-2">
                      <div>
                        <h4>{item.price} EGP</h4>
                      </div>
                      <div>
                        <h4>
                          <i className="fa-solid fa-star text-yellow-400 mr-2"></i>
                          {item.ratingsAverage}
                        </h4>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => addProduct(item.id)}
                    className="focus:outline-none text-white bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full mt-3"
                  >
                    Add to cart
                  </button>

                  <div className="flex flex-wrap justify-center items-center">
                    <button
                      onClick={() => addToWishList(item.id)}
                      className={`text-3xl mt-2 ${
                        wishlistedProducts.has(item.id)
                          ? "text-red-600"
                          : "text-gray-800"
                      }`}
                    >
                      <i className="fa-solid fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
