import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "./style.css";
export default function CatgorySlider() {
  async function getCategorySlider() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data } = useQuery("categorySlider", getCategorySlider);

  console.log(data);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="p-2 md:p-5">
      <Slider {...settings} className="mx-auto max-w-7xl">
        {data?.data.data.map(function (item, idx) {
          return (
            <div key={idx} className="px-2 h-full">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 h-full flex flex-col">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 md:h-64 lg:h-72 object-cover"
                />
                <div className="p-4 flex-1 flex items-center justify-center min-h-[80px]">
                  <h2 className="text-green-600 font-semibold text-xl md:text-2xl text-center line-clamp-2 truncate-2-lines">
                    {item.name}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
