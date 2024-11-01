import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/user/userProfile";

const RazorpayCheckout = ({ productId, quantity, selectedAddress }) => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [productData, setProductData] = useState({});
  const { user } = useUserStore();
  const [totalPrice, setTotalPrice] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();

  const fetchProductData = async (productId) => {
    if (!productId) {
      console.error("Product ID is not defined");
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.BACKEND_URL}api/v1/common/getProduct?productId=${productId}`
      );
      if (res.data) {
        setProductData(res.data.data);
        const calculatedTotalPrice = res.data.data.price * quantity;
        setTotalPrice(calculatedTotalPrice);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    fetchProductData(productId);

    if (typeof window !== "undefined") {
      const loadRazorpay = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => setRazorpayLoaded(true);
        script.onerror = () => {
          console.error("Failed to load Razorpay SDK.");
          toast.error("Failed to load Razorpay SDK. Please try again later.");
        };
        document.body.appendChild(script);
      };
      loadRazorpay();
    }
  }, [productId]);

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

      if (response.data) {
        toast.success("Payment verified successfully!");
        router.push("/profile");
      }
      else {
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

      // Step 2: Configure Razorpay options with handler function
      const options = {
        key:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
          "YOUR_TEST_RAZORPAY_KEY_ID",
        amount: `${totalPrice * 100}`,
        currency: orderData.data.currency || "INR",
        name: `${productData.name}`,
        description: `${productData.description}`,
        order_id: orderData.data.orderId, // Store this as orderCreationId
        handler: function (response) {
          const orderCreationId = orderData.data.orderId;
          const razorpayPaymentId = response.razorpay_payment_id;
          const razorpayOrderId = response.razorpay_order_id;
          const razorpaySignature = response.razorpay_signature;

          // Verify payment by passing all necessary fields
          verifyPayment(
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature
          );
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
    <button
      className={`bg-[#6A4D6F] hover:bg-[#4b334f] cursor-pointer flex items-center justify-center px-5 py-2 text-white md:px-12 md:py-3 text-[1.8vmax] md:text-[1.1vmax]`}
      onClick={buyNow}
    >
      Buy Now
    </button>
  );
};

export default RazorpayCheckout;
