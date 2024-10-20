import React, { useEffect, useState } from "react";
import RazorpayCheckout from "@/app/razorpay/RazorpayCheckout"; // Import Razorpay button
import Button from "@/app/components/button/Button"; // Import your custom Button component
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

const PaymentModal = ({
  isOpen,
  onClose,
  productId,
  quantity,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  selectedAddress, // Pass the selected address from the parent
}) => {
  const router = useRouter();
  const placeOrder = async (
    productId,
    quantity,
    shippingAddress,
    couponCode = ""
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/newOrder",
        {
          productId,
          quantity,
          couponCode,
          shippingAddress: selectedAddress,
        },
        {
          headers: {
            "auth-token": window.localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      // Show toast based on success/failure
      if (data.success) {
        toast.success("Order placed successfully!");
        onClose(); // Close the modal after successful order placement
      } else {
        toast.error("Failed to place order. Please try again.");
      }

      // Return the API response
      return data;
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Please try again.");
      throw error;
    }
  };

  const handlePaymentConfirm = async () => {
    if (selectedPaymentMethod === "cod" && selectedAddress) {
      try {
        const result = await placeOrder(
          productId,
          quantity,
          selectedAddress._id, // Use the selected address ID directly
          ""
        );
        console.log(result); // For debugging purposes
      } catch (error) {
        // Error toast will already be handled inside placeOrder
      }
    }
  };

  useEffect(() => {
    // Ensure selectedAddress is available
  }, [selectedAddress]);

  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-[80vw] md:w-[400px]">
        <h2 className="text-2xl font-medium mb-4">Confirm Payment</h2>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="cod"
              checked={selectedPaymentMethod === "cod"}
              onChange={() => setSelectedPaymentMethod("cod")}
            />
            <span className="ml-2">Cash on Delivery</span>
          </label>
          <label className="flex items-center mt-2">
            <input
              type="radio"
              value="online"
              checked={selectedPaymentMethod === "online"}
              onChange={() => setSelectedPaymentMethod("online")}
            />
            <span className="ml-2">Online Payment</span>
          </label>
        </div>

        <div className="flex justify-around mt-6">
          <Button
            text="Cancel"
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600"
          />
          {selectedPaymentMethod === "online" ? (
            <RazorpayCheckout productId={productId} quantity={quantity} />
          ) : (
            <Button text={"Buy Now"} onClick={() => handlePaymentConfirm()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
