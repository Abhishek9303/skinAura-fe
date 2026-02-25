// app/admin-login/page.js
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import Button from "@/app/components/button/Button";
const AdminLogin = () => {
  const router = useRouter();

  const [data, setData] = useState({
    mobileNo: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // For form submission
  const [skeletonLoading, setSkeletonLoading] = useState(true); // For skeleton loader
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!data.mobileNo) {
      toast.error("Mobile number is required", { theme: "dark" });
      isValid = false;
    } else if (!/^\d{10}$/.test(data.mobileNo)) {
      toast.error("Mobile number must be 10 digits", { theme: "dark" });
      isValid = false;
    }

    if (!data.password) {
      toast.error("Password is required", { theme: "dark" });
      isValid = false;
    } else if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters", { theme: "dark" });
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Start form submission loader

      // Replace with your actual API endpoint
      console.log(process.env.BACKEND_URL, "/api/v1/admin/login");
      let config = {
        method: "post",
        url: `${process.env.BACKEND_URL}api/v1/admin/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      try {
        const response = await axios.request(config);
        if (response?.data?.status === true) {
          toast.success("Login Successful", {
            theme: "dark",
          });
          localStorage.setItem("token", response?.data?.data);
          localStorage.setItem("isAuthenticated", "true");
          router.push("/admin");

        }
      } catch (error) {
        toast.error(error || "Something went wrong", {
          theme: "dark",
        });
      } finally {
        setLoading(false); // Stop form submission loader
      }
    } else {
      // Display validation errors
      Object.values(errors).forEach((error) =>
        toast.error(error, { theme: "dark" })
      );
    }
  };

  // Handle "Enter" key press for form submission
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    // Simulate skeleton loading delay
    setTimeout(() => setSkeletonLoading(false), 1000);

    if (localStorage.getItem("isAuthenticated") === "true") {
      router.push("/admin");
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div
        className="hidden md:block h-full w-[40%] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=1887&auto=format&fit=crop')",
        }}
      ></div>
      <div className="flex items-center justify-center w-full md:w-[60%] p-5 md:p-12">
        {skeletonLoading ? (
          <div className="w-full max-w-md">
            <Skeleton height={400} count={1} className="mb-4" />
          </div>
        ) : (
          <form
            className="w-full max-w-md p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-50 space-y-8"
            onSubmit={handleSubmit}
            onKeyPress={handleKeyPress}
          >
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-juanaBold text-[#6A4D6F]">
                Admin Access
              </h1>
              <p className="text-[10px] font-juanaMedium text-gray-400 uppercase tracking-[0.2em]">
                Enter your credentials to continue
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px]  text-gray-400 uppercase tracking-widest ml-1">
                  Mobile Number
                </label>
                <div className="flex group">
                  <span className="bg-gray-50 border-r-0 border-transparent p-4 rounded-l-2xl font-sans font-bold text-[#6A4D6F] text-sm">
                    +91
                  </span>
                  <input
                    onChange={(e) =>
                      setData({ ...data, mobileNo: e.target.value })
                    }
                    type="tel"
                    placeholder="1234567890"
                    name="mobileNo"
                    className="w-full bg-gray-50 border border-transparent rounded-r-2xl p-4 transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 font-sans font-medium text-[#6A4D6F]"
                    maxLength="10"
                    value={data.mobileNo}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative group">
                  <input
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 pr-12 transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 font-sans font-medium text-[#6A4D6F]"
                    value={data.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6A4D6F] transition-colors"
                  >
                    {showPassword ? (
                      <RiEyeOffLine className="w-5 h-5" />
                    ) : (
                      <RiEyeLine className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button
                text={loading ? "Authenticating..." : "Sign In"}
                onClick={handleSubmit}
                className="w-full !py-4 !h-auto uppercase tracking-widest text-xs font-sans font-bold shadow-xl shadow-[#6A4D6F]/20 rounded-2xl"
              />
            </div>
          </form>
        )}
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default AdminLogin;
