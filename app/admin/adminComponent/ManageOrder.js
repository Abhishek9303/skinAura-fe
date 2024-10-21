import React, { useEffect, useState } from "react";
import axios from "axios";
import adminStore from "@/store/admin/adminProfile";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const {admin} = adminStore()
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/common/getProduct",
          {
            headers: {
              "auth-token":admin.token,
            },
          }
        );
        setOrders(response.data.orders); // Assuming 'orders' is part of the response
        setLoading(false);
      } catch (err) {
        setError("Error fetching orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleEdit = (orderId) => {
    // Add logic to handle order editing (e.g., show a modal or redirect to another page)
    console.log(`Edit order with ID: ${orderId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Manage Orders</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">{order.name}</h2>
            <p>
              <strong>Phone Number:</strong> {order.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Payment Mode:</strong> {order.paymentMode}
            </p>
            <p>
              <strong>Order Status:</strong> {order.orderStatus}
            </p>
            <button
              onClick={() => handleEdit(order._id)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Edit Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrder;
