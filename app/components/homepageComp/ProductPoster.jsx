import React from "react";
import Button from "../button/Button";

const ProductPoster = () => {
  return (
    <div className="relative w-full max-w-[85vmax] mx-auto overflow-hidden rounded-[3rem] shadow-2xl group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6A4D6F]/60 to-transparent z-10" />
      <div className="productPoster h-[50vh] md:h-[25vmax] bg-[url('/images/productImage.png')] bg-center bg-cover flex items-center justify-start px-12 md:px-24 transition-transform duration-1000 group-hover:scale-105">
        <div className="relative z-20 flex flex-col items-start space-y-4 max-w-lg">
          <p className="text-[#DF9D43] font-juanaBold uppercase tracking-[0.25em] text-[10px]">
            Exclusive Offer
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-juanaBold text-white leading-tight">
            Subscribe <br /> & Save{" "}
            <span className="font-sans font-bold">15%</span>
          </h1>
          <p className="text-white/80 font-juanaMedium text-sm md:text-base leading-relaxed">
            Join our wellness program and get your personalized holistic kit
            delivered every month.
          </p>
          <div className="pt-4">
            <Button
              text={"Shop now"}
              className="px-10 py-5 bg-[#DF9D43] hover:bg-[#c98a35] text-white rounded-2xl font-juanaBold uppercase tracking-widest text-[10px] transition-all duration-300 shadow-xl shadow-[#DF9D43]/20 active:scale-95 border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPoster;
