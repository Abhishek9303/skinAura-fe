"use client"
import Link from 'next/link';
import React from 'react';
import Button from '../button/Button';

const Product = (props) => {
  return (
    <>
      <div className="card relative mx-auto bg-white border-[1px] border-[#0000003b] shadow-md flex flex-col lg:w-[24vmax] md:w-[50vmax] lm:w-[28vmax]  mm:w-[25vmax] xs:w-[22vmax] h-min-[25vmax] rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <div className="md:h-[4.5vh] md:w-[35%] md:py-2 py-1 md:rounded-br-lg bg-[#897F7F80] flex items-center justify-center">
          <div className="flex">
            <span className="md:text-[12px] text-[10px]">⭐</span>
            <span className="md:text-[12px] text-[10px]">⭐</span>
            <span className="md:text-[12px] text-[10px]">⭐</span>
            <span className="md:text-[12px] text-[10px]">⭐</span>
            <span className="md:text-[12px] text-[10px]">⭐</span>
          </div>
        </div>
        <div className="flex flex-col mx-auto py-1 md:mb-2 mb-1 items-center justify-around">
          <h1 className="font-semibold xs:hidden md:block md:py-3 py-2 text-center text-sm md:text-xl text-gray-800">
            {props.name ? props.name : "Product Name"}
          </h1>
          <Link href={"/products/" + props.id}>
            <div className="md:w-[16vmax] md:h-[18vmax] mx-1 m-1 lm:w-[24vmax] w-[20vmax] min-h-[15vmax] rounded-md md:mb-3 bg-gray-200">
              {/* img */}
            </div>
          </Link>
          <div className="text-center md:py-2">
          <p className="font-semibold xs:block md:hidden md:py-3 px-2 text-center text-[1.4vmax] mt-[1vmax] md:text-xl text-gray-800">
          {props.tagline
                ? props.tagline
                : "Better skin quality with natural herbs"}
          </p>
            <h1 className="font-bold md:py-1 md:mb-2 text-sm md:text-xl text-gray-800">
              {props.name ? props.name : " $ 501/-"}
            </h1>
            <div className="h-[0.15vh] md:block xs:hidden bg-black mb-1"></div>
            <p className="text-sm py-1 md:block xs:hidden text-gray-600">
              {props.tagline
                ? props.tagline
                : "Better skin quality with natural herbs"}
            </p>
            <div className="w-full mx-auto mt-3 flex items-center justify-center ">
              <Button text="Buy Now" className="rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
