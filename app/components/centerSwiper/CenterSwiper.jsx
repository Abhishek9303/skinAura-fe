"use client";
import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const CenterSwiper = () => {
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
            <SplideSlide className="w-full bg-red-300 md:h-[40vmax] h-[30vmax] rounded-2xl flex items-center justify-center">
            <h1 className="text-[3vmax]">Center 1</h1>
            </SplideSlide>
            <SplideSlide className="w-full bg-red-300 md:h-[40vmax] h-[30vmax] rounded-2xl flex items-center justify-center">
            <h1 className="text-[3vmax]">Center 1</h1>
            </SplideSlide>
            <SplideSlide className="w-full bg-red-300 md:h-[40vmax] h-[30vmax] rounded-2xl flex items-center justify-center">
            <h1 className="text-[3vmax]">Center 1</h1>
            </SplideSlide>
            <SplideSlide className="w-full bg-red-300 md:h-[40vmax] h-[30vmax] rounded-2xl flex items-center justify-center">
            <h1 className="text-[3vmax]">Center 1</h1>
            </SplideSlide>
          </SplideTrack>
        </Splide>
      );
}

export default CenterSwiper