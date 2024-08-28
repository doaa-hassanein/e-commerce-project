import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import Modal from "./../Modal/Modal";

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
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading } = useQuery("products", getBrands);

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

  return (
    <>
      <section className="py-8">
        <div className="w-full md:w-[100%] m-auto">
          <h1 className="text-teal-600 font-semibold text-6xl text-center">
            All Brands
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-8 my-10">
            {data.data.data.map((item, idx) => (
              <div
                className="sm:w-1/2 md:w-1/3 lg:w-1/5 p-4 product-card border border-gray-300 rounded-md cursor-pointer"
                key={idx}
                onClick={() =>
                  openModal(
                    <div className="flex flex-wrap justify-center items-center gap-6 ">
                      <div>
                        <h2 className="text-teal-500 text-center text-4xl mt-2 ">
                          {item.name}
                        </h2>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          {item.name}
                        </p>
                      </div>

                      <div>
                        <img
                          src={item.image}
                          alt="img"
                          className="w-[90%] mx-auto"
                        />
                      </div>
                    </div>
                  )
                }
              >
                <div className="inner p-3">
                  <img src={item.image} alt="img" className="w-full" />
                  <h2 className="text-teal-500 text-center text-2xl mt-3">
                    {item.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
    </>
  );
}

export default Brands;
