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
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    dotsClass: 'slick-dots custom-dots',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6  h-[500px]">
          <div className="w-full md:w-2/3">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Slider {...settings}>
                {[slider3, slider2, slider1].map((slide, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={slide} 
                      alt={`slider-${index}`} 
                      className="w-full h-[300px] md:h-[500px] object-cover" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <div className="max-w-md">
                        <h3 className="text-xl md:text-3xl font-bold text-white mb-2">
                          {index === 0 ? "New Collections" : index === 1 ? "Special Offers" : "Season's New Arrivals"}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base">
                          {index === 0 ? "Discover the latest fashion trends this season" 
                           : index === 1 ? "Up to 50% off on selected collections" 
                           : "Browse our exclusive new collection"}
                        </p>
                        <button className="mt-4 px-6 py-2 bg-white text-green-600 font-medium rounded-full hover:bg-green-100 transition-all duration-300">
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-4 md:gap-6">
            <div className="relative rounded-xl overflow-hidden shadow-lg h-[48%] group">
              <img 
                src={slider4} 
                alt="side-banner-1" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Skincare Essentials</h3>
                  <p className="text-white/90 text-sm mb-3">Luxury products for your skin</p>
                  <button className="px-4 py-1.5 bg-white/90 text-gray-800 text-sm rounded-full hover:bg-white transition-all">
                    Discover More
                  </button>
                </div>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-lg h-[48%] group">
              <img 
                src={slider5} 
                alt="side-banner-2" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Makeup Tools</h3>
                  <p className="text-white/90 text-sm mb-3">Premium tools for a flawless look</p>
                  <button className="px-4 py-1.5 bg-white/90 text-gray-800 text-sm rounded-full hover:bg-white transition-all">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
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