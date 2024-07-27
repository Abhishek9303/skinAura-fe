import { RiCheckboxCircleLine } from '@remixicon/react'
import React from 'react'

const BeforeAfterReview = () => {
  return (
    <>
      <div className="pb-3 border-none rounded w-[80vw] md:w-[40vw] lg:w-[28vw] flex flex-col bg-[#D9D9D9]">
        <div className="lg:h-[23vh] h-[20vh] w-full flex items-center justify-around ">
          <div className="w-[45%] bg-black h-[90%]">
            <img src="" alt="image" />
          </div>
          <div className="w-[45%] bg-black h-[90%]">
            <img src="" alt="image" />
          </div>
        </div>
        <h3 className="text-center font-semibold mt-2">"In just 3 months"</h3>

        <div className="px-5">
          <div className="flex items-center justify-between">
            <h2>Mr. Xyz </h2>
            <span>Review : *****</span>
          </div>
          <h2>
            Review : <span>Date</span>
          </h2>
          <p>Lorem ipsum dolor sit amet.....</p>
        <div className="flex items-center justify-between mt-5">
          <RiCheckboxCircleLine />
          <button className="py-1 px-2 border-none rounded bg-black text-white">
            read more
          </button>
        </div>
        </div>
      </div>
    </>
  );
}

export default BeforeAfterReview