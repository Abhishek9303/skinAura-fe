import React from "react";

const QuantityBtn = ({ quantity, handleIncrement, handleDecrement }) => {
  return (
    <div className="flex items-center">
      <button className="bg-gray-300 px-2 rounded-l" onClick={handleDecrement}>
        -
      </button>
      <span className="px-3">{quantity}</span>
      <button className="bg-gray-300 px-2 rounded-r" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default QuantityBtn;
