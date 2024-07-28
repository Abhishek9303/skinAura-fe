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

        <div className="md:w-[85vmax] w-full px-2 mx-auto flex flex-wrap md:gap-8 gap-5 items-center justify-center md:pb-16 pb-8">
            <Product id={1} key={1} name={"501/-"} addToCart={true} />
            <Product id={1} key={1} name={"501/-"} addToCart={true} />
            <Product id={1} key={1} name={"501/-"} addToCart={true} />
            <Product id={1} key={1} name={"501/-"} addToCart={true} />
        </div>
      </div>
    </>
  );
}

export default Products