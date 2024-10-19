import React, { useState } from "react";
import Script from "next/script";
import { toast } from "react-toastify"; // Ensure you have react-toastify installed
import axios from "axios"; // Import axios
import useUserStore from "../../store/user/userProfile";
import userProtectionRoute from "../../store/user/userProtectionRoute";
const RazorpayCheckout = ({ name, amount, productId, quantity }) => {
  
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { user } = useUserStore();
  
  const buyNow = async () => {
    if (!razorpayLoaded) {
      toast.error("Razorpay SDK is not loaded. Please try again later.");
      return;
    }

    try {
      // Call your backend to create a Razorpay order
      const orderResponse = await axios.post(
        "http://localhost:5000/api/v1/user/createRazorpayOrder",
        {
          productId: productId || "defaultProductId", // Ensure you pass the correct product ID
          quantity: quantity || 1, // Default quantity
        },
        {
          headers: {
            "auth-token": user.token, // Replace with your actual auth token
            "Content-Type": "application/json",
          },
        }
      );

      const orderData = orderResponse.data;

      if (!orderData.success) {
        toast.error("Failed to create order. Please try again.");
        return;
      }

      const options = {
        key:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
          "YOUR_TEST_RAZORPAY_KEY_ID",
        amount: orderData.amount, // Amount from order response
        currency: orderData.currency || "INR", // Use the currency from order response
        name: name || "Your Product Name",
        description: "Test Transaction",
        order_id: orderData.order_id, // Use the order ID from your API
        handler: function (response) {
          alert(
            "Payment successful! Payment ID: " + response.razorpay_payment_id
          );
          // Handle post-payment logic here (e.g., verification)
        },
        prefill: {
          name: "John Doe", // Customer's name (you can change this)
          email: "johndoe@example.com", // Customer's email
          contact: "9999999999", // Customer's phone number
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#3399cc", // Customize checkout color
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(
        "An error occurred while creating the order. Please try again."
      );
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => {
          console.log("Razorpay SDK loaded successfully.");
          setRazorpayLoaded(true);
        }}
        onError={() => {
          console.error("Failed to load Razorpay SDK.");
          toast.error("Failed to load Razorpay SDK. Please try again later.");
        }}
      />
      <button
        className={`bg-[#6A4D6F] hover:bg-[#4b334f] cursor-pointer flex items-center justify-center px-5 py-2 text-white md:px-12 md:py-3 text-[1.8vmax] md:text-[1.1vmax]`}
        onClick={buyNow}
      >
        Buy Now
      </button>
    </>
  );
};

export default userProtectionRoute(RazorpayCheckout);
