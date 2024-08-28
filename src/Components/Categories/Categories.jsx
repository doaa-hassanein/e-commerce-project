import axios from "axios";
import { useQuery } from "react-query";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useState } from "react";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      console.log("Categories Data:", data.data);
      console.log("doaa");

      return data.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  async function getSubcategories(categoryId) {
    if (!categoryId) {
      console.error("Category ID is undefined or invalid.");

      return [];
    }
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );
      console.log("Subcategories Data:", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      throw error;
    }
  }

  const {
    data: categoriesData,
    isLoading,
    error,
  } = useQuery("categories", getCategories);

  const handleCategoryClick = async (categoryId) => {
    if (!categoryId) {
      console.error("Invalid category ID:", categoryId);
      return;
    }
    setSelectedCategory(categoryId);
    try {
      const subcategories = await getSubcategories(categoryId);
      setSubcategories(subcategories);
    } catch (error) {
      console.error("Error handling category click:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-teal-700 flex flex-wrap justify-center items-center">
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
    return <div>Error loading categories!</div>;
  }

  return (
    <>
      <section className="py-8">
        <div className="w-full md:w-[100%] m-auto">
          <div className="flex flex-wrap justify-center items-center my-10 gap-10">
            {categoriesData?.map((item, idx) => (
              <div
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 product-card"
                key={idx}
              >
                <div className="flex flex-col items-center h-full bg-white shadow-md rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleCategoryClick(item._id)} // category id
                    className="w-full h-full flex flex-wrap"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-80 object-cover"
                    />

                    <div className=" flex flex-col categoryTitle mx-auto">
                    <h2 className="text-teal-600 my-6 text-center text-3xl font-semibold flex-grow">
                      {item.name}
                    </h2>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedCategory && (
            <section className="py-8">
              <div className="w-full md:w-[100%] m-auto">
                <h2 className="text-center text-5xl font-bold mb-4 text-teal-500">
                  {/* اسم ال Subcategories */}
                  Subcategories
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {subcategories.map((sub, idx) => (
                    <div
                      className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 "
                      key={idx}
                    >
                      <div className="flex flex-col items-center bg-white border border-gray-200 py-4 rounded-lg product-card">
                        <div className=" flex flex-col">
                          <h3 className=" my-3 text-center text-3xl font-semibold text-gray-900">
                            {sub.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}

export default Categories;
