"use client";
import { useEffect, useRef } from "react";
import axios from "axios";
import useNotificationStore from "@/store/admin/notificationStore";
import adminStore from "@/store/admin/adminProfile";

const useOrderNotifications = () => {
    const { addNotification } = useNotificationStore();
    const { admin } = adminStore();
    const lastOrderCountRef = useRef(null);
    const checkedOrderIdsRef = useRef(new Set());

    useEffect(() => {
        if (!admin?.token) return;

        const checkForNewOrders = async () => {
            try {
                const response = await axios.get(
                    `${process.env.BACKEND_URL}api/v1/common/getAllOrders`,
                    {
                        headers: {
                            "auth-token": admin.token,
                        },
                    }
                );

                const orders = response.data.data || [];

                // Initialize on first load
                if (lastOrderCountRef.current === null) {
                    lastOrderCountRef.current = orders.length;
                    // Store all existing order IDs to avoid showing notifications for them
                    orders.forEach(order => {
                        if (order._id) {
                            checkedOrderIdsRef.current.add(order._id);
                        }
                    });
                    return;
                }

                // Check for new orders
                if (orders.length > lastOrderCountRef.current) {
                    // Find new orders that we haven't seen before
                    const newOrders = orders.filter(
                        order => !checkedOrderIdsRef.current.has(order._id)
                    );

                    // Add notifications for each new order
                    newOrders.forEach((order) => {
                        addNotification({
                            title: "New Order Placed!",
                            message: `Order from ${order.userData?.name || "Customer"} - ₹${order.orders?.totalAmount || "N/A"}. Please process the order.`,
                            type: "order",
                            orderId: order._id,
                        });

                        // Mark this order as seen
                        checkedOrderIdsRef.current.add(order._id);
                    });

                    lastOrderCountRef.current = orders.length;
                }
            } catch (error) {
                console.error("Error checking for new orders:", error);
            }
        };

        // Initial check
        checkForNewOrders();

        // Poll every 30 seconds for new orders
        const intervalId = setInterval(checkForNewOrders, 30000);

        return () => clearInterval(intervalId);
    }, [admin?.token, addNotification]);
};

export default useOrderNotifications;
