import Product from '@/app/components/product/Product';
import ReviewSwiper from '@/app/components/swiper/ReviewSwiper';
import React from 'react'

const SingleProduct = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className="flex lg:flex-row flex-col py-10 items-center justify-center">
          <div className="lg:w-[35vw] w-[80vw] lg:h-[40vh] h-[40vh] bg-black"></div>
          <div className="lg:w-[45vw] w-[80vw] lg:h-[40vh] h-[50vh] bg-blue-200 lg:px-10 px-5 lg:py-5 py-2">
            <h1 className="text-2xl">Skin Aura’s Glglow Cream-UNISEX</h1>
            <p>53 people orderd last week</p>
            <div>star</div>
            <h5 className="lg:text-base py-2">
              The most natural and trusted product of ours -
              (Product-Description)
            </h5>
            <div className="flex items-start justify-between">
              <h4>MRP : ₹ 320 /-</h4>
            </div>
            <div className=" flex items-center py-10 gap-5">
              <button className="bg-[#6A4D6F] text-white lg:py-4 font-bold lg:px-10 py-2 px-3 rounded-lg">
                Add to cart
              </button>
              <button className="bg-[#6A4D6F] text-white lg:py-4 font-bold lg:px-10 py-2 px-3 rounded-lg">
                Buy now
              </button>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:text-left text-center  w-[80vw] lg:py-10 py-5 items-center justify-between">
          <div className="lg:w-[50vw] w-[80vw]">
            <h1 className="text-2xl py-2 lg:text-left text-center">
              Skin Cream that prevent ageing wrinkels and improve skin health{" "}
            </h1>
            <p className="py-2 text-sm lg:text-left text-justify">
              Nourishes skin internally with essential supplements with a
              formulation of rare and effective Ayurvedic herbs. Targets poor
              skin health, dosha imbalance, and poor blood flow. Inadequate
              sleep, diet, and lifestyle can cause an imbalance of hormones.
              Adaptogenic herbs in skin ras such as bhringraj, shatavari, and
              ashwagandha help restore that. Made with proven, safe, and natural
              ingredients, these Ayurvedic multivitamin tablets help promote
              skin health.
            </p>
          </div>
          <div>
            <img
              className="lg:w-[20vw] w-[80vw] py-5"
              src="/images/newImage.png"
              alt=""
            />
          </div>
        </div>
        <div className="py-10">
          <h1 className="text-[3vmax] text-center">Certified Products</h1>
          <div className="w-[80vw] h-[60vh] my-5 rounded-2xl flex items-center justify-center bg-black"></div>
        </div>
        <div className="py-10">
          <h1 className="text-center text-[3vmax]">Our Product Results</h1>
          <p className="text-sm text-center">
            we don’t say it our members say it
          </p>
          <div className="py-10">
            <ReviewSwiper />
          </div>
        </div>
        <div className='my-5'>
          <h1 className='text-center text-[2.8vmax] mb-10'>You May Also like</h1>
          <div className='flex lg:flex-row flex-col my-5 gap-10'>
              <Product/>
              <Product/>
              <Product/>
          </div>
        </div>
      </div>
    </>
  ); 
}

export default SingleProduct