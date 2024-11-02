'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "@/store/user/userProfile";
import { toast } from "react-toastify";
const useAddToCart = () => {``
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [token, setToken] = useState(null);
  const { user } = useUserStore();
  useEffect(() => {
    let authToken = window.localStorage.getItem("token")
    if (authToken) {
      setToken(authToken);
    }
    else{
        toast.error("Please login to add to cart")
    }

  },[]);
  const addToCart = async (products) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `${process.env.BACKEND_URL}api/v1/user/addToCart`,
        JSON.stringify({ products }),
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token, // Replace with actual token or fetch from a context if dynamic
          },
          maxBodyLength: Infinity,
        }
      );
      setResponse(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      toast.success("Product added to cart successfully");
    }
  };

  return { addToCart, loading, error, response };
};

export default useAddToCart;
