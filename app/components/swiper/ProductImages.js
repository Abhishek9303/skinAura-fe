"use client";
import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const ProductImages = (props) => {
  const renderOtherImages = () => {
    return props.otherImages.map((image, index) => (
      <SplideSlide
        key={index}
        className={`w-[100vw] lg:h-[${props.height}] h-[40vh] flex items-center justify-center`}
      >
        <img src={image} alt={`Product image ${index + 1}`} />
      </SplideSlide>
    ));
  };

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
        <SplideSlide
          className={`w-[100vw] lg:h-[${props.height}] h-[40vh] flex items-center justify-center`}
        >
          <img src={`${props.productImages}`} alt="Main product image" />
        </SplideSlide>
        {renderOtherImages()}
      </SplideTrack>
    </Splide>
  );
};

export default ProductImages;
