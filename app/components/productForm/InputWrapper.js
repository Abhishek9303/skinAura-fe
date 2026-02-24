"use client";
import React from "react";

const InputWrapper = ({ label, icon: Icon, children }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
      {Icon && <Icon size={14} className="text-[#DF9D43]" />}
      {label}
    </label>
    {children}
  </div>
);

export default InputWrapper;
