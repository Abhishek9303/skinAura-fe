"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import Button from "@/app/components/button/Button";

const SignIn = () => {
  const router = useRouter();
  const [data, setData] = useState({
    mobileNo: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // For form submission
  const [skeletonLoading, setSkeletonLoading] = useState(true); // For skeleton loader
  const [showPassword, setShowPassword] = useState(false); // For password visibility

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!data.mobileNo) {
      newErrors.mobileNo = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(data.mobileNo)) {
      newErrors.mobileNo = "Invalid phone number format";
      isValid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Start form submission loader
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.BACKEND_URL}api/v1/user/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      try {
        const response = await axios.request(config);
        if (response?.data?.status === true) {
          toast.success("Login Success", {
            theme: "dark",
          });
          localStorage.setItem("token", response.data.data);
          localStorage.setItem("isAuthenticate", "true");
          router.push("/");
        }
      } catch (error) {
        toast.error(error.response?.data?.data || "Something went wrong", {
          theme: "dark",
        });
      } finally {
        setLoading(false); // Stop form submission loader
      }
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

    if (localStorage.getItem("isAuthenticate") === "true") {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div
        className="hidden md:block h-full w-[40%] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
            onKeyPress={handleKeyPress} // Handle Enter key
          >
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-juanaBold text-[#6A4D6F]">
                Welcome Back
              </h1>
              <p className="text-[10px] font-juanaMedium text-gray-400 uppercase tracking-[0.2em]">
                Enter your credentials to continue
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                  Phone Number
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
                    className="w-full bg-gray-50 border border-transparent rounded-r-2xl p-4 transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 font-sans font-medium text-[#6A4D6F] outline-none"
                    maxLength="10"
                    value={data.mobileNo}
                  />
                </div>
                {errors.mobileNo && (
                  <p className="text-red-500 text-[10px] pl-1 font-sans font-medium">{errors.mobileNo}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest">
                    Password
                  </label>
                  <Link
                    href="/resetPassword"
                    className="text-[10px] font-sans font-bold text-[#DF9D43] uppercase tracking-widest hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <input
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 pr-12 transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 font-sans font-medium text-[#6A4D6F] outline-none"
                    value={data.password}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6A4D6F] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <RiEyeOffLine className="w-5 h-5" />
                    ) : (
                      <RiEyeLine className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[10px] pl-1 font-sans font-medium">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="space-y-6 pt-2">
              <Button
                text={loading ? "Authenticating..." : "Sign In"}
                onClick={handleSubmit}
                className="w-full !py-4 !h-auto uppercase tracking-widest text-xs font-sans font-bold shadow-xl shadow-[#6A4D6F]/20 rounded-2xl"
                disabled={loading}
              />
              
              <div className="text-center text-[11px] text-gray-400 uppercase tracking-widest">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-[#6A4D6F] font-bold hover:text-[#DF9D43] transition-colors"
                >
                  Join Us
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
