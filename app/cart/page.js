import React from 'react'
import Button from '../components/button/Button'
import ProductQuantityDiv from '../components/productQuantityDiv/ProductQuantityDiv'

const page = (props) => {
  return (
    <div className='w-full flex lg:flex-row flex-col items-center justify-center gap-5 h-auto p-5'>
        <div className='productInfo w-full h-12vmax flex p-2 bg-white border-[1px] border-[#0000003b] shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105'>
        <ProductQuantityDiv/>
        <div className='info w-full flex flex-col justify-between ml-4'>
            <h1 className='md:text-[1.5vmax] text-[2vmax] font-semibold'>Skin Aura’s Glow Cream-UNISEX</h1>
            <p className='text-md font-bold'>*****</p>
            <p className='md:text-[1vmax] text-[1.8vmax] font-medium mb-2'>53 people orderd last week</p>
            <div className='flex items-center justify-between'>
            <h1 className='text-[2.3vmax] md:block hidden md:mb-5 font-bold'>₹ 320 /-</h1>
            </div>
            <div className='flex w-full items-center md:justify-end justify-between'>
            <h1 className='text-[2.3vmax] md:hidden md:mb-5 font-bold'>₹ 320 /-</h1> 
            <Button text={'Buy Now'} className='rounded-lg'/>
            </div>

        </div>
        </div>
        <div className='productInfo w-full h-12vmax flex p-2 bg-white border-[1px] border-[#0000003b] shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105'>
        <ProductQuantityDiv/>
        <div className='info w-full flex flex-col justify-between ml-4'>
            <h1 className='md:text-[1.5vmax] text-[2vmax] font-semibold'>Skin Aura’s Glow Cream-UNISEX</h1>
            <p className='text-md font-bold'>*****</p>
            <p className='md:text-[1vmax] text-[1.8vmax] font-medium mb-2'>53 people orderd last week</p>
            <div className='flex items-center justify-between'>
            <h1 className='text-[2.3vmax] md:block hidden md:mb-5 font-bold'>₹ 320 /-</h1>
            </div>
            <div className='flex w-full items-center md:justify-end justify-between'>
            <h1 className='text-[2.3vmax] md:hidden md:mb-5 font-bold'>₹ 320 /-</h1> 
            <Button text={'Buy Now'} className='rounded-lg'/>
            </div>

        </div>
        </div>
        <div className='productInfo w-full h-12vmax flex p-2 bg-white border-[1px] border-[#0000003b] shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105'>
        <ProductQuantityDiv/>
        <div className='info w-full flex flex-col justify-between ml-4'>
            <h1 className='md:text-[1.5vmax] text-[2vmax] font-semibold'>Skin Aura’s Glow Cream-UNISEX</h1>
            <p className='text-md font-bold'>*****</p>
            <p className='md:text-[1vmax] text-[1.8vmax] font-medium mb-2'>53 people orderd last week</p>
            <div className='flex items-center justify-between'>
            <h1 className='text-[2.3vmax] md:block hidden md:mb-5 font-bold'>₹ 320 /-</h1>
            </div>
            <div className='flex w-full items-center md:justify-end justify-between'>
            <h1 className='text-[2.3vmax] md:hidden md:mb-5 font-bold'>₹ 320 /-</h1> 
            <Button text={'Buy Now'} className='rounded-lg'/>
            </div>

        </div>
        </div>
       
        
        
    </div>
  )
}

export default page