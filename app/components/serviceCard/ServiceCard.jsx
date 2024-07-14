import React from 'react'

const ServiceCard = () => {
  return (
    <>
      <div className='px-20 bg-green-200 flex justify-between items-center'>
        <div className="flex flex-col gap-5 w-[60vw] py-5 rounded-md">
          <h1># 01</h1>
          <h1 className="text-[3vmax]">Service Name</h1>
          <p className="w-[15vw]">
            Even out skin tone and smooth outphotodamage.
          </p>
          <button className="h-[6vh] w-[45vw] lg:h-[8vh] lg:w-[15vw] bg-red-300 rounded-lg ">
            Take a Test Now
          </button>
        </div>
        <div className="">
          <img src="" alt="image not loaded" />
        </div>
      </div>
    </>
  );
}

export default ServiceCard