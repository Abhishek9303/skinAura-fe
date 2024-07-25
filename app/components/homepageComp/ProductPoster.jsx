import React from 'react'
import Button from '../button/Button';
const ProductPoster = () => {
  return (
    <>
      <div className="productPoster h-[50vh] bg-[url('/images/productImage.png')] bg-top bg-cover flex items-center justify-center">
        <div className="h-1/4 w-[80vw] flex flex-col justify-around items-left">
          <p className="text-[#6A4D6F] text-[2vmax]">15% of on every order</p>
          <h1 className="text-[3.5vmax] text-[#6A4D6F ]">Subscribe and Save</h1>
          <Button text={"Shop now"} className="w-[15vw] border mt-3" />
        </div>
      </div>
    </>
  );
}

export default ProductPoster