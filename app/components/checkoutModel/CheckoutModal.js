// components/modal/CheckoutModal.js
import React, { useMemo } from "react";
import Button from "../button/Button";

const CheckoutModal = ({ isOpen, onClose, cartProducts, onProceedToPay }) => {
  if (!isOpen) return null;

  // Calculate total amount based on cartProducts with updated quantities
  const totalAmount = useMemo(() => {
    return cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }, [cartProducts]);

  // Handle the Proceed to Pay button click
  const handleProceed = () => {
    // Log product details
    cartProducts.forEach((product) => {
      console.log(`Product ID: ${product._id}, Quantity: ${product.quantity}`);
    });
    onProceedToPay(); // Call the parent-provided function to handle further steps
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[80vw] max-w-md p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <button onClick={onClose} className="text-xl font-semibold">
            ×
          </button>
        </div>

        {/* Disabled Coupon Input */}
        <input
          type="text"
          placeholder="Coupon Code (Available Soon)"
          disabled
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
        />

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

        <div className="mt-6 flex justify-end">
          <Button
            text="Proceed to Pay"
            onClick={handleProceed}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
