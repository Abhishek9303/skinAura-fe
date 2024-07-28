import React from 'react'
import Button from '../button/Button';
const ProductPoster = () => {
  return (
    <>
      <div className="productPoster md:h-[25vmax] h-[30vmax] bg-[url('/images/productImage.png')] bg-top bg-cover flex items-center md:justify-start justify-center px-[5vmax]">
        <div className="flex flex-col justify-around items-left">
          <p className="md:text-[1.2vmax]">15% of on every order</p>
          <h1 className="text-[3.5vmax] font-juanaRegular text-[#6A4D6F ]">Subscribe and Save</h1>
          <div>
          <Button text={"Shop now"} className=" md:mt-8 mt-5 rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPoster