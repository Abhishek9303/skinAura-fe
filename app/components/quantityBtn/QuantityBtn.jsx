"use client";
import React from "react";

const QuantityBtn = ({ quantity, setQuantity }) => {
  // Function to increase quantity
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to decrease quantity, ensuring it doesn't go below 1
  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="flex border-2 my-auto border-black items-center p-1 rounded-md md:mt-3 mt-3 justify-center md:gap-10 gap-5">
      <button
        onClick={handleDecrement}
        className="text-[2vmax] lg:text-[1.2vmax] font-bold"
      >
        -
      </button>
      <span className="text-[2vmax] lg:text-[1.2vmax] font-bold">
        {quantity}
      </span>
      <button
        onClick={handleIncrement}
        className="text-[2vmax] lg:text-[1.2vmax] font-bold"
      >
        +
      </button>
    </div>
  );
};

export default QuantityBtn;
