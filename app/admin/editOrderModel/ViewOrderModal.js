'use client';
import React from "react";
import { RiCloseLine, RiUserLine, RiMapPinLine, RiMoneyDollarCircleLine, RiShoppingBag3Line, RiCalendarLine } from "@remixicon/react";

const InfoItem = ({ label, value, icon: Icon }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50">
    {Icon && (
      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#6A4D6F] flex-shrink-0">
        <Icon size={20} />
      </div>
    )}
    <div className="flex flex-col">
      <span className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest mb-1">{label}</span>
      <span className="text-sm font-juanaMedium text-[#6A4D6F] leading-snug">{value || "N/A"}</span>
    </div>
  </div>
);

const ViewOrderModal = ({ order, onClose }) => {
  if (!order) return null;
  const { userData, orders, products } = order;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#6A4D6F]/20 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div>
            <p className="text-[#DF9D43] font-juanaMedium uppercase tracking-[0.3em] text-[10px] mb-2">Order Archive</p>
            <h2 className="text-2xl font-juanaBold text-[#6A4D6F]">Order Details</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
          >
            <RiCloseLine size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
          {/* Customer & General Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem 
              icon={RiUserLine}
              label="Customer"
              value={userData.name}
            />
            <InfoItem 
              icon={RiCalendarLine}
              label="Order Date"
              value={<span className="font-sans font-bold">{new Date(orders.orderDate).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</span>}
            />
            <InfoItem 
              icon={RiMapPinLine}
              label="Shipping Address"
              value={`${orders.shippingAddress.addressLine1}, ${orders.shippingAddress.city}, ${orders.shippingAddress.state}, ${orders.shippingAddress.country}`}
            />
            <div className="grid grid-cols-1 gap-4">
               <InfoItem 
                icon={RiMoneyDollarCircleLine}
                label="Payment Status"
                value={`${orders.paymentMode} • ${orders.paymentStatus}`}
              />
            </div>
          </div>

          {/* Product Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-grow bg-gray-100"></div>
              <h3 className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">
                Items Purchased
              </h3>
              <div className="h-px flex-grow bg-gray-100"></div>
            </div>

            <div className="p-6 rounded-[2rem] border border-gray-100 bg-gray-50/30">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white p-2 shadow-sm border border-gray-100 overflow-hidden flex-shrink-0">
                  <img 
                    src={products.mainImage || "https://images.unsplash.com/photo-1556228578-8c19684568e0?q=80&w=1887&auto=format&fit=crop"} 
                    alt={products.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-juanaBold text-[#6A4D6F] text-lg mb-1">{products.name}</h4>
                  <p className="text-[10px] font-sans font-medium text-gray-400 uppercase tracking-widest mb-3 whitespace-nowrap">
                    Quantity: <span className="text-[#DF9D43] font-bold">{orders.quantity}</span>
                  </p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
                    <span className="text-xs font-sans font-medium text-gray-400">Unit Price</span>
                    <span className="font-sans font-bold text-[#6A4D6F]">₹{products.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Summary */}
          <div className="p-6 rounded-3xl bg-[#6A4D6F] text-white flex items-center justify-between shadow-xl shadow-[#6A4D6F]/20">
            <div>
              <p className="text-[10px] font-sans font-medium uppercase tracking-widest opacity-60 mb-1">Total Bill Amount</p>
              <h3 className="text-2xl font-sans font-bold leading-none">Order Total</h3>
            </div>
            <div className="text-right">
              <span className="text-3xl font-sans font-bold">₹{orders.quantity * products.price}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-100 bg-white sticky bottom-0 flex justify-end">
          <button
            onClick={onClose}
            className="px-10 py-4 bg-gray-50 text-gray-500 font-juanaBold rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-widest text-xs"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;


