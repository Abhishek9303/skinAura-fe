import React from 'react'
import HomeSwiper1 from '../components/swiper/HomeSwiper1';
import Product from '../components/product/Product';

const Products = () => {
  return (
    <>
      <HomeSwiper1 />
      <div className="w-full">
        <div className="text-center py-5 mb-8">
          <h1 className="md:text-[3vmax] mt-8 text-[3.5vmax] font-juanaRegular">Product For</h1>
          <p>“Healthy & Beautiful”</p>
        </div>

        <div className='md:w-[85vmax] w-full px-6 mx-auto flex flex-wrap gap-8 items-center justify-between mb-8'>
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

export default Products