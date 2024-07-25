import React from 'react'
import Button from '../button/Button';

const ServiceCard = () => {
  return (
    <>
      <div className='px-20 py-5 bg-[#D9D9D9] w-full flex justify-between rounded-lg items-center'>
        <div className="flex flex-col gap-5 py-16 w-full rounded-lg">
         <span className='text-[2vmax] leading-none'># 01</span>
         <h1 className="text-[3vmax] leading-none font-juanaRegular">Service Name</h1>
          <p className="w-[15vw] mb-8">
            Even out skin tone and smooth outphotodamage.
          </p>
          <Button text='Take A Test Now' className='rounded-full' />
        </div>
        <div className=" w-[40%] h-[20vmax] rounded-lg overflow-hidden">
          <img className='w-full h-full object-cover object-center' src="https://plus.unsplash.com/premium_photo-1661485121637-388a76cec58b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image not loaded" />
        </div>
      </div>
    </>
  );
}

export default ServiceCard