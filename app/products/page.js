import React from 'react'
import HomeSwiper1 from '../components/swiper/HomeSwiper1';
import Product from '../components/product/Product';

const Products = () => {
  return (
    <>
      <HomeSwiper1 />
      <div className="w-full">
        <div className="text-center py-5">
          <h1 className="text-[3vmax]">Product For</h1>
          <p>“Healthy & Beautiful”</p>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-[80vw] flex flex-wrap items-center justify-start py-5 px-[5vw] gap-[5vw]">
            <Product id={1} key={1} name={"new product"} addToCart={true} />
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