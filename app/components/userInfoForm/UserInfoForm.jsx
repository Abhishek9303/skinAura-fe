import React from "react";
import useUserStore from "../../../store/user/userProfile";
import { RiCloseLine } from "@remixicon/react";

const Profile = ({ closeForm }) => {
  const { user } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    closeForm(); // Close the form after submission
  };

  const countries = ["India", "United States", "Canada", "United Kingdom"];
  const states = {
    India: ["Maharashtra", "Gujarat", "Delhi", "Karnataka","Bhopal"]
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="relative p-6">
          <button
            onClick={closeForm}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Close"
          >
            <RiCloseLine className="w-6 h-6" />
          </button>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Edit Profile
            </h1>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Contact Information
              </h2>
              <div>
                <label
                  htmlFor="userContact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact:
                </label>
                {user.mobileNo ? (
                  <p className="text-gray-700 bg-gray-100 p-2 rounded">
                    {user.mobileNo}
                  </p>
                ) : (
                  <input
                    type="tel"
                    name="mobileNo"
                    placeholder="Mobile Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}
              </div>
              <div>
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email:
                </label>
                {user.emailId ? (
                  <p className="text-gray-700 bg-gray-100 p-2 rounded">
                    {user.emailId}
                  </p>
                ) : (
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Shipping Address
              </h2>
              <div>
                <label
                  htmlFor="countries"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country:
                </label>
                <select
                  name="countries"
                  id="countries"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.toLowerCase()}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  name="firstname"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastname"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address:
                </label>
                <textarea
                  name="address"
                  id="address"
                  placeholder="Address"
                  className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <select
                  name="state"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select State</option>
                  {states["India"].map((state, index) => (
                    <option key={index} value={state.toLowerCase()}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="tel"
                name="contact"
                placeholder="123-456-7890"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                I agree to the terms and conditions
              </label>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
