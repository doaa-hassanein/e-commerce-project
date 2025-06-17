import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CatgorySlider() {


    async function getCategorySlider() {

        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")

    }

    const { data } = useQuery("categorySlider", getCategorySlider)

    console.log(data);


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
    };
    return (
        <section className="p-5">
            <Slider {...settings}>
                {/* data from api using react quary */}

                {data?.data.data.map(function (item, idx) {
                    return <div key={idx}>
                        <img src={item.image} alt="" className="w-full h-[220px]" />
                        <h2 className="text-green-600 font-semibold text-2xl text-center">{item.name}</h2>

                    </div>


                })}
            </Slider>
        </section>
    );
}