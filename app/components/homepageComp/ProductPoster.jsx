import React from 'react'
import Button from '../button/Button';
const ProductPoster = () => {
  return (
    <>
      <div className="productPoster h-[25vmax] bg-[url('/images/productImage.png')] bg-top bg-cover flex items-center md:justify-start justify-center px-[5vmax]">
        <div className="flex flex-col justify-around items-left">
          <p className="md:text-[1.2vmax]">15% of on every order</p>
          <h1 className="text-[3.5vmax] font-juanaRegular text-[#6A4D6F ]">Subscribe and Save</h1>
          <Button text={"Shop now"} className=" mt-8 rounded-full" />
        </div>
      </div>
    </>
  );
}

export default ProductPoster