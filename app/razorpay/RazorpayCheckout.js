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
}) => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [productData, setProductData] = useState({});
  const { user } = useUserStore();
  const [totalPrice, setTotalPrice] = useState(0); // Initialize totalPrice as 0
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
        return res.data.data; // Return product data
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const loadRazorpaySDK = () => {
    return new Promise((resolve, reject) => {
      if (razorpayLoaded) {
        resolve(); // SDK is already loaded
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        setRazorpayLoaded(true);
        resolve(); // SDK loaded successfully
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
      // Calculate total price if productArr is provided
      setTotalPrice(totalAmount);
    } else if (productId) {
      fetchProductData(productId).then((data) => {
        setProductData(data);
        setTotalPrice(data.price * quantity); // Calculate price for single product
      });
    }

    // Ensure Razorpay SDK is loaded
    loadRazorpaySDK().catch((error) => {
      console.error("Error loading Razorpay SDK:", error);
      toast.error("Failed to load Razorpay SDK. Please try again later.");
    });
  }, [productId, quantity, productArr]);

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
        amount: `${totalPrice * 100}`, // Amount in paise
        currency: orderData.data.currency || "INR",
        name: `${productData.name}`,
        description: `${productData.description}`,
        order_id: orderData.data.orderId, // Store this as orderCreationId
        handler: function (response) {
          const orderCreationId = orderData.data.orderId;
          const razorpayPaymentId = response.razorpay_payment_id;
          const razorpayOrderId = response.razorpay_order_id;
          const razorpaySignature = response.razorpay_signature;
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
