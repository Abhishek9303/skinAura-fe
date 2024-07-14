import React from "react";
import HomeSwiper1 from "./components/swiper/HomeSwiper1";
import ReviewSwiper from "./components/swiper/ReviewSwiper";
import Journey from "./components/homepageComp/Journey";
import ProductPoster from "./components/homepageComp/ProductPoster";
import InfluencerSection from "./components/homepageComp/InfluencerSection";
import Product from "./components/product/Product";
import Link from "next/link";
import Nav from "./components/Nav/Nav";


const Page = () => {
  return (
    <>
      <Nav/>
      <HomeSwiper1 />
      <div className="h-[80vh] w-full flex flex-col items-center justify-center gap-5">
        <h1 className="text-4xl">We Are The Best</h1>
        <p>we don’t say it our members say it</p>
        <ReviewSwiper />
      </div>
      <div className=" flex flex-col items-center justify-center gap-8">
        <h1 className="text-xl lg:text-[3vmax] text-center py-5">
          Bad Skin Has Multiple Root Causes
        </h1>
        <div className=" relative">
          <img
            src="/images/image01.webp"
            className="object-cover w-[80vw]"
            alt="internet required"
          />
        </div>
        <button className="h-[6vh] w-[45vw] lg:h-[8vh] lg:w-[15vw] bg-red-300 rounded-lg ">
          Take a Test Now
        </button>
      </div>
      <div className=" flex items-center justify-center">
        <div className="text-center flex flex-col gap-3 items-center justify-center">
          <p>we are providing here</p>
          <h1 className="text-[3vmax] ">Three Step Plan</h1>
          <h4 className="text-sm lg:text-xl">
            SKIN AURA’S HOLISTIC PLAN FOR HAIR FALL
          </h4>
          <h3 className="text-sm lg:text-xl">
            AYURVEDA + DERMATOLOGY + NUTRITION
          </h3>
          <p className="w-[80vw] lg:w-2/5 ">
            Our approach combines the goodness of three sciences. With
            ingredients from the most authentic sources, we personalize your
            treatment delivering assured results.
          </p>
          <button className="h-[6vh] w-[45vw] lg:h-[8vh] lg:w-[15vw] bg-red-300 rounded-lg ">
            Take a Test Now
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Journey />
        <button className="h-[6vh] w-[45vw] lg:h-[8vh] lg:w-[15vw] bg-red-300 rounded-lg ">
          Take a Test Now
        </button>
      </div>
      <div className="h-[50vh] py-5">
        <ProductPoster />
      </div>
      <div className="">
        <InfluencerSection />
      </div>
      <div className=" flex flex-col items-center justify-center gap-2">
        <div className="text-center py-5">
          <h1 className="text-[3vmax]">Why We are India’s Choice ?</h1>
          <p>"Because we provide Trust & Quality"</p>
        </div>
        <div className="relative h-[80vh] w-[80vw] bg-pink-200 rounded-3xl">
          <img src="" className=" w-[80vw] object-cover" alt="team picture" />
        </div>
      </div>
      <div className="h-[80vh] border my-2 py-2">
        <h1 className="text-[3vmax] text-center">Our Customers</h1>
        <p className="text-center">“Family Members”</p>
      </div>
      <div className="py-10 flex flex-col items-center justify-around gap-5">
        <div className="py-5">
          <h1 className="text-[3vmax] text-center">Safe And Proven</h1>
          <p className="text-center">“Green and Safe”</p>
        </div>
        <div className="h-[65vh] rounded-3xl w-[80vw] bg-red-200 relative object-cover object-center">
          <img src="" alt="product image" />
        </div>
        <button className="h-[6vh] w-[45vw] lg:h-[8vh] lg:w-[15vw] bg-red-300 rounded-lg ">
          Take a Test Now
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-[3vmax]">The must haves</h1>
          <p>“Green and Safe”</p>
        </div>
        <div className="py-10 flex flex-col lg:flex-row items-center justify-center gap-8">
          <Product />
          <Product />
          <Product />
        </div>
        <button className="my-5 h-[6vh] w-[30vw] lg:h-[8vh] lg:w-[10vw] bg-red-300 rounded-lg ">
          <Link href={"/products"}>View All</Link>
        </button>
      </div>
    </>
  );
};

export default Page;
