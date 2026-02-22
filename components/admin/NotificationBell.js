"use client";
import React, { useState, useEffect, useRef } from "react";
import { RiBellLine, RiCloseLine, RiCheckLine } from "@remixicon/react";
import useNotificationStore from "@/store/admin/notificationStore";

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
    } = useNotificationStore();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMs = now - date;
        const diffInMinutes = Math.floor(diffInMs / 60000);
        const diffInHours = Math.floor(diffInMs / 3600000);
        const diffInDays = Math.floor(diffInMs / 86400000);

        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return date.toLocaleDateString();
    };

    const handleNotificationClick = (notification) => {
        if (!notification.read) {
            markAsRead(notification.id);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Icon Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Notifications"
            >
                <RiBellLine className="w-6 h-6 text-gray-700" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {/* Notification Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[500px] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Notifications
                        </h3>
                        {notifications.length > 0 && (
                            <div className="flex gap-2">
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-blue-600 hover:text-blue-800"
                                    title="Mark all as read"
                                >
                                    <RiCheckLine className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={clearAllNotifications}
                                    className="text-xs text-red-600 hover:text-red-800"
                                    title="Clear all"
                                >
                                    <RiCloseLine className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="overflow-y-auto flex-1">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <RiBellLine className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                <p>No notifications</p>
                            </div>
                        ) : (
                            <ul>
                                {notifications.map((notification) => (
                                    <li
                                        key={notification.id}
                                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.read ? "bg-blue-50" : ""
                                            }`}
                                        onClick={() => handleNotificationClick(notification)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1 pr-2">
                                                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                                                    {notification.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 mb-2">
                                                    {notification.message}
                                                </p>
                                                <span className="text-xs text-gray-400">
                                                    {formatTimestamp(notification.timestamp)}
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-1">
                                                {!notification.read && (
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                                                )}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeNotification(notification.id);
                                                    }}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    <RiCloseLine className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
