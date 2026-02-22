"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/button/Button";
import { RiMailLine } from "@remixicon/react";

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
          toast.success("Reset Link sent to your email", {
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
    <div className="w-full h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-50 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-juanaBold text-[#6A4D6F]">
            Forgot Password
          </h1>
          <p className="text-[10px] font-juanaMedium text-gray-400 uppercase tracking-[0.2em]">
            Enter your email to receive a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <div className="relative group">
              <input
                onChange={(e) => setData({ ...data, email: e.target.value })}
                type="email"
                placeholder="john@example.com"
                className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 font-sans font-medium text-[#6A4D6F] outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[10px] pl-1 font-sans font-medium">{errors.email}</p>
            )}
          </div>

          <div className="space-y-6 pt-2">
            <Button
              text={loading ? "Sending..." : "Submit"}
              onClick={handleSubmit}
              className="w-full !py-4 !h-auto uppercase tracking-widest text-xs font-sans font-bold shadow-xl shadow-[#6A4D6F]/20 rounded-2xl"
              disabled={loading}
            />
            
            <div className="text-center text-[11px] text-gray-400 uppercase tracking-widest">
              Remember your password?{" "}
              <Link
                href="/signin"
                className="text-[#6A4D6F] font-bold hover:text-[#DF9D43] transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendToken;
