import React from 'react'

const Signin = () => {
  return (
    <div className="w-full flex items-center justify-center   h-screen">
    <div className="left sm:block md:block hidden h-full w-[40%] bg-[url('https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-red-500"></div>
    <div className="right flex items-center justify-center w-full sm:w-[60%] px-12 ">
      <form className="lg:w-[45vmax] w-[50vmax] py-8 px-8 border-[0.5px] border-[#0000003b] shadow-md rounded-lg h-[auto] space-y-6">
         <h1 className="text-3xl text-center text-gray-600 font-bold">Login In</h1>
         
         
         <div>
           <label className="block text-gray-600 font-medium mb-2">Phone No</label>
           <input type="tel" placeholder="123-456-7890" className="w-full border-[0.5px] border-[#0000003b] shadow-md rounded-lg p-3" />
         </div>
         
         <div>
           <label className="block text-gray-600 font-medium mb-2">Password</label>
           <input type="password" placeholder="Confirm Password" className="w-full mb-5 border-[0.5px] border-[#0000003b] shadow-md rounded-lg p-3" />
         </div>
         
         <button className="w-full  bg-[#6A4D6F] text-white font-medium py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">Login</button>
         
         <div className="text-center text-gray-600 mt-4">
           Already have an account? <a href="/signup" className="text-gray-600 font-bold hover:underline">Sign Up</a>
         </div>
      </form>
    </div>    
  </div>
  )
}

export default Signin