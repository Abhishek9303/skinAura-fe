"use client";
import React, { useState } from "react";
import Button from "../../components/button/Button"; // Assuming your Button component is in a file named Button.js

const AddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [addressData, setAddressData] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(addressData);
    setAddressData({
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full h-full md:h-auto md:max-w-md md:rounded-lg p-6 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Enter Your Address</h2>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-semibold mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={addressData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="addressLine1"
                className="block text-gray-700 font-semibold mb-1"
              >
                Address Line 1
              </label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={addressData.addressLine1}
                onChange={handleInputChange}
                placeholder="Enter address line 1"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="addressLine2"
                className="block text-gray-700 font-semibold mb-1"
              >
                Address Line 2
              </label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={addressData.addressLine2}
                onChange={handleInputChange}
                placeholder="Enter address line 2 (optional)"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-gray-700 font-semibold mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={addressData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="state"
                className="block text-gray-700 font-semibold mb-1"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={addressData.state}
                onChange={handleInputChange}
                placeholder="Enter state"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="postalCode"
                className="block text-gray-700 font-semibold mb-1"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={addressData.postalCode}
                onChange={handleInputChange}
                placeholder="Enter postal code"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-gray-700 font-semibold mb-1"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={addressData.country}
                onChange={handleInputChange}
                placeholder="Enter country"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex justify-end">
              <Button
                text="Submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
                onClick={handleSubmit}
              />
              <Button
                text="Close"
                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md px-4 py-2"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressModal;
