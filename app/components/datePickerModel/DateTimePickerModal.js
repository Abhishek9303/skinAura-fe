import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { toast } from "react-toastify";

const timeSlots = ["12:00-2:00", "2:00-4:00", "4:00-6:00"];

const DateTimePickerModal = ({ isOpen, onClose }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [error, setError] = useState("");

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setError("");
  };

  const handleTimeSlotChange = (event) => {
    setTimeSlot(event.target.value);
  };

  const handleSubmit = () => {
    const today = new Date();
    if (date < today) {
      toast.error("Please select a valid date", {dark: true});
      return;
    }

    const formattedDate = format(date, "yyyy-MM-dd");
    const selectedData = {
      date: formattedDate,
      timeSlot,
    };
    onClose();
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
              Select Date and Time Slot
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
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DateTimePickerModal;
