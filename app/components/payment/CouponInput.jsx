"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CouponInput = ({ onCouponApply, productId }) => {
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [couponStatus, setCouponStatus] = useState("idle"); // idle, success, error

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}api/v1/user/applyCoupon`,
        { couponCode, productId },
        {
          headers: {
            "auth-token": window.localStorage.getItem("token"),
          },
        },
      );

      if (response.data.success) {
        setCouponStatus("success");
        toast.success("Coupon applied successfully!");
        onCouponApply({
          code: couponCode,
          discount: response.data.discountAmount || 0,
          status: "applied",
        });
      } else {
        setCouponStatus("error");
        toast.error(response.data.message || "Invalid coupon code");
        onCouponApply({
          code: couponCode,
          discount: 0,
          status: "rejected",
        });
      }
    } catch (error) {
      setCouponStatus("error");
      toast.error("Error applying coupon");
      onCouponApply({
        code: couponCode,
        discount: 0,
        status: "rejected",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-juanaBold text-gray-800 uppercase tracking-widest">
          Apply Coupon
        </h3>
        {couponStatus === "success" && (
          <span className="text-[10px] font-juanaBold text-green-600 uppercase tracking-widest animate-pulse">
            Applied!
          </span>
        )}
      </div>

      <div className="relative flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value.toUpperCase());
              setCouponStatus("idle");
            }}
            placeholder="ENTER CODE"
            className={`w-full p-4 bg-gray-50 border rounded-2xl font-juanaBold text-sm tracking-widest transition-all outline-none focus:bg-white focus:ring-2 ${
              couponStatus === "success"
                ? "border-green-500 text-green-700 bg-green-50/30"
                : couponStatus === "error"
                  ? "border-red-500 text-red-700 bg-red-50/30"
                  : "border-transparent focus:ring-[#6A4D6F]/20 text-[#6A4D6F]"
            }`}
          />
          {couponStatus !== "idle" && (
            <button
              onClick={() => {
                setCouponCode("");
                setCouponStatus("idle");
                onCouponApply(null);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        <button
          onClick={handleApplyCoupon}
          disabled={loading || !couponCode || couponStatus === "success"}
          className={`px-6 rounded-2xl font-juanaBold text-[10px] uppercase tracking-widest transition-all ${
            couponStatus === "success"
              ? "bg-green-100 text-green-700 cursor-default"
              : "bg-[#6A4D6F] text-white hover:bg-[#4b334f] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          }`}
        >
          {loading ? "..." : "Apply"}
        </button>
      </div>

      {couponStatus === "error" && (
        <p className="text-[10px] font-juanaMedium text-red-500 ml-1 uppercase tracking-wider">
          * This coupon is not applicable to your order
        </p>
      )}
    </div>
  );
};

export default CouponInput;
