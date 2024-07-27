"use client"
import Link from 'next/link';
import React from 'react';
import Button from '../button/Button';

const Product = (props) => {
  return (
    <>
      <div className="card relative mx-auto bg-white border-[1px] border-[#0000003b] shadow-md flex flex-col lg:w-[24vmax] md:w-[36vw] w-[65vw] h-min-[32vmax] rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <div className="h-[4.5vh] w-[35%] py-2 rounded-br-lg bg-[#897F7F80] flex items-center justify-center">
          <div className="flex">
            <span className="text-[12px]">⭐</span>
            <span className="text-[12px]">⭐</span>
            <span className="text-[12px]">⭐</span>
            <span className="text-[12px]">⭐</span>
            <span className="text-[12px]">⭐</span>
          </div>
        </div>
        <div className="flex flex-col mx-auto py-1 mb-2 items-center justify-around">
          <h1 className="font-semibold py-3 text-xl text-gray-800">
            {props.name ? props.name : "Product Name"}
          </h1>
          <Link href={"/products/" + props.id}>
            <div className="w-[16vmax] h-[18vmax] rounded-md mb-3 bg-gray-200">
              {/* img */}
            </div>
          </Link>
          <div className="text-center py-2">
            <h1 className="font-bold py-1 mb-2 text-xl text-gray-800">
              {props.name ? props.name : " $ 501/-"}
            </h1>
            <div className="h-[0.15vh] bg-black mb-1"></div>
            <p className="text-sm py-1 text-gray-600">
              {props.tagline
                ? props.tagline
                : "Better skin quality with natural herbs"}
            </p>
            <br />
            <div className="w-full mx-auto flex items-center justify-center ">
              <Button text="Buy Now" className="rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
