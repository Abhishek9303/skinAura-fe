import React, { useEffect, useState } from "react";
import Script from "next/script";
import { toast } from "react-toastify";
import axios from "axios";

const RazorpayCheckout = ({ productId, quantity }) => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const buyNow = async () => {
    if (!razorpayLoaded) {
      toast.error("Razorpay SDK is not loaded. Please try again later.");
      return;
    }

    try {
      console.log("RazorpayCheckout - productId:", productId); // Debugging log
      const orderResponse = await axios.post(
        `${process.env.BACKEND_URL}api/v1/user/createRazorpayOrder`,
        {
          productId: productId,
          quantity: quantity,
        },
        {
          headers: {
            "auth-token": token,
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
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Your Product Name",
        description: "Test Transaction",
        order_id: orderData.order_id,
        handler: function (response) {
          alert(
            "Payment successful! Payment ID: " + response.razorpay_payment_id
          );
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#3399cc",
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
        onLoad={() => setRazorpayLoaded(true)}
        onError={() => {
          console.error("Failed to load Razorpay SDK.");
          toast.error("Failed to load Razorpay SDK. Please try again later.");
        }}
      />
      <button
        className={`bg-[#6A4D6F] hover:bg-[#4b334f] cursor-pointer flex items-center justify-center px-5 py-2 text-white md:px-12 md:py-3 text-[1.8vmax] md:text-[1.1vmax]`}
        onClick={buyNow} // Pass the function reference
      >
        Buy Now
      </button>
    </>
  );
};

export default RazorpayCheckout;
