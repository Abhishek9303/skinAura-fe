"use client";
import React, { useState } from "react";
import MeetingApproval from "../../app/admin/adminComponent/MeetingApproval";
import ManageProducts from "./productComp/ProductManage";
import ManageOrders from "./adminComponent/ManageOrder";
import withAuth from "../../store/user/userProtectionRoute";
import Skeleton from "react-loading-skeleton";
import adminStore from "@/store/admin/adminProfile";

// Define components for each tab
const ScheduleMeeting = () => <div>Schedule Meeting Component</div>;
const ManageUser = () => <div>Manage User Component</div>;
const ManageSchedule = () => <div>Manage Schedule Component</div>;
const ManageProducts = () => <div>Manage Products </div>;
const tabs = [
  { id: 1, label: "Schedule Meeting", content: <MeetingApproval /> },
  { id: 2, label: "Manage Product", content: <ManageProducts /> },
  { id: 3, label: "Manage Orders", content: <ManageOrders /> },
  // { id: 3, label: "Manage Schedule", content: <ManageSchedule /> },
];

const Page = () => {
  const {admin} = adminStore();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Add this line

  // Function to render the content of the active tab
  const renderContent = () => {
    const activeContent = tabs.find((tab) => tab.id === activeTab);
    return activeContent ? activeContent.content : null;
  };

  return (
    <div className=" flex flex-col md:flex-row">
      {console.log(admin)}
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
          {/* Render the active tab's component */}
          <div>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Page,['admin']);
