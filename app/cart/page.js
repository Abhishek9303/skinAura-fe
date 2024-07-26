import React from 'react'
import Button from '../components/button/Button'

const page = (props) => {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-8 h-auto p-8'>
        <div className='productInfo w-full h-12vmax flex p-2 bg-red-500'>
        <div className='w-[12vmax] h-[12vmax] bg-yellow-300'>
           <img src='' alt='product image'/>
        </div>
        <div className='info ml-4'>
            <h1 className='text-[2vmax] font-semibold mb-1'>Skin Aura’s Glow Cream-UNISEX</h1>
            <p className='text-md'>*****</p>
            <p className='text-md font-medium mb-2'>53 people orderd last week</p>
            <div className='flex items-center justify-between'>
            <h1 className='text-[2.3vmax] mb-5 font-bold'>₹ 320 /-</h1>
            <Button text={'Buy Now'} className='rounded-lg'/>
            </div>

        </div>
        </div>
        <div className='productInfo w-full h-12vmax flex p-2 bg-red-500'>
        <div className='w-[12vmax] h-[12vmax] bg-yellow-300'>
           <img src='' alt='product image'/>
        </div>
        <div className='info ml-4'>
            <h1 className='text-[2vmax] font-semibold mb-1'>Skin Aura’s Glow Cream-UNISEX</h1>
            <p className='text-md'>*****</p>
            <p className='text-md font-medium mb-2'>53 people orderd last week</p>
            <div className='flex items-center justify-between'>
            <h1 className='text-[2.3vmax] mb-5 font-bold'>₹ 320 /-</h1>
            <Button text={'Buy Now'} className='rounded-lg'/>
            </div>

        </div>
        </div>

    </div>
  )
}

export default page