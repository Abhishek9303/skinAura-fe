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
        <SplideSlide className="w-[100vw] bg-red-300 md:h-[50vh] h-[30vmax] flex items-center justify-end">
          <div className="swiperContent px-8 flex flex-col items-end z-10 mr-12">
            <p className="whitespace-nowrap">#India's top trusted skin care platform.</p>
            <div className="flex items-center mt-5  justify-center gap-4">
            <h1 className="text-[3vmax] whitespace-nowrap leading-none font-juanaRegular">UNCOVER YOUR</h1>
            <h1 className=" text-[3vmax] whitespace-nowrap leading-none font-juanaSemibold"><i>SKIN’S</i></h1>
            </div>
            <h1 className="text-[3vmax] mb-8 whitespace-nowrap font-juanaRegular">ROOT CAUSE</h1>
            <Button text='Take A Test Now' className='rounded-full' />
            
          </div>
        </SplideSlide>
        <SplideSlide className="w-[100vw] bg-red-300 md:h-[50vh] h-[30vmax] flex items-center justify-end">
          <div className="swiperContent px-8 flex flex-col items-end z-10 mr-12">
            <p className="whitespace-nowrap">#India's top trusted skin care platform.</p>
            <div className="flex items-center mt-5  justify-center gap-4">
            <h1 className="text-[3vmax] whitespace-nowrap leading-none font-juanaRegular">UNCOVER YOUR</h1>
            <h1 className=" text-[3vmax] whitespace-nowrap leading-none font-juanaSemibold"><i>SKIN’S</i></h1>
            </div>
            <h1 className="text-[3vmax] mb-8 whitespace-nowrap font-juanaRegular">ROOT CAUSE</h1>
            <Button text='Take A Test Now' className='rounded-full' />
            
          </div>
        </SplideSlide>
        <SplideSlide className="w-[100vw] bg-red-300 md:h-[50vh] h-[30vmax] flex items-center justify-end">
          <div className="swiperContent px-8 flex flex-col items-end z-10 mr-12">
            <p className="whitespace-nowrap">#India's top trusted skin care platform.</p>
            <div className="flex items-center mt-5  justify-center gap-4">
            <h1 className="text-[3vmax] whitespace-nowrap leading-none font-juanaRegular">UNCOVER YOUR</h1>
            <h1 className=" text-[3vmax] whitespace-nowrap leading-none font-juanaSemibold"><i>SKIN’S</i></h1>
            </div>
            <h1 className="text-[3vmax] mb-8 whitespace-nowrap font-juanaRegular">ROOT CAUSE</h1>
            <Button text='Take A Test Now' className='rounded-full' />
            
          </div>
        </SplideSlide>
        
        
      </SplideTrack>
    </Splide>
  );
};

export default HomeSwiper1;
