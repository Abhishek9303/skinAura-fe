import React from 'react';

const Button = ({ text, className = '', ...props }) => {
  return (
    <button className={`bg-[#6A4D6F] px-16 text-white text-nowrap py-3 ${className}`} {...props}>
      {text}
    </button>
  );
}

export default Button;
