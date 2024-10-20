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
          `${process.env.BACKEND_URL}common/getAddress`,
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
          `${process.env.BACKEND_URL}user/addAddress`,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[80vw] md:w-[400px] relative">
        <h2 className="text-2xl font-bold mb-4">Address</h2>

        {/* Button to add new address */}
        <div className="absolute top-4 right-4">
          <Button
            text={showForm ? "X" : "New Address"}
            onClick={() => {
              setShowForm((prev) => !prev);
              setSelectedAddressId(null); // Reset selected address when toggling
              if (showForm) {
                setNewAddress({
                  addressLine1: "",
                  addressLine2: "",
                  city: "",
                  state: "",
                  pinCode: "",
                  country: "",
                }); // Reset new address fields
              }
            }}
            className="rounded-lg"
          />
        </div>

        {/* Existing addresses */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Select Existing Address:</h3>
          {addresses.map((address) => (
            <label key={address._id} className="block mb-2">
              <input
                type="radio"
                value={address._id}
                checked={selectedAddressId === address._id} // Direct comparison with ID
                onChange={() => {
                  setSelectedAddressId(address._id); // Set only the ID
                  setShowForm(false); // Hide form if an existing address is selected
                }}
              />
              <span className="ml-2">
                {address.addressLine1}, {address.addressLine2}, {address.city},{" "}
                {address.state}, {address.pinCode}, {address.country}
              </span>
            </label>
          ))}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            <h3 className="text-lg font-medium mb-2">Add New Address:</h3>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Address Line 1"
              value={newAddress.addressLine1}
              onChange={(e) =>
                setNewAddress({ ...newAddress, addressLine1: e.target.value })
              }
              required
            />
            {errors.addressLine1 && (
              <p className="text-red-500">{errors.addressLine1}</p>
            )}
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Address Line 2"
              value={newAddress.addressLine2}
              onChange={(e) =>
                setNewAddress({ ...newAddress, addressLine2: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
              required
            />
            {errors.city && <p className="text-red-500">{errors.city}</p>}
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
              required
            />
            {errors.state && <p className="text-red-500">{errors.state}</p>}
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Pin Code"
              value={newAddress.pinCode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, pinCode: e.target.value })
              }
              required
            />
            {errors.pinCode && <p className="text-red-500">{errors.pinCode}</p>}
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Country"
              value={newAddress.country}
              onChange={(e) =>
                setNewAddress({ ...newAddress, country: e.target.value })
              }
              required
            />
            {errors.country && <p className="text-red-500">{errors.country}</p>}
          </form>
        )}

        <div className="flex justify-center">
          <Button
            text="Proceed"
            onClick={handleSubmit}
            disabled={!selectedAddressId && !showForm}
            className={`rounded-lg ${
              !selectedAddressId && !showForm
                ? "bg-gray-500 cursor-not-allowed"
                : ""
            }`}
          />
          <Button text="Cancel" onClick={onClose} className="rounded-lg ml-2" />
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
