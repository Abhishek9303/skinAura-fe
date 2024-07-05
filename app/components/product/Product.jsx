"use client"
import Link from 'next/link';
import React from 'react'

const Product = (props) => {
  return (
    <>
      <div className="w-[80vw] lg:w-[20vw] bg-[#D9D9D9]">
        <div className="h-[4.5vh] w-[35vw] lg:h-[4.5vh] lg:w-[8vw] bg-[#897F7F80] flex items-center justify-center">
          <div>
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
          </div>
        </div>
        <div className="flex flex-col py-5 items-center justify-around">
          <Link href={'/products/' + props.id}>
            <div className="h-[45vh] w-4/5 lg:h-[40vh] lg:w-[15vw] bg-[#8F797980] cursor-pointer"></div>
          </Link>
          <div className="text-center py-2">
            <h1 className="font-bold py-1">
              {props.name ? props.name : "Product Name"}
            </h1>
            <div className="h-[0.15vh] bg-black"></div>
            <p className="text-sm py-1">
              {props.tagline
                ? props.tagline
                : "better skin quality with natural herbs"}
            </p>
            <br />
            {props.addToCart ? (
              <div className=" flex items-center justify-center gap-5">
                <button className="bg-[#6A4D6F] text-white py-3 font-bold px-4 rounded-lg">
                  Add to cart
                </button>
                <button className="bg-[#6A4D6F] text-white py-3 font-bold px-4 rounded-lg">
                  Buy now
                </button>
              </div>
            ) : (
              <button className="h-[8vh] w-[30vw] lg:h-[8vh] lg:w-[10vw] bg-red-300 rounded-lg ">
                Buy Now
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product