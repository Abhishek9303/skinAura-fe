'use client'
import React from 'react';

const page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-start justify-between p-5 lg:p-12 bg-gray-100">
      {/* Product Bill Summary */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-5 mb-5 lg:mb-0 lg:mr-5">
        <h2 className="text-2xl font-bold mb-5">Order Summary</h2>
        <div className="space-y-4 h-[25vmax] overflow-y-auto">
          {/* Example Product Items */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Product Name 1</p>
            <p className="text-gray-700">$50</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Product Name 2</p>
            <p className="text-gray-700">$30</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Product Name 3</p>
            <p className="text-gray-700">$20</p>
          </div>
          <div className="flex justify-between items-center font-bold">
            <p>Total</p>
            <p>$100</p>
          </div>
        </div>
      </div>

      {/* Billing Options */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg px-5 py-6">
        <h2 className="text-2xl font-bold mb-5">Billing Options</h2>
        <form className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          {/* Address */}
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              name="address"
              className="w-full resize-none px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              rows="4"
              required
            ></textarea>
          </div>
          {/* Payment Method */}
          <div className="space-y-2">
            <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              id="payment-method"
              name="payment-method"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            >
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#6A4D6F] text-white font-semibold rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Complete Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
