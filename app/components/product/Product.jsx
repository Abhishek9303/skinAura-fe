"use client";
import Link from "next/link";
import React from "react";
import Button from "../button/Button";
import RazorpayCheckout from "../../razorpay/RazorpayCheckout"; // Ensure the path is correct

const Product = (props) => {
  return (
    <>
      <div className="card relative mx-auto bg-white border-[1px] border-[#0000003b] shadow-md flex flex-col xs:min-w-[21vmax] h-min-[25vmax] rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <div className="md:h-[4.5vh] md:w-[40%] md:py-2 md:px-1 py-1 md:rounded-br-lg bg-[#897F7F80] flex items-center justify-center">
          <div className="flex">
            <span className="md:text-[12px] text-[2vmax]">⭐</span>
            <span className="md:text-[12px] text-[2vmax]">⭐</span>
            <span className="md:text-[12px] text-[2vmax]">⭐</span>
            <span className="md:text-[12px] text-[2vmax]">⭐</span>
            <span className="md:text-[12px] text-[2vmax]">⭐</span>
          </div>
        </div>
        <div className="flex flex-col mx-auto py-1 md:mb-2 mb-1 items-center justify-around">
          <Link href={"/products/" + props.id}>
            <div className="min-w-[18vmax] min-h-[16vmax] m-2 rounded-md bg-gray-200">
              {/* img */}
            </div>
          </Link>
          <div className="text-center md:py-2">
            <p className="font-medium md:py-1 px-2 text-center text-[1.4vmax] lg:text-[1vmax] text-wrap text-gray-800">
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
            <div className="w-full mx-auto mt-3 flex items-center justify-center">
              <RazorpayCheckout productId={props.id} name={props.name} amount={5000} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
