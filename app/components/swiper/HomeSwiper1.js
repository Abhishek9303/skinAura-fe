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
        <SplideSlide className="w-[50vw]  md:h-[50vh] h-[40vmax] flex items-center justify-center">
          <div className="swiperContent md:px-8 px-4 flex flex-col items-center z-10">
            <img
              className="object-cover object-center h-full "
              src="https://ik.imagekit.io/9xqqzmzt4/FineAura/HomePage/Gemini_Generated_Image_87a40o87a40o87a4.webp?updatedAt=1772908452230"
              alt=""
            />
          </div>
        </SplideSlide>

        <SplideSlide className="w-full md:h-[50vh] h-[35vmax] flex items-center justify-center">
          <div className="swiperContent flex items-center justify-center">
            <img
              className="object-cover object-center h-full"
              src="https://ik.imagekit.io/9xqqzmzt4/FineAura/HomePage/Gemini_Generated_Image_dkpiaodkpiaodkpi.webp?updatedAt=1772908452337"
              alt=""
            />
          </div>
        </SplideSlide>
         <SplideSlide className="w-full md:h-[50vh] h-[35vmax] flex items-center justify-center">
          <div className="swiperContent flex items-center justify-center">
            <img
              className="object-cover object-center h-full"
              src="https://ik.imagekit.io/9xqqzmzt4/FineAura/HomePage/Gemini_Generated_Image_bjvrz3bjvrz3bjvr.webp?updatedAt=1772908452041"
              alt=""
            />
          </div>
        </SplideSlide>
         <SplideSlide className="w-full md:h-[50vh] h-[35vmax] flex items-center justify-center">
          <div className="swiperContent flex items-center justify-center">
            <img
              className="object-cover object-center h-full"
              src="https://ik.imagekit.io/9xqqzmzt4/FineAura/HomePage/geminiimages.webp?updatedAt=1772908451073"
              alt=""
            />
          </div>
        </SplideSlide>
      </SplideTrack>
    </Splide>
  );
};

export default HomeSwiper1;
