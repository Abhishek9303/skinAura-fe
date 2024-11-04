"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { toast } from "react-toastify";
import useUserStore from "../../../store/user/userProfile";
const timeSlots = ["12:00 - 2:00", "2:00 - 4:00", "4:00 - 6:00"];

const DateTimePickerModal = ({ isOpen, onClose }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // For loader
  const { clearUser } = useUserStore();
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setError("");
  };

  const handleTimeSlotChange = (event) => {
    setTimeSlot(event.target.value);
  };

  const handleSubmit = () => {
    const today = new Date();
    const selectedDate = new Date(date.setHours(0, 0, 0, 0)); // Only compare the date part

    // If the selected date is today, validate the time slot
    if (selectedDate.getTime() === today.setHours(0, 0, 0, 0)) {
      const currentTime = today.getHours();
      const [startHour] = timeSlot.split("-")[0].split(":");

      // Check if the current time is earlier than the start of the selected time slot
      if (currentTime >= parseInt(startHour, 10)) {
        toast.error("Please select a valid time slot for today");
        return;
      }
    } else if (selectedDate < today) {
      // If selected date is before today, show error
      toast.error("Please select a valid date");
      return;
    }

    setIsLoading(true); // Start loader

    const axios = require("axios");
    let data = JSON.stringify({
      meetingTime: timeSlot,
      meetingDate: format(date, "yyyy-MM-dd"),
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.BACKEND_URL}api/v1/user/createMeeting`,
      headers: {
        "auth-token": window.localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.success === true) {
          toast.success("Meeting scheduled successfully");
        } else {
          toast.error(response.data.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          clearUser();
          window.localStorage.removeItem("token");
          window.location.href = "/signin";
          toast.error("Please login to schedule a meeting");
          return;
        }
        if (error.response.data.data.length > 0) {
          toast.warn(error.response.data.data, { theme: "dark" });
          return;
        }
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loader
        onClose();
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-40 ">
      <div className="bg-gray-800 p-4 md:p-6 flex flex-col items-center rounded-lg shadow-lg relative w-full max-w-5xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ❌
        </button>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:w-4/5 w-11/12">
          <div className="flex-grow flex flex-col justify-center">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Choose Date and Time Slot
            </h2>
            <div className="w-full md:w-auto h-80vh">
              <Calendar
                onChange={handleDateChange}
                value={date}
                minDate={new Date()}
                className="bg-gray-900 w-full max-w-full"
              />
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-64 mt-4 md:mt-0 flex flex-col justify-center">
            <label className="block text-sm font-medium mb-2 text-white">
              Select Time Slot:
            </label>
            <select
              value={timeSlot}
              onChange={handleTimeSlotChange}
              className="block border border-gray-600 rounded-md p-2 bg-gray-700 text-white w-full"
            >
              <option value="" disabled>
                Select a slot
              </option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-2/5 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Scheduling..." : "Schedule Meeting"}
        </button>
      </div>
    </div>
  );
};

export default DateTimePickerModal;
