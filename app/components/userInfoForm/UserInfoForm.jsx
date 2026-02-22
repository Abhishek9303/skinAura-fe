import React from "react";
import useUserStore from "../../../store/user/userProfile";
import { RiCloseLine } from "@remixicon/react";
import Button from "@/app/components/button/Button";

const Profile = ({ closeForm }) => {
  const { user } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    closeForm(); // Close the form after submission
  };

  const countries = ["India", "United States", "Canada", "United Kingdom"];
  const states = {
    India: ["Maharashtra", "Gujarat", "Delhi", "Karnataka", "Bhopal"],
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={closeForm}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300 border border-gray-100">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-juanaBold text-[#6A4D6F]">
              Edit Profile
            </h2>
            <p className="text-gray-400 text-[10px] font-juanaMedium uppercase tracking-widest mt-1">
              Manage your account details & delivery info
            </p>
          </div>
          <button
            onClick={closeForm}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-400 transition-colors"
          >
            <RiCloseLine className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Contact Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6A4D6F]/5 flex items-center justify-center text-[#6A4D6F]">
                  📞
                </div>
                <h3 className="text-xs font-juanaBold text-gray-800 uppercase tracking-widest">
                  Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                    Mobile Number
                  </label>
                  {user.mobileNo ? (
                    <div className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl font-juanaMedium text-gray-500 flex items-center">
                      {user.mobileNo}
                      <span className="ml-auto text-[8px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                        Verified
                      </span>
                    </div>
                  ) : (
                    <input
                      type="tel"
                      name="mobileNo"
                      placeholder="Mobile Number"
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-juanaMedium text-[#6A4D6F]"
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  {user.emailId ? (
                    <div className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl font-juanaMedium text-gray-500 truncate">
                      {user.emailId}
                    </div>
                  ) : (
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-juanaMedium text-[#6A4D6F]"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#DF9D43]/5 flex items-center justify-center text-[#DF9D43]">
                  🚚
                </div>
                <h3 className="text-xs font-juanaBold text-gray-800 uppercase tracking-widest">
                  Shipping Address
                </h3>
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                    Country
                  </label>
                  <select
                    name="countries"
                    id="countries"
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-juanaMedium text-[#6A4D6F] appearance-none"
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country.toLowerCase()}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="E.g. Jane"
                      name="firstname"
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-juanaMedium text-[#6A4D6F]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Duo"
                      name="lastname"
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-juanaMedium text-[#6A4D6F]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                    Street Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    placeholder="Building, street, and area info"
                    className="w-full h-24 p-4 bg-gray-50 border border-transparent rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-juanaMedium text-[#6A4D6F] resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Delhi"
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-juanaMedium text-[#6A4D6F]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                      State
                    </label>
                    <select
                      name="state"
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-juanaMedium text-[#6A4D6F] appearance-none"
                    >
                      <option value="">Select State</option>
                      {states["India"].map((state, index) => (
                        <option key={index} value={state.toLowerCase()}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="6 Digits"
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-juanaMedium text-[#6A4D6F]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                      Alternate Phone
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      placeholder="Optional"
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-juanaMedium text-[#6A4D6F]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
              <input
                type="checkbox"
                className="w-5 h-5 text-[#6A4D6F] focus:ring-[#6A4D6F] border-gray-100 rounded-lg cursor-pointer transition-all"
              />
              <label className="text-[10px] font-juanaMedium text-gray-500 uppercase tracking-wider leading-relaxed">
                I agree to the{" "}
                <span className="text-[#DF9D43] font-juanaBold hover:underline cursor-pointer">
                  Terms and Conditions
                </span>
              </label>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 sm:p-8 border-t border-gray-100 flex gap-3 sm:gap-4 bg-white sticky bottom-0">
          <button
            onClick={closeForm}
            className="flex-1 py-4 border border-gray-200 text-gray-500 !font-juanaBold rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-wider !text-[10px] sm:!text-xs !leading-none whitespace-nowrap"
          >
            Cancel
          </button>
          <Button
            text="Save Changes"
            onClick={handleSubmit}
            className="flex-1 !py-4 !h-auto uppercase tracking-wider !text-[10px] sm:!text-xs !font-juanaBold !leading-none shadow-xl shadow-[#6A4D6F]/20 rounded-2xl whitespace-nowrap"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
