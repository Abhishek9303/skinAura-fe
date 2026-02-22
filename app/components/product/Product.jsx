"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "../button/Button";
import { RiDeleteBin4Fill, RiShoppingBag3Line } from "@remixicon/react";
import QuantityBtn from "../quantityBtn/QuantityBtn";
import Skeleton from "react-loading-skeleton";

const Product = (props) => {
  const { productId, removeProduct, items, onQuantityChange, removeFromCart } =
    props;
  const [quantity, setQuantity] = useState(items ? items : 1);
  const [productData, setProductData] = useState({});
  const router = useRouter();

  const handleRemoveProduct = (e) => {
    e.stopPropagation();
    removeFromCart(productId);
  };

  const openPage = () => {
    router.push("/products/" + productId);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(productId, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    onQuantityChange(productId, newQuantity);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId) {
        try {
          const res = await axios.get(
            `${process.env.BACKEND_URL}api/v1/common/getProduct?productId=${productId}`,
          );
          if (res.data) {
            setProductData(res.data.data);
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    };
    fetchProductDetails();
  }, [productId]);

  if (!productData || Object.keys(productData).length === 0) {
    return (
      <div className="w-full max-w-sm rounded-[2rem] overflow-hidden p-4">
        <Skeleton height={350} className="rounded-2xl" />
        <div className="mt-4 space-y-2">
          <Skeleton height={24} width="70%" />
          <Skeleton height={16} width="40%" />
          <Skeleton height={40} className="rounded-xl mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative w-full h-full bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-3 sm:p-4 transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(106,77,111,0.15)] flex flex-col border border-gray-50 flex-grow">
      {/* Header Badges */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm border border-gray-100/50">
          <span className="text-[8px] sm:text-[10px] text-amber-500">★</span>
          <span className="text-[8px] sm:text-[10px] font-juanaBold text-[#6A4D6F]">
            4.9
          </span>
        </div>
        {removeProduct && (
          <button
            onClick={handleRemoveProduct}
            className="pointer-events-auto w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <RiDeleteBin4Fill className="w-3.5 h-3.5 sm:w-4 h-4" />
          </button>
        )}
      </div>

      {/* Image Section */}
      <Link
        href={`/products/${productId}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F8F6F8]"
      >
        {productData.mainImage && (
          <img
            src={productData.mainImage}
            alt={productData.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#6A4D6F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      {/* Content Section */}
      <div className="flex flex-col flex-grow pt-4 sm:pt-5 pb-1 sm:pb-2 px-1 sm:px-2">
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 mb-2">
            <h3 className="font-juanaSemibold text-[14px] sm:text-[18px] text-[#6A4D6F] leading-tight group-hover:text-[#DF9D43] transition-colors duration-300 line-clamp-1">
              {productData.name}
            </h3>
            <span className="font-juanaBold text-[13px] sm:text-[16px] text-gray-900 whitespace-nowrap">
              ₹{productData.price}
            </span>
          </div>

          <p className="font-juanaMedium text-[9px] sm:text-[11px] text-gray-400 uppercase tracking-widest line-clamp-1 mb-3 sm:mb-4">
            Skin Aura • Signature
          </p>
        </div>

        {/* Action Section */}
        <div className="mt-auto space-y-3 sm:space-y-4">
          {items && (
            <div className="flex justify-center py-1">
              <QuantityBtn
                quantity={quantity}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            </div>
          )}

          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
            <Button
              text={items ? "View Details" : "Buy Now"}
              onClick={openPage}
              className="w-full !py-3 sm:!py-4 !px-0 !h-auto !text-[8px] sm:!text-xs uppercase tracking-[0.2em] font-juanaBold transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
