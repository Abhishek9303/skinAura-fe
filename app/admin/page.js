"use client";
import React, { useState, useEffect } from "react";
import MeetingApproval from "../../app/admin/adminComponent/MeetingApproval";
import ManageProducts from "./productComp/ProductManage";
import Skeleton from "react-loading-skeleton";
import adminStore from "@/store/admin/adminProfile";
import ProtectedAdmin from "@/store/admin/adminProtectedRoute";
import ManageOrder from "./adminComponent/ManageOrder";
import ManageServiceBooking from "./adminComponent/ManageServiceBooking";
import ManageDailyEntry from "./adminComponent/ManageDailyEntry";
import SearchPatient from "./adminComponent/searchPatient/searchPatient";
import SkeletonPage from "./SkeletonPage";
import { Toaster } from "@/components/ui/toaster";
const tabs = [
  { id: 0, label: "Daily Entry" , content  : <ManageDailyEntry/> },
  { id: 1, label: "Schedule Meeting", content: <MeetingApproval /> },
  { id: 2, label: "Manage Product", content: <ManageProducts /> },
  { id: 3, label: "Manage Orders", content: <ManageOrder /> },
  { id: 4, label: "Manage Service Booking", content: <ManageServiceBooking /> },
  { id: 5, label: "Get All Details", content: <SearchPatient/> },
];

const Page = () => {
  const { admin } = adminStore();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  const renderContent = () => {
    const activeContent = tabs.find((tab) => tab.id === activeTab);
    return activeContent ? activeContent.content : null;
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Toaster />
      <div className="md:hidden flex justify-between items-center bg-slate-500 p-4">
        <h1 className="text-xl font-bold">Admin Page</h1>
        <button
          className="p-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar visibility
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block md:w-[25vw] p-5 h-full md:h-screen`}
      >
        <h1 className="mb-5 text-xl font-bold hidden md:block">Admin Page</h1>
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeTab === tab.id
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
