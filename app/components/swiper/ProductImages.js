"use client";
import React, { useState, useEffect } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const ProductImages = ({ productImages, otherImages, height = "60vh" }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setZoom(1);
    }
  }, [isFullScreen]);

  const handleImageClick = (image) => {
    setFullScreenImage(image);
    setIsFullScreen(true);
  };

  const handleMouseMove = (e) => {
    if (zoom > 1) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setPosition({ x, y });
    }
  };

  const allImages = [productImages, ...(otherImages || [])].filter(Boolean);

  return (
    <>
      <div className="w-full h-full relative group">
        <Splide
          hasTrack={false}
          options={{
            type: "fade",
            perPage: 1,
            rewind: true,
            pagination: true,
            arrows: true,
          }}
          className="h-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100"
        >
          <SplideTrack className="h-full">
            {allImages.map((image, index) => (
              <SplideSlide key={index} className="h-full flex items-center justify-center">
                <div 
                  className="w-full h-full cursor-zoom-in relative"
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SplideSlide>
            ))}
          </SplideTrack>

          <div className="splide__arrows absolute inset-0 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <button className="splide__arrow splide__arrow--prev !bg-white/80 !w-10 !h-10 !rounded-full !shadow-lg !-left-4 !backdrop-blur">
              <svg className="w-4 h-4 text-[#6A4D6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button className="splide__arrow splide__arrow--next !bg-white/80 !w-10 !h-10 !rounded-full !shadow-lg !-right-4 !backdrop-blur">
              <svg className="w-4 h-4 text-[#6A4D6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          <ul className="splide__pagination !bottom-6 scale-110"></ul>
        </Splide>

        {/* Brand Badge */}
        <div className="absolute top-4 left-4 bg-white/60 backdrop-blur-md px-3 py-1 rounded-full z-10">
          <span className="text-[9px] font-juanaBold text-[#6A4D6F] uppercase tracking-widest">Premium Care</span>
        </div>
      </div>

      {isFullScreen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-md flex items-center justify-center overflow-hidden transition-all duration-300"
          onClick={() => setIsFullScreen(false)}
        >
          <button 
            className="absolute top-8 right-8 text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all duration-300 hover:rotate-90 z-[10000]"
            onClick={() => setIsFullScreen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div 
            className="relative w-full h-full flex items-center justify-center cursor-crosshair overflow-hidden"
            onClick={(e) => {
              e.stopPropagation();
              setZoom(zoom === 1 ? 2.8 : 1);
            }}
            onMouseMove={handleMouseMove}
          >
            <img
              src={fullScreenImage}
              alt="Zoomed view"
              className={`max-w-[85%] max-h-[85%] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] select-none drop-shadow-2xl ${zoom > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: `${position.x}% ${position.y}%`,
              }}
            />
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
              <span className="text-white/80 text-[10px] font-juanaMedium tracking-[0.2em] uppercase">
                {zoom > 1 ? 'Drag to explore' : 'Click to zoom in'} • Scroll to pan
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImages;
