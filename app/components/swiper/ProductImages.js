"use client";
import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
const ProductImages = (props) => {
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
        <SplideSlide className={`w-[100vw] bg-red-300 lg:h-[${props.height}] h-[40vh] flex items-center justify-center`}>
          Text 01
        </SplideSlide>
       
      </SplideTrack>
    </Splide>
  );
};

export default ProductImages;
