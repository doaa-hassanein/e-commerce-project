import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "./style.css";


import { FiChevronRight, FiChevronLeft } from "react-icons/fi"; // استيراد أيقونات أنيقة

// مكون السهم التالي
function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} slick-arrow slick-next`}
      onClick={onClick}
      aria-label="Next"
    >
      <FiChevronRight size={24} />
    </button>
  );
}


function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} slick-arrow slick-prev`}
      onClick={onClick}
      aria-label="Previous"
    >
      <FiChevronLeft size={24} />
    </button>
  );
}
export default function CatgorySlider() {
  async function getCategorySlider() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data } = useQuery("categorySlider", getCategorySlider);

  const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
  breakpoint: 480,
  settings: {
    slidesToShow: 1,
    arrows: true, 
  },
}
  ],
};

  return (
    <section className="p-2 md:p-4 relative"> 
      <Slider {...settings} className="mx-auto max-w-6xl">
        {data?.data.data.map((item, idx) => (
          <div key={idx} className="px-2 h-full">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 h-full flex flex-col">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 md:h-52 object-cover"
              />
              <div className="p-3 flex-1 flex items-center justify-center min-h-[70px]">
                <h2 className="text-green-600 font-semibold text-lg md:text-xl text-center line-clamp-2 truncate-2-lines">
                  {item.name}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}