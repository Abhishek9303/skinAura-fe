"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import useUserStore from "../../../store/user/userProfile";
import { RiCloseLine, RiCalendarLine, RiTimeLine, RiInformationLine } from "@remixicon/react";

const timeSlots = ["2:00-2:30", "2:30-3:00", "3:00-3:30", "3:30-4:00", "4:00-4:30", "4:30-5:00", "5:00-5:30", "5:30-6:00"];
const reasons = ["prp", "skin", "hair", "glow"];

const DateTimePickerModal = ({ isOpen, onClose, reason }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedReason, setSelectedReason] = useState(reason || "");
  const [isLoading, setIsLoading] = useState(false);
  const { clearUser } = useUserStore();
  const { toast } = useToast();

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSubmit = () => {
    if (!timeSlot) {
      toast({
        variant: "destructive",
        title: "Selection Required",
        description: "Please select a time slot.",
      });
      return;
    }

    if (reason && !selectedReason) {
       toast({
        variant: "destructive",
        title: "Reason Required",
        description: "Please select a reason for the meeting.",
      });
      return;
    }

    const today = new Date();
    const selectedDate = new Date(date.setHours(0, 0, 0, 0));

    if (selectedDate.getTime() === today.setHours(0, 0, 0, 0)) {
      const currentTime = today.getHours();
      const [startHour] = timeSlot.split("-")[0].split(":");
      if (currentTime >= parseInt(startHour, 10)) {
        toast({
          variant: "destructive",
          title: "Invalid Time Slot",
          description: "Please select a future time slot for today.",
        });
        return;
      }
    } else if (selectedDate < today) {
       toast({
        variant: "destructive",
        title: "Invalid Date",
        description: "Please select a valid future date.",
      });
      return;
    }

    setIsLoading(true);

    const axios = require("axios");
    let data = JSON.stringify({
      meetingTime: timeSlot,
      meetingDate: format(date, "yyyy-MM-dd"),
      reason: selectedReason,
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
          toast({
            title: "Success",
            description: "Meeting scheduled successfully",
          });
          onClose();
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: response.data.data || "Failed to schedule meeting",
          });
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          clearUser();
          window.localStorage.removeItem("token");
          window.location.href = "/signin";
          toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "Please login to schedule a meeting",
          });
          return;
        }
        toast({
          variant: "destructive",
          title: "Oops!",
          description: error.response?.data?.data || error.response?.data?.error || "Something went wrong",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen) {
      let token = window.localStorage.getItem("token");
      if (!token) {
        clearUser();
        window.location.href = "/signin";
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
      {/* Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300 border border-gray-100">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-2xl font-juanaBold text-[#6A4D6F]">Schedule Appointment</h2>
            <p className="text-gray-400 text-[10px] font-sans font-medium uppercase tracking-widest mt-1">Select your preferred date and time</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-400 transition-colors"
          >
            <RiCloseLine size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* Left Side: Calendar */}
          <div className="p-8 md:w-1/2 bg-gray-50/50 border-r border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-[#6A4D6F]">
              <RiCalendarLine size={20} />
              <h3 className="text-sm font-juanaBold uppercase tracking-wider">Select Date</h3>
            </div>
            <div className="calendar-container premium-calendar">
              <Calendar
                onChange={handleDateChange}
                value={date}
                minDate={new Date()}
                className="w-full border-none bg-transparent font-sans"
              />
            </div>
            
            {/* Custom Styles for react-calendar */}
            <style jsx global>{`
              .premium-calendar .react-calendar {
                background: transparent !important;
                border: none !important;
              }
              .premium-calendar .react-calendar__tile--active {
                background: #6A4D6F !important;
                border-radius: 12px;
                color: white !important;
              }
              .premium-calendar .react-calendar__tile--now {
                background: #6A4D6F/10 !important;
                border-radius: 12px;
                color: #6A4D6F !important;
                font-weight: bold;
              }
              .premium-calendar .react-calendar__tile:hover {
                background: #eee !important;
                border-radius: 12px;
              }
              .premium-calendar .react-calendar__navigation button:enabled:hover,
              .premium-calendar .react-calendar__navigation button:enabled:focus {
                background-color: #f3f4f6 !important;
                border-radius: 8px;
              }
              .premium-calendar .react-calendar__month-view__weekdays__weekday {
                text-decoration: none !important;
                font-size: 0.75rem;
                color: #9ca3af;
                font-weight: 600;
              }
            `}</style>
          </div>

          {/* Right Side: Slots & Reason */}
          <div className="p-8 md:w-1/2 space-y-8 flex flex-col justify-between h-auto overflow-y-auto custom-scrollbar">
            <div className="space-y-6">
              {/* Reason Selection (if active) */}
              {reason && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#6A4D6F]">
                    <RiInformationLine size={18} />
                    <h3 className="text-sm font-juanaBold uppercase tracking-wider">Reason for Visit</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {reasons.map((r) => (
                      <button
                        key={r}
                        onClick={() => setSelectedReason(r)}
                        className={`py-3 px-4 rounded-xl text-xs font-juanaBold uppercase tracking-wider transition-all border-2 ${
                          selectedReason === r 
                            ? "bg-[#6A4D6F] text-white border-[#6A4D6F] shadow-lg shadow-[#6A4D6F]/20" 
                            : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Time Slot Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#6A4D6F]">
                  <RiTimeLine size={18} />
                  <h3 className="text-sm font-sans font-bold uppercase tracking-wider">Available Slots</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`py-3 px-4 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all border-2 ${
                        timeSlot === slot 
                          ? "bg-[#6A4D6F] text-white border-[#6A4D6F] shadow-lg shadow-[#6A4D6F]/20" 
                          : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Footer Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full h-14 bg-[#6A4D6F] hover:bg-[#4b334f] text-white font-juanaBold uppercase tracking-[0.2em] text-xs leading-none shadow-xl shadow-[#6A4D6F]/20 transition-all active:scale-95 rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:grayscale"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Scheduling...</span>
                  </div>
                ) : "Confirm Appointment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePickerModal;
