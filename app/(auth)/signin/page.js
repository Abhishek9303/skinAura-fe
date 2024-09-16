"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SignIn = () => {
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
            className="w-full max-w-md p-8 border-[0.5px] border-[#0000003b] shadow-md rounded-lg space-y-6"
            onKeyPress={handleKeyPress} // Handle Enter key
          >
            <h1 className="md:text-3xl text-2xl text-center text-gray-600 font-bold">
              Log In
            </h1>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Phone No
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
                  className="w-full border-[0.5px] border-[#0000003b] shadow-md rounded-r-lg p-3"
                  maxLength="10"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Password
              </label>
              <input
                onChange={(e) => setData({ ...data, password: e.target.value })}
                type="password"
                placeholder="Password"
                className="w-full mb-5 border-[0.5px] border-[#0000003b] shadow-md rounded-lg p-3"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-[#6A4D6F] text-white font-medium py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Signing in..." : "Login"}
            </button>
            <div className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-gray-600 font-bold hover:underline"
              >
                Sign Up
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
