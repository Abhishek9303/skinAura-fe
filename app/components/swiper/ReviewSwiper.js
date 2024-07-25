"use client";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
const ReviewSwiper = (props) => {
  return (
    <>
      <Splide
        options={{
          type:'loop',
          perPage: `${props?.perPage ? props.perPage : 4}`,
          gap: "10px",
          breakpoints: {
            1024: { perPage: 8 },
            640: { perPage: 1 },
          },
        }}
        className="w-[80vw] "
      >
        <SplideSlide className="flex bg-gray-400 items-center justify-center h-[60vh] ">
          Text 01
        </SplideSlide>
        <SplideSlide className="flex bg-gray-400 items-center justify-center h-[60vh]">
          Text 02
        </SplideSlide>
        <SplideSlide className="flex bg-gray-400 items-center justify-center h-[60vh]">
          Text 03
        </SplideSlide>
        <SplideSlide className="flex bg-gray-400 items-center justify-center h-[60vh]">
          Text 04
        </SplideSlide>
        <SplideSlide className="flex bg-gray-400 items-center justify-center h-[60vh]">
          Text 05
        </SplideSlide>
        <SplideSlide className="flex bg-gray-400 items-center justify-center h-[60vh]">
          Text 06
        </SplideSlide>
        <SplideSlide className="flex bg-gray-400 items-center justify-center h-[60vh]">
          Text 07
        </SplideSlide>
      </Splide>
    </>
  );
};

export default ReviewSwiper;
