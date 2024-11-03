'use client';
import axios from "axios";
import React, { useEffect } from "react";
const ViewOrderModal = ({ order, onClose }) => {
  const fetchOrderDetails = async (orderID) => {
    try {
      let res = await axios.get(
        `${process.env.BACKEND_URL}api/v1/common/getOrder?orderId=${orderID}`,
        {
          headers: {
            "auth-token": admin.token,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  useEffect(() => {
   
    fetchOrderDetails(order._id.orderID);
  },[order])
  const { userData, orders, products } = order;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Order Details</h2>

        {/* General Order Details */}
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Field</th>
              <th className="border border-gray-300 p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Name</td>
              <td className="border border-gray-300 p-2">{userData.name}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Phone Number</td>
              <td className="border border-gray-300 p-2">
                {userData.mobileNo}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Address</td>
              <td className="border border-gray-300 p-2">
                {`${orders.shippingAddress.addressLine1}, ${orders.shippingAddress.city}, ${orders.shippingAddress.state}, ${orders.shippingAddress.country}`}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Payment Mode</td>
              <td className="border border-gray-300 p-2">
                {orders.paymentMode}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Order Status</td>
              <td className="border border-gray-300 p-2">{orders.status}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Order Date</td>
              <td className="border border-gray-300 p-2">
                {new Date(orders.orderDate).toLocaleDateString()}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Payment Status</td>
              <td className="border border-gray-300 p-2">
                {orders.paymentStatus}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Product Details */}
        <h3 className="text-md font-semibold mb-2">Products</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">{products.name}</td>
              <td className="border border-gray-300 p-2">{orders.quantity}</td>
              <td className="border border-gray-300 p-2">{products.price}</td>
              <td className="border border-gray-300 p-2">
                {orders.quantity * products.price}
              </td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={onClose}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewOrderModal;
