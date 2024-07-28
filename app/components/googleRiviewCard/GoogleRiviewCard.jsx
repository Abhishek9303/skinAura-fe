import React from 'react';

const GoogleRiviewCard = ({ review, reviewer,...props }) => {
  return (
    <div className="relative md:min-w-[20vmax] md:min-h-[16vmax] w-[40vmax] h-auto bg-[#d9d9d9cb] rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer">
      <div className="h-[5vh] md:mb-8 w-[35%] py-2 rounded-tl-lg rounded-br-lg bg-[#6A4D6F] flex items-center justify-center">
        <div className="flex">
          <span className="md:text-[12px] text-[10px]">⭐</span>
          <span className="md:text-[12px] text-[10px]">⭐</span>
          <span className="md:text-[12px] text-[10px]">⭐</span>
          <span className="md:text-[12px] text-[10px]">⭐</span>
          <span className="md:text-[12px] text-[10px]">⭐</span>
        </div>
      </div>
     <div className='p-4'>
     <p className="md:text-xl text-lg text-gray-700 font-semibold">
        {review ? review : 'This is the best and genuine online skin care platform'}
      </p>
      <h1 className="text-lg text-gray-800 text-center md:mt-8 mt-5 font-semibold">
        Name: {reviewer ? reviewer : 'No Name'}
      </h1>
     </div>
    </div>
  );
};

export default GoogleRiviewCard;
