"use client";
import React from "react";
import { RiCalendarEventLine, RiExternalLinkLine } from "@remixicon/react";

const MeetingItem = ({ meeting }) => (
  <div className="p-4 rounded-2xl bg-gray-50 hover:shadow-lg hover:shadow-[#6A4D6F]/5 transition-all border border-transparent">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
        <RiCalendarEventLine size={18} />
      </div>
      <div className="flex-1">
        <p className="text-xs font-sans font-bold text-[#6A4D6F]">
          Meeting with {meeting.expert}
        </p>
        <p className="text-[10px] text-gray-400 font-sans mt-0.5">
          {meeting.date} at {meeting.time}
        </p>
        <a
          href={meeting.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-[#6A4D6F] text-white text-[9px] font-sans font-bold uppercase tracking-widest rounded-xl hover:bg-[#4b334f] transition-colors"
        >
          Join Now <RiExternalLinkLine size={12} />
        </a>
      </div>
    </div>
  </div>
);

export default MeetingItem;
