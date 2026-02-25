"use client";
import React, { useState, useEffect } from "react";
import MeetingApproval from "./adminComponent/MeetingApproval";
import ManageProducts from "./productComp/ProductManage";
import Skeleton from "react-loading-skeleton";
import adminStore from "@/store/admin/adminProfile";
import ProtectedAdmin from "@/store/admin/adminProtectedRoute";
import ManageOrder from "./adminComponent/ManageOrder";
import ManageServiceBooking from "./adminComponent/ManageServiceBooking";
import ManageDailyEntry from "./adminComponent/ManageDailyEntry";
import SearchPatient from "./adminComponent/searchPatient/searchPatient";
import ManageCoupons from "./adminComponent/ManageCoupons/ManageCoupons";
import SkeletonPage from "./SkeletonPage";
import { Toaster } from "@/components/ui/toaster";
import NotificationBell from "@/components/admin/NotificationBell";
import useOrderNotifications from "@/hooks/useOrderNotifications";
const tabs = [
  { id: 0, label: "Daily Entry", component: ManageDailyEntry },
  { id: 1, label: "Schedule Meeting", component: MeetingApproval },
  { id: 2, label: "Manage Product", component: ManageProducts },
  { id: 3, label: "Manage Orders", component: ManageOrder },
  { id: 4, label: "Manage Service Booking", component: ManageServiceBooking },
  { id: 5, label: "Get All Details", component: SearchPatient },
  { id: 6, label: "Manage Coupons", component: ManageCoupons },
];

const Page = () => {
  const { admin } = adminStore();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  // Initialize order notifications polling
  useOrderNotifications();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    const activeTabItem = tabs.find((tab) => tab.id === activeTab);
    if (!activeTabItem) return null;
    const Component = activeTabItem.component;
    return <Component />;
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Toaster />
      <div className="md:hidden flex justify-between items-center bg-slate-500 p-4">
        <h1 className="text-xl font-bold">Admin Page</h1>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <button
            className="p-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar visibility
          >
            {isSidebarOpen ? "Close Menu" : "Open Menu"}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "block" : "hidden"
          } md:block md:w-[25vw] p-5 h-full md:h-screen`}
      >
        <div className="mb-5 text-xl font-bold hidden md:flex items-center justify-between">
          <h1>Admin Page</h1>
          <NotificationBell />
        </div>
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-blue-200"
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-5 h-full">
        <div className="h-full w-full bg-white p-10 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">
            {tabs.find((tab) => tab.id === activeTab)?.label}
          </h2>
          {/* Render the active tab's component or the loader */}
          <div>{loading ? <SkeletonPage /> : renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedAdmin(Page);
