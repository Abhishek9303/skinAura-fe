import React, { useState } from "react";
import Button from "@/app/components/button/Button";
import AddressModal from "@/app/components/addressModal/AddressModal"; // Adjust the import path as necessary
import RazorpayCheckout from "@/app/razorpay/RazorpayCheckout"; // Import RazorpayCheckout

const CheckoutModal = ({ isOpen, onClose, cartProducts, cartId }) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isRazorpayCheckoutOpen, setRazorpayCheckoutOpen] = useState(false); // State to manage Razorpay checkout

  // Prepare the product details in the required format
  const productDetails = cartProducts.map((product) => ({
    productId: product._id,
    quantity: product.quantity,
  }));

  // Calculate total amount based on cartProducts with updated quantities
  const totalAmount = cartProducts.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  // Handle the Proceed button click to open address modal
  const handleProceed = () => {
    setIsAddressModalOpen(true); // Open the AddressModal
  };

  // Handle address selection
  const handleAddressSelect = (addressDetails) => {
    setSelectedAddress(addressDetails); // Save the selected address details
    setIsAddressModalOpen(false); // Close the AddressModal
    console.log("Product Details:", productDetails); // Log the array of product details
    console.log("Selected Address Details:", addressDetails);
    console.log("Cart ID:", cartId); // Log selected address details
    setRazorpayCheckoutOpen(true);
  };

  if (!isOpen) return null; // Return null if modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[80vw] md:w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartProducts.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {product.quantity}
                </p>
                <p className="text-sm text-gray-600">Price: {product.price}</p>
              </div>
              <p className="font-medium">{product.price * product.quantity}</p>
            </div>
          ))}
        </div>

        {/* Display Total Amount */}
        <div className="mt-4 flex justify-between">
          <p className="font-medium">Total Amount:</p>
          <p className="font-semibold">{totalAmount}</p>
        </div>

        <div className="mt-6 flex items-center justify-center w-full">
          {!selectedAddress ? (
            <Button
              text="Proceed" // Show "Proceed" button to select address
              onClick={handleProceed} // Open Address Modal
              className="rounded-lg cursor-pointer"
            />
      ) : (
        <>
          {isRazorpayCheckoutOpen && (
            <RazorpayCheckout
              productArr={productDetails} // Pass the array of product details
              selectedAddress={selectedAddress} // Pass the selected address
              cartId={cartId} // Pass the cart ID
              totalAmount={totalAmount} // Pass the total amount
              onClose={() => setRazorpayCheckoutOpen(false)} // Function to close Razorpay checkout
            />
          )}
        </>
      )}
          <Button
            text="Cancel"
            onClick={onClose}
            className="rounded-lg ml-2 cursor-pointer"
          />
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddressSelect={handleAddressSelect}
        productDetails={productDetails} // Pass product details
      />

      {/* Razorpay Checkout */}
      
    </div>
  );
};

export default CheckoutModal;
