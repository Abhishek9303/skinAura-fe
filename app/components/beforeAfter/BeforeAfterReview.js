import React from 'react'

const BeforeAfterReview = ({ beforeImage, afterImage }) => {

  return (
    <>
      <div className="pb-3 border-none rounded w-full md:w-[40vw] lg:w-[28vw] flex flex-col bg-[#D9D9D9] relative">
        <div className="w-full flex flex-col md:flex-row items-center justify-around py-3">
          <div className="w-full md:w-[45%] bg-black rounded-md overflow-hidden mb-3 md:mb-0">
            <img src={beforeImage} alt="before image" className='object-cover object-center w-full h-full' />
          </div>
          <div className="w-full md:w-[45%] bg-black rounded-md overflow-hidden">
            <img src={afterImage} alt="after image" className='object-cover object-center w-full h-full' />
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
          </div>
          
        </div>
      </div>
    </>
  );
}

export default BeforeAfterReview