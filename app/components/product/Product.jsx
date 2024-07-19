"use client"
import Link from 'next/link';
import React from 'react';
import Button from '../button/Button';

const Product = (props) => {
  return (
    <>
      <div className="w-[85vw] lg:w-[25vw] bg-white border-[1px] border-[#0000003b] shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <div className="h-[4.5vh] w-[35%] py-2 rounded-br-lg   bg-[#897F7F80] flex items-center justify-center">
          <div className="flex">
            <span className='text-[12px]'>⭐</span>
            <span className='text-[12px]'>⭐</span>
            <span className='text-[12px]'>⭐</span>
            <span className='text-[12px]'>⭐</span>
            <span className='text-[12px]'>⭐</span>
          </div>
        </div>
        <div className="flex flex-col py-5 items-center justify-around">
        <h1 className="font-semibold py-1 text-xl text-gray-800">
              {props.name ? props.name : "Product Name"}
            </h1>
          <Link href={'/products/' + props.id}>
            <div className="h-[40vh] w-4/5 lg:h-[40vh] lg:w-[15vw] bg-[#8F797980] cursor-pointer rounded-lg mb-1 mt-2"></div>
          </Link>
          <div className="text-center py-2">
            <h1 className="font-bold py-1 mb-2 text-xl text-gray-800">
              {props.name ? props.name : " $ 501/-"}
            </h1>
            <div className="h-[0.15vh] bg-black mb-2"></div>
            <p className="text-sm py-1 text-gray-600">
              {props.tagline ? props.tagline : "Better skin quality with natural herbs"}
            </p>
            <br />
            {/* {props.addToCart ? (
              <div className="flex items-center justify-center gap-5">
                <button className="bg-[#6A4D6F] text-white py-2 px-4 font-bold rounded-lg shadow hover:bg-[#563857]">
                  Add to cart
                </button>
                <button className="bg-[#6A4D6F] text-white py-2 px-4 font-bold rounded-lg shadow hover:bg-[#563857]">
                  Buy now
                </button>
              </div>
            ) : (
              <button className="h-[8vh] w-[30vw] lg:h-[8vh] lg:w-[10vw] bg-red-300 rounded-lg shadow hover:bg-red-400 transition-colors">
                Buy Now
              </button>
            )} */}
            <Button text='Buy Now' className='rounded-md'/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
