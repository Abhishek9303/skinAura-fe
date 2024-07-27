import React from "react";
import QuantityBtn from "../quantityBtn/QuantityBtn";

const ProductQuantityDiv = (props) => {
  return (
    <div className="productQuantityDiv">
      <div className="md:min-w-[12vmax] md:min-h-[12vmax] h-[20vmax] w-[20vmax] bg-[#D9D9D9] rounded-lg">
        <img src="" alt="product image" />
      </div>
      <QuantityBtn />
    </div>
  );
};

export default ProductQuantityDiv;
