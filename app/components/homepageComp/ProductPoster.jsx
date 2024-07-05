import React from 'react'
const ProductPoster = () => {
  return (
    <>
      <div className="productPoster h-[50vh] bg-[url('/images/productImage.png')] bg-top bg-cover flex items-center justify-center">
        <div className="h-1/4 w-[80vw] flex flex-col justify-around">
          <p>15% of on every order</p>
          <h1 className="text-[5vmax] whitespace-nowrap">Subscribe and Save</h1>
        </div>
      </div>
    </>
  );
}

export default ProductPoster