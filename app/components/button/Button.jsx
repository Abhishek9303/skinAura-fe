import React from 'react';

const Button = ({ text, className = '', ...props }) => {
  return (
    <button 
      className={`bg-[#6A4D6F] xs:w-[20vmax] md:w-[15vmax] hover:bg-[#4b334f] flex items-center justify-center md:px-16 px-12 text-white xs:text-[2vmax] text-nowrap md:py-3 py-2 ${className}`} 
      {...props}
    >
      {text}
    </button>
  );
}

export default Button;
