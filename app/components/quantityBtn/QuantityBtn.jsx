import React from "react";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";

const QuantityBtn = ({ quantity, handleIncrement, handleDecrement }) => {
  return (
    <div className="flex items-center bg-[#FCFBFA] border border-gray-100 rounded-xl overflow-hidden shadow-sm h-10">
      <button
        className="w-10 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-[#6A4D6F] active:scale-90"
        onClick={handleDecrement}
        aria-label="Decrease quantity"
      >
        <RiSubtractLine size={16} />
      </button>

      <span className="w-10 h-full flex items-center justify-center font-sans font-semibold text-[#6A4D6F] border-x border-gray-50 bg-gray-50/30 text-sm">
        {quantity}
      </span>

      <button
        className="w-10 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-[#6A4D6F] active:scale-90"
        onClick={handleIncrement}
        aria-label="Increase quantity"
      >
        <RiAddLine size={16} />
      </button>
    </div>
  );
};

export default QuantityBtn;
