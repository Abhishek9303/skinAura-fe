"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ForgetPassword = () => {
  const params = useParams();
  const token = params.token;
  const router = useRouter();
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        url: `${process.env.BACKEND_URL}api/v1/common/resetPassword?token=${token}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { password: data.password },
      };

      try {
        const response = await axios.request(config);
        if (response?.data?.status === true) {
          toast.success("Password reset successful", {
            theme: "dark",
          });
          router.push("/signin");
        }
      } catch (error) {
        toast.error(error.response?.data?.data || "Something went wrong", {
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    setTimeout(() => setSkeletonLoading(false), 1000);
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
            onKeyPress={handleKeyPress}
          >
            <h1 className="md:text-3xl text-2xl text-center text-gray-600 font-bold">
              Reset Password
            </h1>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                New Password
              </label>
              <input
                onChange={(e) => setData({ ...data, password: e.target.value })}
                type="password"
                placeholder="New Password"
                className="w-full mb-5 border-[0.5px] border-[#0000003b] shadow-md rounded-lg p-3"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Confirm Password
              </label>
              <input
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
                type="password"
                placeholder="Confirm Password"
                className="w-full mb-5 border-[0.5px] border-[#0000003b] shadow-md rounded-lg p-3"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-[#6A4D6F] text-white font-medium py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
