"use client";
import React, { useEffect, useState } from "react";
import HomeSwiper1 from "./components/swiper/HomeSwiper1";
import ReviewSwiper from "./components/swiper/ReviewSwiper";
import Journey from "./components/homepageComp/Journey";
import ProductPoster from "./components/homepageComp/ProductPoster";
import InfluencerSection from "./components/homepageComp/InfluencerSection";
import Product from "./components/product/Product";
import Button from "./components/button/Button";
import Scroller from "../app/components/scroller/Scroller";
import VideoDiv from "./components/videoDiv/VideoDiv";
import CenterSwiper from "./components/centerSwiper/CenterSwiper";
import GoogleReviewSwiper from "./components/googleReviewSwiper/GoogleReviewSwiper";
import BeforeAfterReview from "./components/beforeAfter/BeforeAfterReview";
import { useToast } from "@/hooks/use-toast";
import useUserStore from "../store/user/userProfile";
import DateTimePickerModal from "./components/datePickerModel/DateTimePickerModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import Head from "next/head";
import { RiArrowRightLine, RiSparklingLine, RiLeafLine, RiFlaskLine } from "@remixicon/react";

const Page = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserStore();
  const [products, setProducts] = useState([]);
  const { toast } = useToast();

  const openModal = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      toast({
        title: "Authentication Required",
        description: "Please login to take the test",
      });
      router.push("/signin");
    }
  }
  const closeModal = () => setIsModalOpen(false);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}api/v1/common/getProduct`
      );
      if (response.data.success) {
        setProducts(response.data.data.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="bg-[#FCFBFA]">
      <Head>
        <title>Skin Aura | Holistic Skin & Hair Care</title>
        <meta property="og:title" content="Skin Aura" key="home" />
      </Head>

      {isModalOpen && (
        <DateTimePickerModal isOpen={isModalOpen} onClose={closeModal} />
      )}

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <HomeSwiper1 />
        <div className="bg-white/80 backdrop-blur-sm border-y border-gray-100">
          <Scroller />
        </div>
      </section>

      {/* Root Causes Section */}
      <section className="py-24 px-4 flex flex-col items-center justify-center animate-in fade-in duration-1000">
        <div className="max-w-5xl w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6A4D6F]/5 text-[#6A4D6F] text-[10px] font-juanaBold uppercase tracking-[0.2em] mb-4">
            <RiSparklingLine size={14} />
            Understanding Your Skin
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-juanaBold text-[#6A4D6F] leading-[1.1] tracking-tight">
            Bad Skin Has Multiple <br className="hidden md:block" /> Root Causes
          </h2>
          
          <div className="relative group mt-16 max-w-[85vmax] mx-auto rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src="/images/image01.webp"
              className="w-full h-auto aspect-[16/8] object-cover transition-transform duration-1000 group-hover:scale-105"
              alt="Root Causes of Skin Issues"
            />
          </div>

          <div className="flex justify-center mt-12">
            <button 
              onClick={openModal}
              className="group relative flex items-center gap-4 bg-[#6A4D6F] hover:bg-[#4b334f] text-white px-12 py-6 rounded-2xl font-juanaBold uppercase tracking-[0.2em] text-[10px] transition-all duration-300 shadow-2xl shadow-[#6A4D6F]/30 active:scale-95"
            >
              Take a Test Now
              <RiArrowRightLine size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Three Step Plan Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <span className="text-[#DF9D43] font-juanaBold uppercase tracking-[0.2em] text-[12px]">Our Holistic Approach</span>
                <h2 className="text-4xl md:text-5xl font-juanaBold text-[#1A1A1A]">Skin Aura’s Holistic <br />Three Step Plan</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: RiLeafLine, label: "AYURVEDA" },
                  { icon: RiSparklingLine, label: "DERMATOLOGY" },
                  { icon: RiFlaskLine, label: "NUTRITION" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center lg:items-start p-6 rounded-2xl bg-[#FCFBFA] border border-gray-100 hover:border-[#6A4D6F]/20 transition-all group">
                    <item.icon size={24} className="text-[#6A4D6F] group-hover:scale-110 transition-transform" />
                    <span className="mt-4 text-[10px] font-juanaBold text-gray-500 tracking-[0.1em]">{item.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-gray-400 font-juanaMedium leading-relaxed text-lg max-w-xl mx-auto lg:mx-0">
                Our approach combines the goodness of three sciences. With ingredients from the most authentic sources, we personalize your treatment delivering assured results.
              </p>

              <div className="flex justify-center lg:justify-start pt-4">
                <button 
                  onClick={openModal}
                  className="group flex items-center gap-3 text-[#6A4D6F] font-juanaBold uppercase tracking-widest text-[11px] hover:gap-5 transition-all"
                >
                  Learn More About Our Process
                  <RiArrowRightLine size={20} />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[#6A4D6F]/5 blur-3xl rounded-full scale-110" />
              <img 
                src="/images/image01.webp" 
                alt="Process Illustration" 
                className="relative z-10 rounded-[3rem] shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <Journey />
          <div className="mt-16 flex flex-col items-center space-y-4">
            <button onClick={openModal}>
              <Button text={"Start Your Journey Now"} className="px-14 py-6 rounded-2xl bg-[#6A4D6F] hover:bg-[#4b334f] !font-sans !font-bold !text-[10px] !tracking-[0.25em]" />
            </button>
            <p className="text-gray-400 text-[10px] font-sans font-medium uppercase tracking-widest leading-none">Takes only <span className="font-bold">2</span> minutes</p>
          </div>
        </div>
      </section>

      {/* Product Highlight Section */}
      <section className="relative py-12 md:h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[#6A4D6F]/5 scale-110 blur-3xl opacity-50 absolute -top-1/2" />
        </div>
        <div className="w-full relative z-10 px-4 md:px-0">
          <ProductPoster />
        </div>
      </section>

      {/* Testimonials / Before & After Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-juanaBold text-[#1A1A1A]">Our Transformation Stories</h2>
            <div className="w-20 h-1 bg-[#DF9D43] mx-auto rounded-full" />
            <p className="text-gray-400 font-juanaMedium uppercase tracking-widest text-[10px]">Real Results From Real Users</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <BeforeAfterReview
              beforeImage={`https://res.cloudinary.com/den1739gv/image/upload/v1735615338/before03_pa0dxf.jpg`}
              afterImage={`https://res.cloudinary.com/den1739gv/image/upload/v1735615348/after03_zgmdwn.jpg`}
              title="Clearer Complexion"
              name="Ananya Sharma"
              rating={5}
              date="Dec 2023"
              description="I was skeptical at first, but the holistic approach really worked for my skin. The inflammation is completely gone."
            />
            <BeforeAfterReview
              beforeImage={`https://res.cloudinary.com/den1739gv/image/upload/v1735615108/IMG_6567_czf1pj.jpg`}
              afterImage={`https://res.cloudinary.com/den1739gv/image/upload/v1735615145/IMG_6931_f5qcf6.jpg`}
              title="Hair Growth Success"
              name="Vikram Singh"
              rating={5}
              date="Jan 2024"
              description="The combination of Ayurveda and modern nutrition stopped my hair fall in just 2 months. Very impressed with the results."
            />
            <BeforeAfterReview
              beforeImage={`https://res.cloudinary.com/den1739gv/image/upload/v1735616539/IMG_3569_tv7s2q.png`}
              afterImage={`https://res.cloudinary.com/den1739gv/image/upload/v1735616562/IMG_3568_jabu6b.png`}
              title="Dullness Gone"
              name="Priya Patel"
              rating={4}
              date="Feb 2024"
              description="My skin feels much more hydrated and the natural glow has returned. The personalized plan made all the difference."
            />
          </div>
        </div>
      </section>

      {/* Featured Products / Must Haves */}
      <section className="py-24 bg-[#FCFBFA]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-juanaBold text-[#6A4D6F]">The Must Haves</h2>
            <p className="text-gray-400 font-juanaMedium uppercase tracking-widest text-[10px]">Clinically Proven & Naturally Sourced</p>
          </div>

          {products.length > 0 && (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 px-4 md:px-0">
              {products.map((product) => (
                <div key={product._id} className="animate-in fade-in slide-in-from-bottom-10 duration-700">
                  <Product
                    id={product._id}
                    productId={product._id}
                    name={product.name}
                    price={product.price}
                    addToCart={true}
                  />
                </div>
              ))}
            </div>
          )}
          
          <button 
            onClick={() => router.push("/products")}
            className="group flex items-center justify-center gap-4 border-2 border-[#6A4D6F] text-[#6A4D6F] px-14 py-5 rounded-2xl font-juanaBold uppercase tracking-[0.25em] text-[10px] hover:bg-[#6A4D6F] hover:text-white transition-all duration-500 shadow-xl hover:shadow-[#6A4D6F]/20 active:scale-95"
          >
            Explore All Solutions
            <RiArrowRightLine size={18} className="transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;
