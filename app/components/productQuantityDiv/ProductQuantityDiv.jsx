import React from "react";
import QuantityBtn from "../quantityBtn/QuantityBtn";

const ProductQuantityDiv = (props) => {
  return (
    <div className="productQuantityDiv">
      <div className=" min-h-[12vmax] min-w-[12vmax] bg-[#D9D9D9] rounded-lg">
        <img src="" alt="product image" />
      </div>
      <QuantityBtn />
    </div>
  );
};

export default ProductQuantityDiv;
