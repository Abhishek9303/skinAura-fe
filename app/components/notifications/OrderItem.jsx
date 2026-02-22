"use client";
import React from "react";
import Link from "next/link";
import { RiOrderPlayLine } from "@remixicon/react";

const OrderItem = ({ order, onClick }) => (
  <Link
    href="/profile"
    onClick={onClick}
    className="block p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg hover:shadow-[#6A4D6F]/5 transition-all border border-transparent hover:border-gray-100 group"
  >
    <div className="flex items-start gap-3">
      <div className="p-2 bg-green-100 rounded-xl text-green-600">
        <RiOrderPlayLine size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-sans font-bold text-[#6A4D6F] truncate">
          {order.productName}
        </p>
        <p className="text-[10px] text-gray-400 font-sans mt-0.5">
          Order #{order.id} • {order.date}
        </p>
        <span className="inline-block mt-2 px-2 py-0.5 bg-green-50 text-green-600 text-[8px] font-sans font-bold uppercase tracking-widest rounded-full border border-green-100">
          {order.status}
        </span>
      </div>
    </div>
  </Link>
);

export default OrderItem;
