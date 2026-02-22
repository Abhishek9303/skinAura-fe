import React from "react";

const CustomCards = ({ title, description, image, step, timeTaken }) => {
  return (
    <div className="group relative flex flex-col items-center bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      <div className="absolute top-0 right-0 p-8">
        <span className="text-6xl font-sans font-bold text-[#6A4D6F]/5 transition-colors group-hover:text-[#6A4D6F]/10">
          {step}
        </span>
      </div>

      <div className="relative z-10 w-full mb-8">
        <div className="w-16 h-1 w-full bg-gradient-to-r from-[#DF9D43] to-transparent rounded-full mb-6" />
        <h3 className="text-2xl font-juanaBold text-[#6A4D6F] mb-3">{title}</h3>
        <p className="text-gray-400 font-juanaMedium text-sm leading-relaxed max-w-[80%]">
          {description}
        </p>
      </div>

      <div className="relative w-full mt-auto flex items-end justify-between">
        <div className="w-24 h-24 overflow-hidden rounded-2xl bg-[#FCFBFA] p-2 border border-gray-50 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="text-right pb-2">
          <p className="text-[10px] font-juanaBold text-[#DF9D43] uppercase tracking-[0.2em]">
            Time
          </p>
          <p className="text-xs font-sans font-bold text-[#6A4D6F] uppercase tracking-widest mt-1">
            {timeTaken}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomCards;
