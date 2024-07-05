"use client";
import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
const HomeSwiper1 = () => {
  return (
    <Splide hasTrack={false}>
      <SplideTrack>
        <SplideSlide className="w-[100vw] bg-red-300 h-[50vh] flex items-center justify-center">
          Text 01
        </SplideSlide>
        <SplideSlide className="w-[100vw] bg-red-300 h-[50vh] flex items-center justify-center">
          Text 02
        </SplideSlide>
        <SplideSlide className="w-[100vw] bg-red-300 h-[50vh] flex items-center justify-center">
          Text 03
        </SplideSlide>
      </SplideTrack>
    </Splide>
  );
};

export default HomeSwiper1;
