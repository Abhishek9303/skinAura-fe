import React, { useEffect, useState } from "react";
import Script from "next/script";
import { toast } from "react-toastify";
import axios from "axios";
import useUserStore from "@/store/user/userProfile";

const RazorpayCheckout = ({ productId, quantity, selectedAddress }) => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [productData,setProductData] = useState({})
   const { user } = useUserStore();
   const [razorpayId,setRazorpayId] = useState("")
  const [totalPrice,setTotalPrice] = useState("")
  const [token, setToken] = useState(null);
   const fetchProductData = async (productId) => {
     if (!productId) {
       console.error("Product ID is not defined");
       return;
     }

     try {
       const res = await axios.get(
         `${process.env.BACKEND_URL}api/v1/common/getProduct?productId=${productId}`
       );
       if(res.data){
        setProductData(res.data.data);
        const totalPrice = res.data.data.price  * quantity
        setTotalPrice(totalPrice)
       }
     } catch (error) {
       console.error("Error fetching product data:", error);
     }
   };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    fetchProductData(productId)
  }, []);

  const buyNow = async () => {
    if (!razorpayLoaded) {
      toast.error("Razorpay SDK is not loaded. Please try again later.");
      return;
    }

    try {
      const orderResponse = await axios.post(
        `${process.env.BACKEND_URL}api/v1/user/createRazorpayOrder`,
        {
          productId: productId,
          quantity: quantity,
          shippingAddress: selectedAddress,
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
        amount: `${totalPrice * 100}`,
        currency: orderData.currency || "INR",
        name: `${productData.name}`,
        description: `${productData.description}`,
        order_id: orderData.order_id,
        handler: function (response) {
          console.log(response,"response");
          alert(
            "Payment successful! Payment ID: " + response.razorpay_payment_id
          );
          setRazorpayId(response.razorpay_payment_id);
        },
        prefill: {
          name: `${user.name}`,
          email: `${user.emailId}`,
          contact: `${user.mobileNo}`,
        },
        notes: {
          address: selectedAddress,
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
