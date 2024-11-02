"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "../button/Button";
import { RiDeleteBin4Fill } from "@remixicon/react";
import QuantityBtn from "../quantityBtn/QuantityBtn";

const Product = (props) => {
  const { productId, removeProduct, items, onQuantityChange, removeFromCart } =props;
      const handleRemoveProduct = () => {
        removeFromCart(productId); // Call the remove function with productId
      };
  const [quantity, setQuantity] = useState(items ? items : 1);
  const [productData, setProductData] = useState({});
  const router = useRouter();

  const openPage = () => {
    router.push("/products/" + productId);
  };

  const truncateName = (name) => {
    return name && name.length > 10 ? name.substring(0, 10) + "..." : name;
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
            `${process.env.BACKEND_URL}api/v1/common/getProduct?productId=${productId}`
          );
          if (res.data) {
            setProductData(res.data.data);
          } else {
            console.error("No data received for product ID:", productId);
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    };
    fetchProductDetails();
  }, [productId]);

  // Conditional rendering to ensure productData is ready
  if (!productData || Object.keys(productData).length === 0) {
    return <div>Loading...</div>; // Optional: You can add a loader or skeleton UI here
  }

  return (
    <div className="card relative mx-auto bg-white border-[1px] border-[#0000003b] shadow-md flex flex-col xs:min-w-[21vmax] h-min-[25vmax] rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="md:h-[4.5vh] md:w-[40%] md:py-2 md:px-1 py-1 md:rounded-br-lg bg-[#897F7F80] flex items-center justify-center">
          <div className="flex">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="md:text-[12px] text-[2vmax]">
                ⭐
              </span>
            ))}
          </div>
        </div>
        {removeProduct && (
          <div
            className="mx-3 text-red-400 cursor-pointer"
            onClick={handleRemoveProduct}
          >
            <RiDeleteBin4Fill />
          </div>
        )}
      </div>

      <div className="flex flex-col mx-auto py-1 md:mb-2 mb-1 items-center justify-around">
        <Link href={`/products/${productId}`}>
          <div className="min-w-[18vmax] min-h-[16vmax] m-2 rounded-md bg-gray-200 overflow-hidden">
            {productData.mainImage && (
              <img
                src={productData.mainImage}
                alt={productData.name}
                className="w-full h-[16vmax] object-cover" // Adjust height to fit your design
              />
            )}
          </div>
        </Link>
        <div className="text-center md:py-2">
          <h3 className="font-semibold md:text-[1.8vmax] text-[1.5vmax] text-gray-800">
            {truncateName(productData.name)}
          </h3>
          <p className="font-medium md:py-1 px-2 text-center text-[1.4vmax] lg:text-[1vmax] text-wrap text-gray-800">
            {productData.description}
          </p>
          <h1 className="font-bold md:py-1 md:mb-2 text-sm md:text-xl text-gray-800">
            &#8377; {productData.price}/-
          </h1>
          <div className="w-full flex items-center justify-center">
            {items && (
              <div className="w-full flex justify-center items-center">
                <QuantityBtn
                  quantity={quantity}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                />
              </div>
            )}
          </div>
          <div className="w-full mx-auto mt-4 flex items-center justify-center">
            <Button text={"Buy Now"} onClick={openPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
