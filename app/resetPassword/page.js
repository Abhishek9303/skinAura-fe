"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SendToken = () => {
  const router = useRouter();
  const [data, setData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.BACKEND_URL}api/v1/common/forgetPassword`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ emailId: data.email }),
      };

      try {
        const response = await axios.request(config);
        if (response?.data?.status === true) {
          toast.success("Token sent to your email", {
            theme: "dark",
          });
          router.push("/signin");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send token", {
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-lg p-8 border-[0.5px] border-[#0000003b] shadow-md rounded-lg bg-white space-y-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-center text-gray-600 font-bold">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Enter your email
            </label>
            <input
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="email"
              placeholder="Email"
              className="w-full mb-5 border-[0.5px] border-[#0000003b] shadow-md rounded-lg p-3 text-sm md:text-base"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#6A4D6F] text-white font-medium py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 text-sm md:text-base"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendToken;
