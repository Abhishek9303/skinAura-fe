'use client';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/user/userProfile";

const RazorpayCheckout = ({
  productId,
  quantity,
  selectedAddress,
  productArr,
  cartId,
  totalAmount,
  couponCode = "",
  couponDiscount = 0,
}) => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [productData, setProductData] = useState({
    name: "Cart",
    description: "Cart",
  });
  const { user } = useUserStore();
  const [singleProductPrice, setSingleProductPrice] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0); // For multiple products
  const [token, setToken] = useState(null);
  const router = useRouter();

  const fetchProductData = async (id) => {
    if (!id) {
      console.error("Product ID is not defined");
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.BACKEND_URL}api/v1/common/getProduct?productId=${id}`
      );
      if (res.data) {
        return res.data.data;
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const loadRazorpaySDK = () => {
    return new Promise((resolve, reject) => {
      if (razorpayLoaded) {
        resolve(); 
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        setRazorpayLoaded(true);
        resolve(); 
      };
      script.onerror = () => {
        reject(new Error("Failed to load Razorpay SDK."));
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (productArr && productArr.length > 0) {
      console.log(
        "Product Array:",
        productArr,
        "Total Cart Amount:",
        totalAmount
      );
      setCartTotalPrice(totalAmount);
    } else if (productId) {
      fetchProductData(productId).then((data) => {
        setProductData(data);
        let calculatedPrice = data.price * quantity;
        console.log("Single Product Price Calculation:", calculatedPrice);
        setSingleProductPrice(calculatedPrice);
      });
    }

    loadRazorpaySDK().catch((error) => {
      console.error("Error loading Razorpay SDK:", error);
      toast.error("Failed to load Razorpay SDK. Please try again later.");
    });
  }, [productId, quantity, productArr, totalAmount]);

  const verifyPayment = async (
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature
  ) => {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}api/v1/user/verifyPayment`,
        {
          orderCreationId,
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Payment verified successfully!");
        router.push("/profile");
      } else {
        toast.error("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Payment verification failed. Please contact support.");
    }
  };

  const buyNow = async () => {
    if (!razorpayLoaded) {
      toast.error("Razorpay SDK is not loaded. Please try again later.");
      return;
    }

    try {
      // Step 1: Create order on backend
      const orderResponse = await axios.post(
        `${process.env.BACKEND_URL}api/v1/user/createRazorpayOrder`,
        {
          productId: productArr ? null : productId, // Null if it's an array
          productArr: productArr || [{ productId, quantity }], // If it's an array of products
          quantity: productArr ? undefined : quantity, // Only set for single product
          shippingAddress: selectedAddress,
          cartId, // Include cartId for backend processing
          couponCode,
        },
        {
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      const orderData = orderResponse.data;
      const razorpayOrderId = orderData.orderId;
      if (!orderData.success) {
        toast.error("Failed to create order. Please try again.");
        return;
      }

      let amountToCharge = productArr ? cartTotalPrice : singleProductPrice;
      amountToCharge = amountToCharge - couponDiscount;
      
      if(parseInt(amountToCharge) <= 1000){
        amountToCharge = parseInt(amountToCharge) + 50;
      }
      console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,"keys of razorpay")
      const options = {
        key:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
          "YOUR_TEST_RAZORPAY_KEY_ID",
        amount: amountToCharge * 100, 
        currency: orderData.data.currency || "INR",
        name: `${productData.name}`,
        description: `${productData.description}`,
        order_id: razorpayOrderId,
        handler: function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
          verifyPayment(
            razorpayOrderId,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
          );
        },
        prefill: {
          name: user.name,
          email: user.emailId,
          contact: user.mobileNo,
        },
        notes: {
          address: selectedAddress,
        },
        theme: {
          color: "#3399cc",
        },
      };
      console.log("Final Razorpay Options:", options); // Confirm amount is correct
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
    <button
      className="w-full h-full bg-[#6A4D6F] hover:bg-[#4b334f] text-white font-sans font-bold uppercase tracking-[0.2em] text-xs leading-none transition-all active:scale-95 flex items-center justify-center rounded-2xl border-none outline-none cursor-pointer"
      onClick={buyNow}
    >
      Complete Payment
    </button>
  );
};

export default RazorpayCheckout;
