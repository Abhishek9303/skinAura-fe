import React, { useState } from "react";
import adminProtectedRoute from "@/store/admin/adminProtectedRoute";
import { RiCloseLine, RiListSettingsLine, RiShieldFlashLine } from "@remixicon/react";
import Button from "@/app/components/button/Button";

const EditOrderModal = ({ order, onClose, onSave }) => {
  const [editedOrder, setEditedOrder] = useState({
    orderId: order._id.orderID.toString(),
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
    onSave(editedOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#6A4D6F]/20 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[#DF9D43] font-juanaMedium uppercase tracking-[0.3em] text-[10px] mb-2">Management</p>
            <h2 className="text-2xl font-juanaBold text-[#6A4D6F]">Update Order</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
          >
            <RiCloseLine size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Order Status */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
              <RiListSettingsLine size={14} className="text-[#DF9D43]" />
              Order Status
            </label>
            <select
              name="status"
              value={editedOrder.status}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 font-juanaMedium text-[#6A4D6F] appearance-none cursor-pointer outline-none shadow-sm"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Payment Status */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
              <RiShieldFlashLine size={14} className="text-[#DF9D43]" />
              Payment Status
            </label>
            <select
              name="paymentStatus"
              value={editedOrder.paymentStatus}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 transition-all focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 font-juanaMedium text-[#6A4D6F] appearance-none cursor-pointer outline-none shadow-sm"
            >
              <option value="created">Created</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-100 flex gap-4 bg-white">
          <button
            onClick={onClose}
            className="flex-1 py-4 px-6 border border-red-50 text-red-400 font-juanaBold rounded-2xl hover:bg-red-50 transition-all uppercase tracking-widest text-[10px]"
          >
            Cancel
          </button>
          <Button
            text="Save"
            onClick={handleSave}
            className="flex-1 !py-4 !h-auto uppercase tracking-widest text-[10px] font-juanaBold shadow-xl shadow-[#6A4D6F]/20 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default adminProtectedRoute(EditOrderModal);

