import React from "react";

const Button = ({ text, className = "", onClick }) => {
  return (
    <div
      className={`bg-[#6A4D6F] hover:bg-[#4b334f] cursor-pointer flex items-center justify-center px-5 py-2 text-white md:px-12 md:py-3 text-[1.8vmax] md:text-[1.1vmax] ${className}`}
      onClick={onClick}
      role="button"
      tabIndex="0"
    >
      {text}
    </div>
  );
};

export default Button;
