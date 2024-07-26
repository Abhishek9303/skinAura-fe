"use client";
import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import GoogleRiviewCard from "../googleRiviewCard/GoogleRiviewCard";

const GoogleReviewSwiper = () => {
  return (
    <Splide
      hasTrack={false}
      options={{
        type: "loop",
        perPage: 3,
        autoplay: true,
        interval: 3000,
        focus: 'center',
        gap: '1rem',
      }}
    >
      <SplideTrack>
        <SplideSlide className="bg-red-300 h-auto rounded-2xl flex items-center justify-center">
          <GoogleRiviewCard reviewer={"Abhay"} />
        </SplideSlide>
        <SplideSlide className="bg-red-300 h-auto rounded-2xl flex items-center justify-center">
          <GoogleRiviewCard reviewer={"Abhay"} />
        </SplideSlide>
        <SplideSlide className="bg-red-300 h-auto rounded-2xl flex items-center justify-center">
          <GoogleRiviewCard reviewer={"Abhay"} />
        </SplideSlide>
        {/* Add more slides as needed */}
      </SplideTrack>
    </Splide>
  );
};

export default GoogleReviewSwiper;
