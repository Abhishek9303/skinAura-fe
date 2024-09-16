// app/admin-login/page.js
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import adminStore from "@/store/admin/adminProfile";
const AdminLogin = () => {
  const router = useRouter();

  const [data, setData] = useState({
    mobileNo: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // For form submission
  const [skeletonLoading, setSkeletonLoading] = useState(true); // For skeleton loader

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
            className="w-full max-w-md p-8 border border-gray-300 shadow-md rounded-lg space-y-6"
            onSubmit={handleSubmit}
            onKeyPress={handleKeyPress} // Handle Enter key
          >
            <h1 className="md:text-3xl text-2xl text-center text-gray-800 font-bold">
              Admin Login
            </h1>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Mobile Number
              </label>
              <div className="flex">
                <span className="bg-gray-200 p-3 rounded-l-lg">+91</span>
                <input
                  onChange={(e) =>
                    setData({ ...data, mobileNo: e.target.value })
                  }
                  type="tel"
                  placeholder="1234567890"
                  name="mobileNo"
                  className="w-full border border-gray-300 shadow-md rounded-r-lg p-3"
                  maxLength="10"
                  value={data.mobileNo}
                />
              </div>
              {errors.mobileNo && (
                <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                onChange={(e) => setData({ ...data, password: e.target.value })}
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 shadow-md rounded-lg p-3"
                value={data.password}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-700 text-white font-medium py-2 rounded-lg shadow-md hover:bg-purple-800 transition duration-300"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default AdminLogin;
