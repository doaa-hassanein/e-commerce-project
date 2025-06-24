import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from "./../../assets/images/6.webp";
import slider2 from "./../../assets/images/aavif.avif";
import slider3 from "./../../assets/images/slider 1.webp";
import slider4 from "./../../assets/images/9.avif";
import slider5 from "./../../assets/images/makeup-brush-set.jpg";

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    fade: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    dotsClass: "slick-dots custom-dots",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="py-4 px-2 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 h-auto md:h-[400px]">
          {/* Main Slider */}
          <div className="w-full md:w-2/3">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Slider {...settings}>
                {[slider3, slider2, slider1].map((slide, index) => (
                  <div key={index} className="relative">
                    <img
                      src={slide}
                      alt={`slider-${index}`}
                      className="w-full h-[160px] sm:h-[240px] md:h-[400px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-4">
                      <div className="max-w-sm">
                        <h3 className="text-sm sm:text-base md:text-xl font-bold text-white mb-1">
                          {index === 0
                            ? "New Collections"
                            : index === 1
                            ? "Special Offers"
                            : "Season's New Arrivals"}
                        </h3>
                        <p className="text-white/90 text-xs sm:text-sm">
                          {index === 0
                            ? "Discover the latest fashion trends"
                            : index === 1
                            ? "Up to 50% off selected items"
                            : "Browse our new arrivals"}
                        </p>
                        <button className="mt-2 px-3 py-1 bg-white text-green-600 text-xs rounded-full hover:bg-green-100 transition-all duration-300">
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Side Banners */}
          <div className="w-full md:w-1/3 flex flex-col gap-3 md:gap-5 mt-3 md:mt-0">
            {[slider4, slider5].map((slide, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden shadow-md h-[150px] md:h-[48%] group"
              >
                <img
                  src={slide}
                  alt={`side-banner-${i}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 flex items-end p-2 md:p-3">
                  <div>
                    <h3 className="text-xs md:text-sm font-bold text-white mb-1">
                      {i === 0 ? "Skincare" : "Makeup Tools"}
                    </h3>
                    <p className="text-white/90 text-[10px] md:text-xs mb-1">
                      {i === 0
                        ? "Luxury for your skin"
                        : "Tools for a flawless look"}
                    </p>
                    <button className="px-2 py-1 bg-white/90 text-gray-800 text-[10px] md:text-xs rounded-full hover:bg-white transition-all">
                      {i === 0 ? "More" : "View"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Custom Arrow Components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} next-arrow`}
      style={{ ...style, display: "block", right: "20px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} prev-arrow`}
      style={{ ...style, display: "block", left: "20px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};
