"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import OrderItem from "./OrderItem";
import MeetingItem from "./MeetingItem";

const NotificationDropdown = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        // API call placeholder
        // const response = await axios.get('/api/notifications');

        // Dummy Data implementation
        const dummyOrders = [
          {
            id: "ORD001",
            status: "Confirmed",
            date: "22 Feb 2024",
            productName: "Radiance Serum",
          },
          {
            id: "ORD002",
            status: "Confirmed",
            date: "20 Feb 2024",
            productName: "Hydrating Cleanser",
          },
        ];

        const dummyMeetings = [
          {
            id: "MTG001",
            expert: "Dr. Aisha",
            time: "10:30 AM",
            date: "24 Feb 2024",
            link: "https://meet.google.com/abc-defg-hij",
          },
          {
            id: "MTG002",
            expert: "Dr. Kabir",
            time: "02:00 PM",
            date: "26 Feb 2024",
            link: "https://meet.google.com/xyz-uvwx-yz",
          },
        ];

        setOrders(dummyOrders);
        setMeetings(dummyMeetings);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-4 w-[320px] md:w-[380px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Header Tabs */}
      <div className="flex border-b border-gray-50">
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex-1 py-4 text-[10px] uppercase tracking-widest font-sans font-bold transition-colors ${
            activeTab === "orders"
              ? "text-[#6A4D6F] bg-gray-50/50"
              : "text-gray-400 hover:text-[#6A4D6F]"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("meetings")}
          className={`flex-1 py-4 text-[10px] uppercase tracking-widest font-sans font-bold transition-colors ${
            activeTab === "meetings"
              ? "text-[#6A4D6F] bg-gray-50/50"
              : "text-gray-400 hover:text-[#6A4D6F]"
          }`}
        >
          Meetings
        </button>
      </div>

      {/* Content Area */}
      <div className="max-h-[400px] overflow-y-auto p-4 custom-scrollbar">
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-6 h-6 border-2 border-[#6A4D6F]/20 border-t-[#6A4D6F] rounded-full animate-spin"></div>
          </div>
        ) : activeTab === "orders" ? (
          <div className="space-y-3">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderItem key={order.id} order={order} onClick={onClose} />
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-xs font-sans text-gray-400 italic">
                  No confirmed orders found
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {meetings.length > 0 ? (
              meetings.map((meeting) => (
                <MeetingItem key={meeting.id} meeting={meeting} />
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-xs font-sans text-gray-400 italic">
                  No scheduled meetings
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-50 text-center">
        <Link
          href="/profile"
          onClick={onClose}
          className="text-[9px] font-sans font-bold text-[#DF9D43] uppercase tracking-[0.2em] hover:underline"
        >
          View All Activities
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;
