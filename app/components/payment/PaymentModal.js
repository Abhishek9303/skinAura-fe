import React, { useEffect, useState } from "react";
import RazorpayCheckout from "@/app/razorpay/RazorpayCheckout"; // Import Razorpay button
import Button from "@/app/components/button/Button"; // Import your custom Button component
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import CouponInput from "./CouponInput";

const PaymentModal = ({
  isOpen,
  onClose,
  productId,
  quantity,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  selectedAddress
}) => {
  const router = useRouter();
  const [couponData, setCouponData] = useState(null);
  const placeOrder = async (
    productId,
    quantity,
    shippingAddress,
    couponCode = ""
  ) => {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}api/v1/user/newOrder`,
        {
          productId,
          quantity,
          couponCode: couponData?.status === "applied" ? couponData.code : "",
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

      } catch (error) {
        // Error toast will already be handled inside placeOrder
      }
    }
  };

  useEffect(() => {
    // Ensure selectedAddress is available
  }, [selectedAddress]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300 border border-gray-100">
        
        {/* Header */}
        <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between bg-white relative">
          <div>
            <h2 className="text-2xl font-juanaBold text-[#6A4D6F]">Confirm Payment</h2>
            <p className="text-gray-400 text-[10px] font-juanaMedium uppercase tracking-widest mt-1">Choose your preferred payment method</p>
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

        {/* Content */}
        <div className="p-10 space-y-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
          {/* Shipping Notice Card */}
          <div className="bg-[#DF9D43]/5 border border-[#DF9D43]/20 p-5 rounded-2xl flex items-start gap-4">
            <span className="text-xl">🚚</span>
            <p className="text-[#6A4D6F] text-xs font-sans font-medium leading-relaxed">
              Orders below <span className="font-bold">₹1,000</span> attract a nominal shipping fee of <span className="font-bold">₹50</span>. Consider adding more to your cart for free shipping!
            </p>
          </div>

          {/* Coupon Section */}
          <CouponInput 
            productId={productId} 
            onCouponApply={(data) => setCouponData(data)} 
          />

          <div className="space-y-4">
            <h3 className="text-sm font-juanaBold text-gray-800 uppercase tracking-widest mb-4">Payment Options</h3>
            
            {/* Payment Method Cards */}
            <div className="grid grid-cols-1 gap-4">
              {/* COD Option */}
              <div 
                onClick={() => setSelectedPaymentMethod("cod")}
                className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedPaymentMethod === "cod" 
                    ? "border-[#6A4D6F] bg-[#6A4D6F]/5 shadow-md" 
                    : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">💵</div>
                    <div>
                      <p className="font-juanaBold text-[#6A4D6F]">Cash on Delivery</p>
                      <p className="text-[10px] text-gray-400 font-juanaMedium uppercase tracking-wider">Pay when you receive</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPaymentMethod === "cod" ? "border-[#6A4D6F]" : "border-gray-300"
                  }`}>
                    {selectedPaymentMethod === "cod" && (
                      <div className="w-3 h-3 rounded-full bg-[#6A4D6F]" />
                    )}
                  </div>
                </div>
              </div>

              {/* Online Option */}
              <div 
                onClick={() => setSelectedPaymentMethod("online")}
                className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedPaymentMethod === "online" 
                    ? "border-[#6A4D6F] bg-[#6A4D6F]/5 shadow-md" 
                    : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">💳</div>
                    <div>
                      <p className="font-juanaBold text-[#6A4D6F]">Online Payment</p>
                      <p className="text-[10px] text-gray-400 font-juanaMedium uppercase tracking-wider">UPI, Cards, Netbanking</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPaymentMethod === "online" ? "border-[#6A4D6F]" : "border-gray-300"
                  }`}>
                    {selectedPaymentMethod === "online" && (
                      <div className="w-3 h-3 rounded-full bg-[#6A4D6F]" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-10 border-t border-gray-100 flex flex-col gap-4 bg-gray-50/50">
          <div className="w-full h-14 relative">
            {selectedPaymentMethod === "online" ? (
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg shadow-[#6A4D6F]/20">
                <RazorpayCheckout 
                  productId={productId} 
                  quantity={quantity} 
                  selectedAddress={selectedAddress} 
                  couponCode={couponData?.status === "applied" ? couponData.code : ""}
                />
              </div>
            ) : (
              <Button 
                text="Confirm Purchase" 
                onClick={handlePaymentConfirm}
                className={`w-full h-full !py-0 !px-0 uppercase tracking-[0.2em] !text-xs !font-sans !font-bold !leading-none shadow-xl shadow-[#6A4D6F]/20 transition-all active:scale-95 rounded-2xl flex items-center justify-center ${
                  !selectedPaymentMethod ? "grayscale cursor-not-allowed opacity-50" : ""
                }`}
              />
            )}
          </div>
          
          <button 
            onClick={onClose}
            className="w-full py-2 text-gray-400 font-juanaBold uppercase tracking-widest text-[10px] hover:text-[#6A4D6F] transition-colors"
          >
            Go Back & Edit Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
