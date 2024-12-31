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
import { toast } from "react-toastify";
import useUserStore from "../store/user/userProfile";
import "react-toastify/dist/ReactToastify.css";
import DateTimePickerModal from "./components/datePickerModel/DateTimePickerModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import Head from "next/head";
const Page = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser, clearUser } = useUserStore();
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);

  const openModal = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      toast("Please login to take the test")
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
    <>
      <Head>
        <title>Skin Aura</title>
        <meta property="og:title" content="Skin Aura" key="home" />
      </Head>
      {isModalOpen && (
        <DateTimePickerModal isOpen={isModalOpen} onClose={closeModal} />
      )}
      <div className="relative">
        <HomeSwiper1 />
        <Scroller />
      </div>
      <div className="lg:h-[43vmax] h:[120vmax] lg:py-12 md:py-10 w-full flex flex-col items-center justify-center gap-3 md:gap-5 ">
        <h1 className="md:text-5xl text-[5vmax] font-juanaRegular leading-none text-center">
          We Are The Best
        </h1>
        <p className="md:text-sm text-[2vmax] leading-none font-medium md:mb-3">
          "we don’t say it our members say it"
        </p>
        <div className="mt-5">
          <ReviewSwiper />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 mt-10 md:mt-[15vh]">
        <h1 className="md:text-[4vmax] md:whitespace-nowrap text-[4.1vmax] text-wrap lg:text-[3.5vmax] text-center md:py-5 pt-5 font-juanaSemibold text-[#6A4D6F]">
          Bad Skin Has Multiple Root Causes
        </h1>
        <div className="relative overflow-hidden md:w-[85vmax] md:h-[45vmax] px-5 sm:h-[30vmax] rounded-lg mt-0 md:mt-10">
          <img
            src="/images/image01.webp"
            className="w-full h-full object-cover object-center"
            alt="internet required"
          />
        </div>
        <button onClick={openModal} className="md:mt-10 mt-3">
          <Button text={"Take a Test Now"} className="rounded-full" />
        </button>
      </div>
      <div className="flex items-center justify-center md:mt-16 mt-12">
        <div className="text-center flex flex-col gap-3 items-center justify-center">
          <p className="text-sm">we are providing here</p>
          <h1 className="md:text-[3vmax] text-[4vmax] font-juanaSemibold">
            Three Step Plan
          </h1>
          <h4 className="text-[2vmax] lg:text-xl text-[#DF9D43]">
            SKIN AURA’S HOLISTIC PLAN FOR HAIR FALL
          </h4>
          <h3 className="text-sm lg:text-xl text-[#6A4D6F]">
            AYURVEDA + DERMATOLOGY + NUTRITION
          </h3>
          <p className="w-[80vw] lg:w-2/5 text-[#DF9D43] md:mt-10 mt-5">
            Our approach combines the goodness of three sciences. With
            ingredients from the most authentic sources, we personalize your
            treatment delivering assured results.
          </p>
          <button onClick={openModal} className="md:mt-10 mt-3">
            <Button text={"Take a Test Now"} className="rounded-full" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-12">
        <Journey />
        <Button
          text={"Take a Test Now"}
          className="md:mt-16 mt-8 rounded-full"
        />
      </div>
      <div className="md:h-[50vh] mt-[7vmax]">
        <ProductPoster />
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <InfluencerSection />
        <Button
          text={"Take a Test Now"}
          className="md:my-8 my-5 rounded-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-center mt-[5vmax] mb-8">
          <h1 className="md:text-[3vmax] text-[3.4vmax] font-juanaMedium">
            Why We are India’s Choice ?
          </h1>
          <p className="xs:text-sm">"Because we provide Trust & Quality"</p>
        </div>
        <div className="md:w-[85vmax] w-full px-8 md:px-5 mx-auto">
          <VideoDiv text={"Complete Tea Video"} />
        </div>
      </div>
      <div className="my-2 py-16">
        <h1 className="md:text-[3vmax] xs:text-[4vmax] font-juanaRegular text-center">
          Our Customers
        </h1>
        <p className="text-center xs:text-sm">“Family Members”</p>
        <div className="flex flex-col md:flex-col lg:flex-row items-center justify-center gap-10 mt-10">
          <BeforeAfterReview
            beforeImage={`https://res.cloudinary.com/den1739gv/image/upload/v1735615338/before03_pa0dxf.jpg`}
            afterImage={`https://res.cloudinary.com/den1739gv/image/upload/v1735615348/after03_zgmdwn.jpg`}
          />
          <BeforeAfterReview
            beforeImage={`https://res.cloudinary.com/den1739gv/image/upload/v1735615108/IMG_6567_czf1pj.jpg`}
            afterImage={`https://res.cloudinary.com/den1739gv/image/upload/v1735615145/IMG_6931_f5qcf6.jpg`}
          />
          <BeforeAfterReview
            beforeImage={`https://res.cloudinary.com/den1739gv/image/upload/v1735616539/IMG_3569_tv7s2q.png`}
            afterImage={`https://res.cloudinary.com/den1739gv/image/upload/v1735616562/IMG_3568_jabu6b.png`}
          />
        </div>
      </div>
      <div className="md:py-10 flex flex-col items-center justify-around md:gap-5 gap-3">
        <div className="py-5">
          <h1 className="md:text-[3vmax] text-[4vmax] font-juanaRegular text-center">
            Safe And Proven
          </h1>
          <p className="text-center xs:text-sm">“Green and Safe”</p>
        </div>
        <div className="h-[65vh] rounded-2xl w-[80vw] bg-red-200 relative object-cover object-center">
          <img src="" alt="product image" />
        </div>
        <Button text={"Take a Test Now"} className="mt-8 rounded-full" />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="text-center my-10">
          <h1 className="md:text-[3vmax] text-[4vmax] font-juanaRegular">
            The must haves
          </h1>
          <p className="xs:text-sm">“Green and Safe”</p>
        </div>
        {products.length > 0 && (
          <div className="md:w-[85vmax] w-full px-2 mx-auto flex flex-wrap md:gap-8 gap-5 items-center justify-center md:pb-16 pb-8">
            {products.map((product) => (
              <Product
                id={product._id}
                productId={product._id}
                key={product._id}
                name={product.name}
                price={product.price}
                addToCart={true}
              />
            ))}
          </div>
        )}
        <Button text={"View All"} className="rounded-lg" />
      </div>

      <div className="centerSwiper w-full md:w-[85vmax] md:px-8 px-5 mx-auto md:py-16 py-8">
        <CenterSwiper />
        <div className="google-reviews overflow-hidden w-full flex flex-wrap items-center justify-center gap-16 pt-[8vmax] pb-[5vmax]">
          <GoogleReviewSwiper />
        </div>
      </div>
    </>
  );
};

export default Page;
