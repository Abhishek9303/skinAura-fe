"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

const OrderHistoryTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderHistory = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${process.env.BACKEND_URL}api/v1/common/getOrder`,
        headers: {
          "auth-token": authToken,
        },
      };
      const res = await axios.request(config);
      if (res.data.status) {
        setOrders(res.data.data);
      } else {
        toast.error("Failed to retrieve order history.");
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
      toast.error("Error fetching order history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  if (loading) {
    return <p>Loading order history...</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="w-full overflow-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">Product Name</th>
            <th className="px-4 py-2 border">Order Date</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">
                <Link
                  href={`${process.env.BACKEND_URL}products/${order.productDetails._id}`}
                >
                  <a className="text-blue-500 hover:underline">
                    {order.productDetails.name}
                  </a>
                </Link>
              </td>
              <td className="px-4 py-2 border">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border">{order.quantity}</td>
              <td className="px-4 py-2 border">{`$${order.productDetails.price.toFixed(
                2
              )}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
