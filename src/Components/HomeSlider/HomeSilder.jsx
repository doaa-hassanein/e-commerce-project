import React from "react";
import Slider from "react-slick";
import slider1 from "./../../assets/images/slider 1.webp"
import slider2 from "./../../assets/images/slider-image-2.jpeg"
import slider3 from "./../../assets/images/blog-img-2.jpeg"
import slider4 from "./../../assets/images/blog-img-1.jpeg"
import slider5 from "./../../assets/images/slider2.jpg"

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        // autoplaySpeed: 300,
        dotsClass:'slick-dots'


    };
    return (

        <section className="py-5 px-4">
            <div className=" flex flex-wrap justify-center items-center">

                <div className="w-2/3">

                    <Slider {...settings}>
                        <div>
                            <img src={slider5} alt="slider1" className="w-full h-[500px]" />
                        </div>
                        <div>
                            <img src={slider2} alt="slider1" className="w-full h-[500px]" />
                        </div>
                        <div>
                            <img src={slider3} alt="slider1" className="w-full h-[500px]" />
                        </div>


                    </Slider>

                </div>

                <div className="w-1/3">
                    <div>
                        <img src={slider4} alt="slider4" className="w-full  block h-[250px]" />
                    </div>
                    <div>
                        <img src={slider1} alt="slider5" className="w-full block h-[250px]" />
                    </div>

                </div>


            </div>
        </section>

    );
}