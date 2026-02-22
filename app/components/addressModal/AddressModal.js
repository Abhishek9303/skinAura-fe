import React, { useEffect, useState } from "react";
import Button from "@/app/components/button/Button";
import axios from "axios";

const AddressModal = ({
  isOpen,
  onClose,
  onAddressSelect,
  productId,
  quantity,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    addressLine2: "", // Address Line 2
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {

    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}api/v1/common/getAddress`,
          {
            headers: {
              "auth-token": window.localStorage.getItem("token"),
            },
          }
        );
        if (response.data.success) {
          setAddresses(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    if (isOpen) {
      fetchAddresses();
      setSelectedAddressId(null); // Reset selected address ID when the modal opens
    }
  }, [isOpen]);

  const validateFields = () => {
    const newErrors = {};
    if (!newAddress.addressLine1)
      newErrors.addressLine1 = "Address Line 1 is required.";
    if (!newAddress.city) newErrors.city = "City is required.";
    if (!newAddress.state) newErrors.state = "State is required.";
    if (!newAddress.pinCode) newErrors.pinCode = "Pin Code is required.";
    if (!newAddress.country) newErrors.country = "Country is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showForm && validateFields()) {
      try {
        const response = await axios.post(
          `${process.env.BACKEND_URL}api/v1/user/addAddress`,
          {
            ...newAddress,
          },
          {
            headers: {
              "auth-token": window.localStorage.getItem("token"),
            },
          }
        );

        if (response.data.success) {
          onAddressSelect({
            ...newAddress,
            productId,
            quantity,
            addressId: response.data.address._id, // Include the new address ID
          });

          // Reset the new address state
          setNewAddress({
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            pinCode: "",
            country: "",
          });

          // Fetch addresses again to include the newly added address
          const fetchAddresses = async () => {
            try {
              const response = await axios.get(
                `${process.env.BACKEND_URL}api/v1/common/getAddress`,
                {
                  headers: {
                    "auth-token": window.localStorage.getItem("token"),
                  },
                }
              );
              if (response.data.success) {
                setAddresses(response.data.data);
              }
            } catch (error) {
              console.error("Error fetching addresses:", error);
            }
          };
          fetchAddresses();
        } else {
          console.error("Error adding address:", response.data.message);
        }
      } catch (error) {
        console.error("Error adding address:", error);
      }
    } else if (selectedAddressId) {
      // Find the selected address from the addresses array
      const selectedAddressDetails = addresses.find(
        (address) => address._id.toString() === selectedAddressId
      );

      if (selectedAddressDetails) {
        onAddressSelect({
          ...selectedAddressDetails, // Send the details of the selected address
          productId,
          quantity,
          addressId: selectedAddressDetails._id, // Include the selected address ID
        });
      }
    }
  };

  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-sans font-bold text-[#6A4D6F] leading-tight">Delivery Address</h2>
            <p className="text-gray-400 text-[10px] font-sans font-medium uppercase tracking-widest mt-1">Select or add a new shipping destination</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
          
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-juanaBold text-gray-800 uppercase tracking-[0.15em]">
              {showForm ? "Add New Address" : "Saved Addresses"}
            </h3>
            <button
              onClick={() => {
                setShowForm((prev) => !prev);
                setSelectedAddressId(null);
                if (showForm) {
                  setNewAddress({
                    addressLine1: "",
                    addressLine2: "",
                    city: "",
                    state: "",
                    pinCode: "",
                    country: "",
                  });
                }
              }}
              className="text-[#DF9D43] text-xs font-juanaBold uppercase tracking-widest hover:underline"
            >
              {showForm ? "← Saved Addresses" : "+ Add New Address"}
            </button>
          </div>

          {!showForm ? (
            <div className="space-y-4">
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <div 
                    key={address._id}
                    onClick={() => setSelectedAddressId(address._id)}
                    className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedAddressId === address._id 
                        ? "border-[#6A4D6F] bg-[#6A4D6F]/5 shadow-md" 
                        : "border-gray-100 hover:border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedAddressId === address._id ? "border-[#6A4D6F]" : "border-gray-300"
                      }`}>
                        {selectedAddressId === address._id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#6A4D6F]" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="font-juanaSemibold text-gray-800 leading-tight">
                          {address.addressLine1}
                        </p>
                        {address.addressLine2 && (
                          <p className="text-gray-500 text-sm mt-1">{address.addressLine2}</p>
                        )}
                        <p className="text-gray-500 text-sm font-sans font-medium mt-2 italic px-2 py-0.5 bg-gray-50 rounded-md inline-block">
                          {address.city}, {address.state} - {address.pinCode}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                  <span className="text-3xl block mb-3">📍</span>
                  <p className="text-gray-400 font-juanaRegular text-sm">No saved addresses found.</p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">Building/Street</label>
                <input
                  type="text"
                  className={`w-full p-4 bg-gray-50 border rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-sans font-medium ${
                    errors.addressLine1 ? "border-red-300" : "border-transparent"
                  }`}
                  placeholder="Address Line 1"
                  value={newAddress.addressLine1}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                  required
                />
                {errors.addressLine1 && <p className="text-red-500 text-[10px] pl-1 font-juanaMedium">{errors.addressLine1}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">Area/Landmark (Optional)</label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-sans font-medium"
                  placeholder="Address Line 2"
                  value={newAddress.addressLine2}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">City</label>
                  <input
                    type="text"
                    className={`w-full p-4 bg-gray-50 border rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-sans font-medium ${
                      errors.city ? "border-red-300" : "border-transparent"
                    }`}
                    placeholder="E.g. Delhi"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    required
                  />
                  {errors.city && <p className="text-red-500 text-[10px] pl-1 font-juanaMedium">{errors.city}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">Pincode</label>
                  <input
                    type="text"
                    className={`w-full p-4 bg-gray-50 border rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-sans font-medium ${
                      errors.pinCode ? "border-red-300" : "border-transparent"
                    }`}
                    placeholder="6 Digits"
                    value={newAddress.pinCode}
                    onChange={(e) => setNewAddress({ ...newAddress, pinCode: e.target.value })}
                    required
                  />
                  {errors.pinCode && <p className="text-red-500 text-[10px] pl-1 font-juanaMedium">{errors.pinCode}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">State</label>
                  <input
                    type="text"
                    className={`w-full p-4 bg-gray-50 border rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-sans font-medium ${
                      errors.state ? "border-red-300" : "border-transparent"
                    }`}
                    placeholder="E.g. Delhi"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    required
                  />
                  {errors.state && <p className="text-red-500 text-[10px] pl-1 font-juanaMedium">{errors.state}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">Country</label>
                  <input
                    type="text"
                    className={`w-full p-4 bg-gray-50 border rounded-2xl transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/20 font-sans font-medium ${
                      errors.country ? "border-red-300" : "border-transparent"
                    }`}
                    placeholder="India"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    required
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-100 flex gap-4 bg-white sticky bottom-0">
          <button 
            onClick={onClose}
            className="flex-1 py-4 px-6 border border-gray-200 text-gray-500 font-juanaBold rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-widest text-xs"
          >
            Cancel
          </button>
          <Button
            text={showForm ? "Save & Proceed" : "Proceed"}
            onClick={handleSubmit}
            disabled={!selectedAddressId && !showForm}
            className={`flex-1 py-4 !h-auto uppercase tracking-widest text-xs font-sans font-bold ${
              !selectedAddressId && !showForm
                ? "!bg-gray-200 !text-gray-400 cursor-not-allowed border-none"
                : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
