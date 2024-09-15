import React from 'react';

const 
Button = ({ text,onClick, className = '', ...props }) => {
  return (
    <button
      onclick={onClick}
      className={`bg-[#6A4D6F] hover:bg-[#4b334f] flex items-center justify-center px-5 py-2 text-white md:px-12 md:py-3 text-[1.8vmax] md:text-[1.1vmax] ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
