import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "./../Modal/Modal";
import { motion } from "framer-motion";
import { ImSpinner8 } from "react-icons/im";

function Brands() {
  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
    
  

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  async function getBrands() {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    return response.data; // نرجع .data عشان يسهل استخدامها
  }

  const { data, isLoading, isError, error } = useQuery("brands", getBrands);

  // اطبع البيانات في الكونسول أول ما تتجاب
  useEffect(() => {
    if (data) {
      console.log("Brands Data:", data);
    }
  }, [data]);

  if (isLoading) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-white">
         <ImSpinner8 className="animate-spin text-4xl text-green-600" />
       </div>
     );
   }
 
  if (isError) {
    return (
      <div className="text-center text-red-600 mt-10">
        Error: {error.message}
      </div>
    );
  }

  return (
    <>
      <section className="py-6 bg-gray-50">
  <div className="w-full md:w-full mx-auto">
    <div className="flex flex-wrap items-center justify-center mb-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="font-bold text-center text-3xl tracking-wide text-green-600">
          All Brands
        </h1>
      </motion.div>
    </div>

    <div className="flex flex-wrap justify-center items-center gap-6 my-6">
      {data?.data?.length > 0 ? (
        data.data.map((item, idx) => (
          <div
            className="sm:w-1/2 md:w-1/3 lg:w-1/5 p-3 product-card border border-gray-300 rounded-md cursor-pointer"
            key={idx}
            onClick={() =>
              openModal(
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <div>
                    <h2 className="text-green-500 text-center text-2xl mt-2">
                      {item.name}
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <img
                      src={item.image}
                      alt="img"
                      className="w-full max-w-[180px] mx-auto"
                    />
                  </div>
                </div>
              )
            }
          >
            <div className="inner p-2">
              <img
                src={item.image}
                alt="img"
                className="w-full max-h-32 object-contain"
              />
              <h2 className="text-green-500 text-center text-lg mt-2">
                {item.name}
              </h2>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-base">
          No brands found.
        </p>
      )}
    </div>
  </div>
</section>

<Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />

    </>
  );
}

export default Brands;
