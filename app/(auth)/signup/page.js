"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import Button from "@/app/components/button/Button";
import axios from "axios";

const Signup = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    emailId: "",
    mobileNo: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions
  const [loading, setLoading] = useState(true); // To handle skeleton loading
  const [showPassword, setShowPassword] = useState(false); // For password visibility

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateMobileNo = (mobileNo) => {
    const re = /^[0-9]{10}$/;
    return re.test(mobileNo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!data.name || !data.emailId || !data.mobileNo || !data.password) {
      toast("All fields are required", { theme: "dark" });
      return;
    }

    // Validate email format
    if (!validateEmail(data.emailId)) {
      toast.error("Please enter a valid email address", { theme: "dark" });
      return;
    }

    // Validate mobile number
    if (!validateMobileNo(data.mobileNo)) {
      toast.error("Please enter a valid 10-digit mobile number", {
        theme: "dark",
      });
      return;
    }

    // Check if password length is at least 6 characters
    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        theme: "dark",
      });
      return;
    }

    // Prevent multiple submissions
    if (isSubmitting) {
      toast.warning("Please wait while we process your request", {
        theme: "dark",
      });
      return;
    }

    setIsSubmitting(true); // Set the submitting state to true

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.BACKEND_URL}api/v1/user/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.success === true) {
          toast.success("Registered Successfully. Please Login.", {
            theme: "dark",
          });
          router.push("/signin");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.data || "Something went wrong", {
          theme: "dark",
        });
      })
      .finally(() => {
        setIsSubmitting(false); // Allow further submissions after the request is finished
      });
  };

  // Simulate loading effect for skeleton
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulated loading delay of 1 second
  }, []);

  // Handle the "Enter" key press for form submission
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSubmit(e); // Trigger form submission
      }
    };

    // Attach event listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [data]); // Dependency array with 'data'

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
        {loading ? (
          <div className="w-full max-w-md">
            <Skeleton height={600} count={1} className="mb-4" />
          </div>
        ) : (
          <form
            className="w-full max-w-md p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-50 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-juanaBold text-[#6A4D6F]">
                Create Account
              </h1>
              <p className="text-[10px] font-juanaMedium text-gray-400 uppercase tracking-[0.2em]">
                Join our premium wellness community
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <input
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  type="text"
                  placeholder="John Doe"
                  name="name"
                  className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 font-sans font-medium text-[#6A4D6F] outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  onChange={(e) => setData({ ...data, emailId: e.target.value })}
                  type="email"
                  placeholder="john@example.com"
                  name="emailId"
                  className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 font-sans font-medium text-[#6A4D6F] outline-none"
                />
              </div>

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
                    name="password"
                    className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 pr-12 transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 font-sans font-medium text-[#6A4D6F] outline-none"
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
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <Button
                text={isSubmitting ? "Creating Account..." : "Sign Up"}
                onClick={handleSubmit}
                className="w-full !py-4 !h-auto uppercase tracking-widest text-xs font-sans font-bold shadow-xl shadow-[#6A4D6F]/20 rounded-2xl"
                disabled={isSubmitting}
              />
              
              <div className="text-center text-[11px] text-gray-400 uppercase tracking-widest">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-[#6A4D6F] font-bold hover:text-[#DF9D43] transition-colors"
                >
                  Log In
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
