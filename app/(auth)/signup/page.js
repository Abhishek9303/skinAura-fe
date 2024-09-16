"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

    const axios = require("axios");
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
            className="w-full max-w-md p-5 md:p-8 border-[0.5px] border-[#0000003b] shadow-md rounded-lg space-y-4"
            onSubmit={handleSubmit}
          >
            <h1 className="md:text-3xl text-2xl text-center text-gray-600 font-bold">
              Sign Up
            </h1>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Full Name
              </label>
              <input
                onChange={(e) => setData({ ...data, name: e.target.value })}
                type="text"
                placeholder="Full Name"
                name="name"
                className="w-full border-[0.5px] border-[#0000003b] shadow-md rounded-lg p-3"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Email
              </label>
              <input
                onChange={(e) => setData({ ...data, emailId: e.target.value })}
                type="email"
                placeholder="Email"
                name="emailId"
                className="w-full border-[0.5px] border-[#0000003b] shadow-md rounded-lg p-3"
              />
            </div>
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
                placeholder="Password (min 6 characters)"
                name="password"
                className="w-full mb-5 border-[0.5px] border-[#0000003b] shadow-md rounded-lg p-3"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#6A4D6F] text-white font-medium py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-gray-600 font-bold hover:underline"
              >
                Log In
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
