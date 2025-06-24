import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiChevronDown, FiChevronRight, FiChevronUp } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      return data.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  async function getSubcategories(categoryId) {
    if (!categoryId) return [];
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );
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

  const toggleCategory = async (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
      setSelectedCategory(null);
    } else {
      newExpanded.clear();
      newExpanded.add(categoryId);
      setSelectedCategory(categoryId);
      try {
        const subs = await getSubcategories(categoryId);
        setSubcategories(subs);
      } catch (err) {
        console.error("Error loading subcategories:", err);
      }
    }
    setExpandedCategories(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <ImSpinner8 className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-xl font-medium text-red-600">
            Failed to load categories
          </h2>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
   <div className="bg-gray-50 min-h-screen py-10">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap items-center justify-center mb-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="font-bold text-center text-3xl tracking-wide text-green-600">
          Browse Our Collections
        </h1>
      </motion.div>
    </div>

    {/* Categories Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoriesData?.map((category) => (
        <div key={category._id} className="relative group">
          {/* Category Card */}
          <div
            className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
            onClick={() => toggleCategory(category._id)}
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h2 className="text-lg font-medium text-white">
                  {category.name}
                </h2>
              </div>
            </div>
          </div>

          {/* Subcategories Slide-out Panel */}
          <AnimatePresence>
            {expandedCategories.has(category._id) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-2 p-4 bg-gray-50 rounded-b-xl"
              >
                {subcategories.map((sub) => (
                  <motion.div
                    key={sub._id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={`/products?subcategory=${sub._id}`}
                      className="block px-3 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-center hover:bg-green-50 border-2 border-green-600"
                    >
                      <span className="text-base font-medium text-gray-800 hover:text-green-600">
                        {sub.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default Categories;
