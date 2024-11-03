import React, { useState } from "react";
import adminProtectedRoute from "@/store/admin/adminProtectedRoute";
const EditOrderModal = ({ order, onClose, onSave }) => {
  const [editedOrder, setEditedOrder] = useState({
    orderId: order._id.orderID.toString(), // Initialize with the order's ID
    status: order.orders.status,
    paymentStatus: order.orders.paymentStatus,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedOrder); // Send updated data including orderId
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit Order</h2>

        {/* Editable fields for order details */}
        <div className="mb-4">
          <label className="block mb-2">Order Status</label>
          <select
            name="status"
            value={editedOrder.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Payment Status</label>
          <select
            name="paymentStatus"
            value={editedOrder.paymentStatus}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="created">Created</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="p-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default adminProtectedRoute(EditOrderModal);
