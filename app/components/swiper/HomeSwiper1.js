"use client";
import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Button from "../button/Button";

const HomeSwiper1 = () => {
  return (
    <Splide
      hasTrack={false}
      options={{
        type: "loop",
        perPage: 1,
        autoplay: true,
        interval: 3000,
      }}
    >
      <SplideTrack>
        <SplideSlide className="w-[50vw]  md:h-[50vh] h-[35vmax] flex items-center justify-center">
          <div className="swiperContent md:px-8 px-4 flex flex-col items-center z-10">
            <img
              className="object-cover object-center md:w-[80%] w-full"
              src="https://res.cloudinary.com/den1739gv/image/upload/v1743923259/creating_a_comprehensive_poster_for_a_shopping_website_featuring_multiple_skinnaa_products_on_a_whi_3d0dots76cndax8uszyn_0_bcszon.png"
              alt=""
            />
          </div>
        </SplideSlide>
        <SplideSlide className="w-full  md:h-[50vh] h-[35vmax] flex items-center justify-center">
          <div className="swiperContent flex items-center justify-center">
            <img
              className="object-cover object-center md:w-[80%] w-full"
              src="https://res.cloudinary.com/den1739gv/image/upload/v1743924044/image_3_znojhc.jpg"
              alt=""
            />
          </div>
        </SplideSlide>
        <SplideSlide className="w-full md:h-[50vh] h-[35vmax] flex items-center justify-center">
          <div className="swiperContent flex items-center justify-center">
            <img
              className="object-cover object-center md:w-[80%] w-full"
              src="https://res.cloudinary.com/den1739gv/image/upload/v1743923909/image_1_zqmibq.jpg"
              alt=""
            />
          </div>
        </SplideSlide>
      </SplideTrack>
    </Splide>
  );
};

export default HomeSwiper1;
