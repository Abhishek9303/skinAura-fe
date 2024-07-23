import React from 'react';

const GoogleRiviewCard = ({ review, reviewer,...props }) => {
  return (
    <div className="relative md:w-[20vmax] md:h-[16vmax] bg-[#d9d9d9cb] rounded-lg shadow-md">
      <div className="h-[5vh] mb-8 w-[35%] py-2 rounded-tl-lg rounded-br-lg bg-[#6A4D6F] flex items-center justify-center">
        <div className="flex">
          <span className="text-[12px]">⭐</span>
          <span className="text-[12px]">⭐</span>
          <span className="text-[12px]">⭐</span>
          <span className="text-[12px]">⭐</span>
          <span className="text-[12px]">⭐</span>
        </div>
      </div>
     <div className='p-4'>
     <p className="text-xl text-gray-700 font-semibold">
        {review ? review : 'This is the best and genuine online skin care platform'}
      </p>
      <h1 className="text-lg text-gray-800 text-center mt-8 font-semibold">
        Name: {reviewer ? reviewer : 'No Name'}
      </h1>
     </div>
    </div>
  );
};

export default GoogleRiviewCard;
