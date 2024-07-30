import React from "react";

const Page = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="hidden md:block h-full w-[40%] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
      <div className="flex bg-red-500 items-center justify-center w-full md:w-[60%] md:p-24">
        <form className=" bg-white shadow-md rounded-lg p-5 md:p-8 w-full space-y-4">
          <h1 className="text-2xl font-semibold text-center text-gray-700">Contact Information</h1>
          <div className="space-y-2">
            <label htmlFor="userContact" className="block text-sm font-medium text-gray-700">Contact:</label>
            <input
              type="text"
              id="userContact"
              placeholder="Email or Phone number"
              name="userContact"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <h1 className="text-xl font-semibold text-gray-700 mt-6">Shipping Address</h1>
          <div className="space-y-2">
            <label htmlFor="countries" className="block text-sm font-medium text-gray-700">Country:</label>
            <select
              name="countries"
              id="countries"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="india">India</option>
              <option value="america">America</option>
            </select>
          </div>
          <div className="space-y-2 sm:flex sm:space-y-0 sm:space-x-4 mt-4">
            <input
              type="text"
              placeholder="First name"
              name="firstname"
              className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastname"
              className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
            <textarea
              name="address"
              id="address"
              placeholder="Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary h-32"
            ></textarea>
          </div>
          <div className="space-y-2 sm:flex sm:space-y-0 sm:space-x-4 mt-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            <select
              name="countries"
              id=""
              className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="india">India</option>
              <option value="america">America</option>
            </select>
          </div>
          <div className="mt-4">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="mt-4">
            <input
              type="tel"
              name="contact"
              placeholder="123-456-7890"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              I agree to the terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#6A4D6F] text-white font-semibold rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page;
