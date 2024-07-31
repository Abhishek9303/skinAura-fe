import React from 'react'
import OrderCard from '../components/orderCard/OrderCard'

const page = (props) => {
  return (
    <div className='w-full flex lg:flex-row flex-col items-center justify-center gap-5 h-auto mx-auto md:w-[85vmax] p-5'>
    <OrderCard/>        
    <OrderCard/>        
    <OrderCard/>        
    </div>
  )
}

export default page