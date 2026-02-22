"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "@/app/components/product/Product";
import ProductImages from "@/app/components/swiper/ProductImages";
import ReviewSwiper from "@/app/components/swiper/ReviewSwiper";
import VideoDiv from "@/app/components/videoDiv/VideoDiv"; // Correct the import path if necessary
import Button from "@/app/components/button/Button";
import QuantityBtn from "@/app/components/quantityBtn/QuantityBtn";
import { useParams } from "next/navigation";
import PaymentModal from "@/app/components/payment/PaymentModal"; // Import the PaymentModal component
import AddressModal from "@/app/components/addressModal/AddressModal";
import withAuth from "@/store/user/userProtectionRoute";
import useUserStore from "../../../store/user/userProfile";
import useAddToCart from "@/app/components/hooks/useAddToCart";
import { set } from "date-fns";

const SingleProduct = () => {
  const { user } = useUserStore();
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [productImages, setProductImages] = useState({
    mainImage: "",
    otherImages: [],
    certificates: [],
  });
  const [otherProducts, setOtherProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { addToCart, loading, error, response } = useAddToCart();

  const handleAddToCart = () => {
    addToCart([{ productId, quantity }]);
  };

  const fetchProductData = async (productId) => {
    if (!productId) return;
    try {
      const res = await axios.get(`${process.env.BACKEND_URL}api/v1/common/getProduct`);
      if (res.data.success && Array.isArray(res.data.data)) {
        const product = res.data.data.find((p) => p._id === productId);
        if (product) {
          setProductData(product);
          setProductImages({
            mainImage: product.mainImage,
            otherImages: product.images,
            certificates: product.certificates,
          });
        }
        const allProducts = res.data.data.filter((p) => p._id !== productId);
        setOtherProducts(allProducts);
      }
    } catch (err) {
      console.error("Error fetching product data:", err);
    }
  };

  useEffect(() => {
    fetchProductData(productId);
  }, [productId]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleBuyNow = () => setIsAddressModalOpen(true);
  
  const handleAddressSave = (addressData) => {
    setSelectedAddress(addressData);
    setIsAddressModalOpen(false);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPaymentMethod("");
  };

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Left: Product Images */}
            <div className="w-full lg:w-[55%] sticky top-24">
              <div className="aspect-[4/5] md:aspect-[3/4] w-full">
                <ProductImages
                  productImages={productImages.mainImage}
                  otherImages={productImages.otherImages}
                />
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="w-full lg:w-[45%] flex flex-col pt-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#DF9D43] text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-gray-400 text-xs font-juanaMedium uppercase tracking-widest pl-2 border-l border-gray-200">
                  {productData?.rating || "4.9"} (128 Reviews)
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-juanaBold text-[#6A4D6F] mb-4 leading-tight">
                {productData?.name || "Skin Aura’s Glow Cream"}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <p className="text-2xl md:text-3xl font-juanaBold text-gray-900">
                  ₹{productData?.price}
                </p>
                <div className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                  In Stock
                </div>
              </div>

              <div className="space-y-6 mb-10 border-t border-gray-100 pt-8">
                <div>
                  <h3 className="text-sm font-juanaBold text-gray-800 uppercase tracking-widest mb-3">Description</h3>
                  <p className="text-gray-600 font-juanaRegular leading-relaxed">
                    {productData?.description || "Experience the perfect blend of Ayurveda and modern dermatology for radiant, youthful skin."}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <h3 className="text-sm font-juanaBold text-gray-800 uppercase tracking-widest mb-3">Quantity</h3>
                    <div className="flex items-center border border-gray-100 rounded-2xl overflow-hidden bg-white h-14 shadow-sm">
                      <button onClick={handleDecrement} className="w-14 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-[#6A4D6F] font-juanaBold text-lg">-</button>
                      <span className="w-10 h-full flex items-center justify-center font-juanaBold text-[#6A4D6F] border-x border-gray-50 bg-gray-50/30 text-sm">{quantity}</span>
                      <button onClick={handleIncrement} className="w-14 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-[#6A4D6F] font-juanaBold text-lg">+</button>
                    </div>
                  </div>
                  <div className="flex-grow pt-8">
                    <p className="text-[11px] text-gray-400 italic">
                      * 53 people ordered this in the last week
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  text={loading ? "Adding..." : "Add To Cart"}
                  className="flex-1 !py-5 !h-auto !text-[10px] sm:!text-xs uppercase tracking-[0.2em] !font-juanaBold !rounded-2xl shadow-lg shadow-[#6A4D6F]/20 transition-all active:scale-95"
                  onClick={handleAddToCart}
                />
                <Button
                  text="Buy Now"
                  onClick={handleBuyNow}
                  className="flex-1 !py-5 !h-auto !text-[10px] sm:!text-xs uppercase tracking-[0.2em] !font-juanaBold !rounded-2xl !bg-transparent !text-[#6A4D6F] border-2 border-[#6A4D6F] hover:!bg-[#6A4D6F] hover:!text-white transition-all duration-300 active:scale-95 shadow-lg shadow-gray-100/50"
                />
              </div>

              {/* USP Section */}
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
                {[
                  { icon: "🌿", label: "Natural" },
                  { icon: "🧪", label: "Derm Tested" },
                  { icon: "🐰", label: "Cruelty Free" }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <span className="text-2xl block mb-2">{item.icon}</span>
                    <span className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Info Card */}
          <div className="mt-24 bg-[#6A4D6F]/5 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-juanaSemibold text-[#6A4D6F] mb-6">
                The Holistic Science for Skin Health
              </h2>
              <p className="text-gray-600 font-juanaRegular leading-relaxed text-sm md:text-base mb-8">
                Nourishes skin internally with essential supplements with a dosha imbalance, and poor blood flow. Inadequate sleep, diet, and lifestyle can cause an imbalance of hormones. Adaptogenic herbs in skin ras help restore that glow naturally.
              </p>
              <div className="flex items-center gap-4 text-green-600 font-juanaBold text-xs uppercase tracking-widest">
                <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">✓</span>
                Ayurveda + Dermatology + Nutrition
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6A4D6F]/20 to-transparent blur-2xl rounded-full"></div>
                <img
                  className="relative w-full drop-shadow-2xl"
                  src="/images/newImage.png"
                  alt="Product Benefits"
                />
              </div>
            </div>
          </div>

          {/* Certified Products Section */}
          <div className="mt-32 border-t border-gray-100 pt-20">
            <div className="text-center mb-16">
              <p className="text-[#DF9D43] font-juanaMedium uppercase tracking-[0.3em] text-[10px] mb-4">Quality Assurance</p>
              <h2 className="text-3xl md:text-[3.5vmax] font-juanaSemibold text-[#6A4D6F] leading-none mb-6">
                Certified Products
              </h2>
              <div className="w-16 h-1 bg-[#DF9D43] mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
              <VideoDiv
                text="Certificates"
                imgSrc="https://plus.unsplash.com/premium_photo-1713628398440-9d056ad0d468?q=80&w=2070&auto=format&fit=crop"
              />
            </div>
          </div>

          {/* Product Results Section */}
          {/* <div className="mt-32">
            <div className="text-center mb-16">
              <p className="text-[#DF9D43] font-juanaMedium uppercase tracking-[0.3em] text-[10px] mb-4">Success Stories</p>
              <h2 className="text-3xl md:text-[3.5vmax] font-juanaSemibold text-[#6A4D6F] leading-none mb-6">
                Our Product Results
              </h2>
              <p className="text-gray-400 font-juanaMedium italic text-sm">
                “We don't say it, our members say it”
              </p>
            </div>
            <div className="px-4">
              <ReviewSwiper perPage={"3"} />
            </div>
          </div> */}

          {/* Suggested Products Section */}
          <div className="mt-32 border-t border-gray-100 pt-20">
            <div className="text-center mb-16">
              <p className="text-[#DF9D43] font-juanaMedium uppercase tracking-[0.3em] text-[10px] mb-4">Complete your routine</p>
              <h2 className="text-3xl md:text-[3.5vmax] font-juanaSemibold text-[#6A4D6F] leading-none mb-6">
                Suggested Ones
              </h2>
            </div>
            {otherProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherProducts.map((product) => (
                  <Product
                    id={product._id}
                    productId={product._id}
                    key={product._id}
                    name={product.name}
                    imgSrc={product.images[0]}
                    price={product.price}
                    description={product.description}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddressSelect={handleAddressSave}
      />

      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        productId={productId}
        quantity={quantity}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        selectedAddress={selectedAddress}
      />
    </>
  );
};

export default withAuth(SingleProduct);
