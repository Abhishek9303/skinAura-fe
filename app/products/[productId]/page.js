import Product from '@/app/components/product/Product';
import ProductImages from '@/app/components/swiper/ProductImages';
import ReviewSwiper from '@/app/components/swiper/ReviewSwiper';
import VideoDiv from '../../components/videoDiv/VideoDiv';
import React from 'react'
import Button from '@/app/components/button/Button';

const SingleProduct = (props) => {
  return (
    <>
      <div className="md:w-[85vmax] px-8 md:px-5 min-h-screen mx-auto">
        <div className="flex lg:flex-row flex-col py-10 items-center justify-center">
          <div className="lg:w-[35vw] w-[80vw] lg:h-[40vh] h-[40vh] ">
              <ProductImages height={"50vh"} />
          </div>
          <div className="md:ml-16 lg:w-[45vw] w-[80vw] lg:h-[40vh] h-[28vh]  lg:px-10 px-5 lg:py-5 py-16">
            <h1 className="text-3xl mb-3">Skin Aura’s Glglow Cream-UNISEX</h1>
            <p className='text-sm'>53 people orderd last week</p>
            <div>star</div>
            <h5 className="lg:text-base py-2">
              The most natural and trusted product of ours -
              (Product-Description)
            </h5>
            <div className="flex items-start justify-between">
              <h1 className='text-3xl mt-4 font-semibold'>MRP : ₹ 320 /-</h1>
            </div>
            <div className=" flex items-center py-10 gap-5">
            <Button text='Add To Cart' className='rounded-lg ' />
            <Button text='Buy Now' className='rounded-lg ' />
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col mx-auto lg:text-left text-center  w-[80vw] lg:py-10 py-5 items-center justify-between">
          <div className="lg:w-[40vw] w-[80vw]">
            <h1 className="text-xl py-2 lg:text-left text-center">
              Skin Cream that prevent ageing wrinkels and improve skin health{" "}
            </h1>
            <p className="py-4 text-sm lg:text-left text-justify">
              Nourishes skin internally with essential supplements with a
               dosha imbalance, and poor blood flow. Inadequate
              sleep, diet, and lifestyle can cause an imbalance of hormones.
              Adaptogenic herbs in skin ras such as bhringraj, shatavari, and
              ashwagandha help restore that. Made with proven, safe, and natural
              ingredients, these Ayurvedic multivitamin tablets help promote
              skin health.
            </p>
          </div>
          <div>
            <img
              className="lg:w-[20vw] w-[70vw] py-12"
              src="/images/newImage.png"
              alt=""
            />
          </div>
        </div>
        <div className="py-12">
          <h1 className="md:text-[3vmax] text-[3.5vmax] font-juanaRegular mb-12 text-center">Certified Products</h1>
          <VideoDiv text='Certificates' imgSrc='https://plus.unsplash.com/premium_photo-1713628398440-9d056ad0d468?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
        </div>
        <div className="py-10">
          <h1 className="text-center md:text-[3vmax] text-[3.5vmax] font-juanaRegular">Our Product Results</h1>
          <p className="text-sm text-center">
            we don’t say it our members say it
          </p>
          <div className="py-10">
            <ReviewSwiper perPage={"3"}  />
          </div>
        </div>
      </div>
        <div className="w-full">
        <div className="text-center py-5 mb-8">
          <h1 className="md:text-[3vmax] mt-8 text-[3.5vmax] font-juanaRegular">Sujjested Ones</h1>
          <p>“Healthy & Beautiful”</p>
        </div>

        <div className='md:w-[85vmax] w-full px-6 mx-auto flex flex-wrap gap-8 items-center justify-between pb-10'>
          <div className=" w-full flex flex-wrap gap-10 items-center justify-between">
            <Product id={1} key={1} name={"new product"} addToCart={true}  />
            <Product id={2} key={2} name={"product 01"} addToCart={true} />
            <Product id={3} key={3} name={"product 02"} addToCart={true} />
            <Product id={4} key={4} name={"product 03"} addToCart={true} />
          </div>
        </div>
      </div>
    </>
  ); 
}

export default SingleProduct