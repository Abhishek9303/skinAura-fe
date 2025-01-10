"use client";
import React, { useState, useEffect } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const ProductImages = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isFullScreen]);

  const handleImageClick = (image) => {
    setFullScreenImage(image);
    setIsFullScreen(true);
  };

  const handleZoom = (event) => {
    const zoomLevel = event.deltaY > 0 ? zoom - 0.1 : zoom + 0.1;
    setZoom(Math.min(Math.max(zoomLevel, 1), 3));
  };

  const handleMouseMove = (event) => {
    if (zoom > 1) {
      const rect = event.target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setOffset({ x, y });
    }
  };

  const renderOtherImages = () => {
    return props.otherImages.map((image, index) => (
      <SplideSlide
        key={index}
        className={`w-[100vw] lg:h-[${props.height}] h-[40vh] flex items-center justify-center`}
      >
        <img
          src={image}
          alt={`Product image ${index + 1}`}
          className="object-cover object-center cursor-pointer"
          onClick={() => handleImageClick(image)}
        />
      </SplideSlide>
    ));
  };

  return (
    <>
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
            <img
              src={`${props.productImages}`}
              alt="Main product image"
              className="object-cover object-top"
              onClick={() => handleImageClick(props.productImages)}
            />
          </SplideSlide>
          {renderOtherImages()}
        </SplideTrack>
      </Splide>
      {isFullScreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onWheel={handleZoom}>
          <div className="relative w-4/5 h-4/5" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-white text-2xl cursor-pointer z-30"
              onClick={() => setIsFullScreen(false)}
            >
              &times;
            </button>
            <img
              src={fullScreenImage}
              alt="Full screen product"
              className="w-full h-full object-contain"
              style={{ transform: `scale(${zoom})`, transformOrigin: `${offset.x}% ${offset.y}%` }}
              onMouseMove={handleMouseMove}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImages;
