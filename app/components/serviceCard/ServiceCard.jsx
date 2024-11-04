import React from 'react'
import Button from '../button/Button';

const ServiceCard = () => {
  return (
    <>
      <div className='md:px-20 md:py-5 p-5 bg-[#D9D9D9] w-full flex md:flex-row flex-col-reverse justify-between rounded-lg items-center'>
        <div className="flex flex-col gap-5 md:py-16 py-5 w-full rounded-lg">
         <span className='md:text-[2vmax] text-[3vmax] hidden md:block leading-none'># 01</span>
         <h1 className="md:text-[3vmax] text-[4vmax] md:text-start text-center leading-none font-juanaRegular">Service Name</h1>
          <p className="md:w-[15vw] md:text-start text-center md:mb-8 mb-3">
            Even out skin tone and smooth outphotodamage.
          </p>
          <div className='flex items-center md:justify-start justify-center'><Button text='Take A Test Now' className='rounded-full' /></div>
        </div>
        <div className=" md:w-[40%] md:h-[20vmax] w-full h-[30vmax] rounded-lg overflow-hidden">
          <img className='w-full h-full object-cover object-center' src="https://plus.unsplash.com/premium_photo-1661485121637-388a76cec58b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image not loaded" />
        </div>
      </div>
    </>
  );
}

export default ServiceCard