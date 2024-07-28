import React from 'react'

const QuantityBtn = () => {
  return (
    <div className='flex border-2 my-auto border-black items-center p-1 rounded-md md:mt-3 mt-3 justify-center md:gap-10 gap-5'>
            <button className='text-[2vmax] lg:text-[1.2vmax] font-bold'>-</button>
            <span className='text-[2vmax] lg:text-[1.2vmax] font-bold'>1</span>
            <button className='text-[2vmax] lg:text-[1.2vmax] font-bold'>+</button>
    </div>
  )
}

export default QuantityBtn