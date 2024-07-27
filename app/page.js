import React from "react";
import HomeSwiper1 from "./components/swiper/HomeSwiper1";
import ReviewSwiper from "./components/swiper/ReviewSwiper";
import Journey from "./components/homepageComp/Journey";
import ProductPoster from "./components/homepageComp/ProductPoster";
import InfluencerSection from "./components/homepageComp/InfluencerSection";
import Product from "./components/product/Product";
import Link from "next/link";
import Button from "./components/button/Button";
import Scroller from "./components/scroller/scroller";
import VideoDiv from "./components/videoDiv/VideoDiv";
import CenterSwiper from "./components/centerSwiper/CenterSwiper";
import GoogleRiviewCard from "./components/googleRiviewCard/GoogleRiviewCard";
import GoogleReviewSwiper from "./components/googleReviewSwiper/GoogleReviewSwiper";
import BeforeAfterReview from "./components/beforeAfter/BeforeAfterReview";

const Page = () => {
  return (
    <>
      <div className="relative">
        <HomeSwiper1 />
        <Scroller />
      </div>
      <div className="md:h-[43vmax] h:[120vmax] py-12 w-full flex flex-col items-center justify-center gap-5 md:mt-[25vh] ">
        <h1 className="text-5xl font-juanaRegular leading-none text-center">
          We Are The Best
        </h1>
        <p className="text-sm leading-none font-medium mb-3">
          "we don’t say it our members say it"
        </p>
        <div className="mt-5">
          <ReviewSwiper />
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center gap-8 mt-10 md:mt-[15vh]">
        <h1 className="text-[3vmax] lg:text-[3.5vmax] text-center py-5 font-juanaSemibold text-[#6A4D6F]	">
          Bad Skin Has Multiple Root Causes
        </h1>
        <div className="relative md:mt-10">
          <img
            src="/images/image01.webp"
            className="object-cover w-[80vw]"
            alt="internet required"
          />
        </div>
        <Button text={"Take a Test Now"} className="mt-10 rounded-full" />
      </div>
      <div className=" flex items-center justify-center mt-16">
        <div className="text-center flex flex-col gap-3 items-center justify-center">
          <p>we are providing here</p>
          <h1 className="text-[3vmax] font-juanaSemibold">Three Step Plan</h1>
          <h4 className="text-[2vmax] lg:text-xl text-[#DF9D43] ">
            SKIN AURA’S HOLISTIC PLAN FOR HAIR FALL
          </h4>
          <h3 className="text-sm lg:text-xl text-[#6A4D6F]">
            AYURVEDA + DERMATOLOGY + NUTRITION
          </h3>
          <p className="w-[80vw] lg:w-2/5 text-[#DF9D43] mt-10 ">
            Our approach combines the goodness of three sciences. With
            ingredients from the most authentic sources, we personalize your
            treatment delivering assured results.
          </p>
          <Button text={"Take a Test Now"} className="mt-12 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-12">
        <Journey />
        <Button text={"Take a Test Now"} className="mt-16 rounded-full" />
      </div>
      <div className="md:h-[50vh] mt-[7vmax]">
        <ProductPoster />
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <InfluencerSection />
        <Button text={"Take a Test Now"} className="my-8 rounded-full" />
      </div>
      <div className=" flex flex-col items-center justify-center gap-2">
        <div className="text-center mt-[5vmax] mb-8">
          <h1 className="text-[3vmax] font-juanaMedium">
            Why We are India’s Choice ?
          </h1>
          <p>"Because we provide Trust & Quality"</p>
        </div>
        <div className="md:w-[85vmax] w-full px-8 md:px-5 mx-auto">
          <VideoDiv text={"Complete Tea Video"} />
        </div>
      </div>
      <div className="my-2 py-16">
        <h1 className="text-[3vmax] font-juanaRegular text-center">
          Our Customers
        </h1>
        <p className="text-center">“Family Members”</p>
        <div className="flex flex-col md:flex-col lg:flex-row items-center justify-center gap-10 mt-10">
          <BeforeAfterReview/>
          <BeforeAfterReview/>
          <BeforeAfterReview/>
        </div>
      </div>
      <div className="py-10 flex flex-col items-center justify-around gap-5">
        <div className="py-5">
          <h1 className="text-[3vmax] font-juanaRegular text-center">
            Safe And Proven
          </h1>
          <p className="text-center">“Green and Safe”</p>
        </div>
        <div className="h-[65vh] rounded-3xl w-[80vw] bg-red-200 relative object-cover object-center">
          <img src="" alt="product image" />
        </div>
        <Button text={"Take a Test Now"} className="mt-8 rounded-full" />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="text-center my-10">
          <h1 className="text-[3vmax] font-juanaRegular">The must haves</h1>
          <p>“Green and Safe”</p>
        </div>
        <div className="md:w-[85vmax] w-full px-6 mx-auto flex flex-wrap gap-8 items-center justify-between pb-16">
          <div className=" w-full flex flex-wrap gap-10 items-center justify-between">
            <Product id={1} key={1} name={"new product"} addToCart={true} />
            <Product id={2} key={2} name={"product 01"} addToCart={true} />
            <Product id={3} key={3} name={"product 02"} addToCart={true} />
            <Product id={4} key={4} name={"product 03"} addToCart={true} />
          </div>
        </div>
        <Button text={"View All"} className="rounded-lg" />
      </div>

      <div className="centerSwiper w-full  md:w-[85vmax] px-8 md:px-5  mx-auto py-16">
        <CenterSwiper />
        <div className="google-reviews overflow-hidden w-full flex flex-wrap items-center justify-center gap-16 pt-[8vmax] pb-[5vmax]">
          <GoogleReviewSwiper />
        </div>
      </div>
    </>
  );
};

export default Page;
