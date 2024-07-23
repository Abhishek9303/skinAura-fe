"use client";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
const ReviewSwiper = () => {
  return (
    <>
      <Splide
      options={{perPage: 3, gap:"10px",breakpoints:{1024:{perPage: 3},640:{perPage:1}}}}
        className="w-[80vw] h-[50vh]"
      >
        <SplideSlide className="flex bg-gray-400 items-center justify-center h-[50vh] mx-3">
          Text 01
        </SplideSlide>
        <SplideSlide className="flex bg-gray-400 items-center justify-center h-[50vh]">
          Text 02
        </SplideSlide>
        <SplideSlide className="flex bg-gray-400 items-center justify-center h-[50vh]">
          Text 03
        </SplideSlide>
        <SplideSlide className="flex bg-gray-400 items-center justify-center h-[50vh]">
          Text 04
        </SplideSlide>
      </Splide>
    </>
  );
};

export default ReviewSwiper;
