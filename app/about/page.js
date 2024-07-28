import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiYoutubeFill,
} from "@remixicon/react";
import React from "react";
import Button from "../components/button/button";
import VideoDiv from "../components/videoDiv/VideoDiv";
import Link from "next/link";
import GoogleReviewSwiper from "../components/googleReviewSwiper/GoogleReviewSwiper";
const About = () => {
  return (
    <div className="md:w-[85vmax] w-full px-5 min-h-screen mx-auto">
      <div className="w-full py-5 pb-5 md:mb-12 mb-6 flex md:flex-row flex-col items-center border-b border-[#0000008b] justify-between">
        <div>
          <h1 className="md:text-[3vmax] text-[4vmax] text-center leading-[0.7vmax] border-b border-[#0000008b] text-primary font-juanaSemibold py-6">
            About Us
          </h1>
          <p className="leading-[0.3vmax] text-primary  font-juanaRegular py-6 md:py-8">
            Follow The SKIN AURA Socials
          </p>
        </div>
        <div className="flex items-center justify-between md:mb-5  gap-5">
          <Link href={"#"}>
            <RiInstagramFill size={36} />
          </Link>
          <Link href={"#"}>
            <RiYoutubeFill size={36} />
          </Link>
          <Link href={"#"}>
            <RiFacebookBoxFill size={36} />
          </Link>
        </div>
      </div>
      <VideoDiv text="Complete team video" />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-gray-600 md:text-[2.5vmax] text-[4vmax] text-center leading-tight mt-12">
          UNCOVER, TREAT <br /> GLOW
        </h1>
        <p className="text-gray-600 mb-10 text-center md:w-[35%] md:mt-8 mt-5">
          Nourishes skin internally with essential supplements with a
          formulation of rare and effective Ayurvedic herbs.
        </p>
        <Button text="Take A Test Now" className="rounded-full" />
      </div>
      <div className="our-achivements flex flex-col items-center justify-center">
        <h1 className="font-juanaRegular md:text-[3vmax] text-[4vmax] pt-16  md:pb-10 pb-8">
          Our Achivements
        </h1>
        <VideoDiv text="Certificates and Proof" />
      </div>
      <div className="shaid w-full h-auto md:mt-40 mt-16 flex md:flex-row flex-col-reverse items-center justify-between md:h-[30vmax]">
        <div className="content flex flex-col w-full md:w-auto">
          <div className="w-full flex md:flex-col xs:flex-col flex-row items-center justify-between md:items-start">
            <h1 className="text-gray-600 md:text-[3vmax] text-[5vmax] font-semibold md:mb-3 mb-2">
              Dr. Shahid Ali
            </h1>
            <div>
              <h6 className="text-gray-600 mb-1 md:mb-6">
                CEO & Skin Specialist
              </h6>
              <h6 className="text-gray-600 mb-6 md:mb-6 font-semibold">
                Degree : B.Sc , PHD ,{" "}
              </h6>
            </div>
          </div>
          <p className="text-gray-600 md:text-sm text-[1.8vmax] md:text-start text-center mb-6">
            Nourishes skin internally with essential supplements
            <br /> with a formulation of rare and effective Ayurvedic herbs.{" "}
            <br />
            Targets poor skin health, dosha imbalance, and poor blood flow.
          </p>
          <div className="md:w-auto w-full md:mt-5 flex md:flex-col flex-row items-center justify-between md:items-start">
            <Link
              href={"#"}
              className="text-gray-600 flex items-center justify-center md:gap-2 font-medium md:mb-6 hover:font-semibold"
            >
              <RiInstagramFill size={36} />{" "}
              <span className="font-bold md:text-lg text-xl">@shaidali</span>
            </Link>
            <Button
              text="Take A Test Now"
              className="rounded-full md:w-[65%]"
            />
          </div>
        </div>
        <div className="img flex items-center mb-8 justify-center md:w-[50%] w-full md:h-full h-[30vmax] rounded-lg bg-gray-300 ">
          <h1 className="text-gray-600 text-[2vmax]">Dr. Sohel’s photo</h1>
        </div>
      </div>
      <div className="sohel w-full h-auto md:mt-40 mt-16 flex md:flex-row flex-col-reverse items-center justify-between md:h-[30vmax]">
        <div className="content flex flex-col w-full md:w-auto">
          <div className="w-full flex md:flex-col xs:flex-col flex-row items-center justify-between md:items-start">
            <h1 className="text-gray-600 md:text-[3vmax] text-[5vmax] font-semibold md:mb-3 mb-2">
              Dr. Sohel Ali
            </h1>
            <div>
              <h6 className="text-gray-600 mb-1 md:mb-6">
                CEO & Skin Specialist
              </h6>
              <h6 className="text-gray-600 mb-6 md:mb-6 font-semibold">
                Degree : B.Sc , PHD ,{" "}
              </h6>
            </div>
          </div>
          <p className="text-gray-600 md:text-sm text-[1.8vmax] md:text-start text-center mb-6">
            Nourishes skin internally with essential supplements
            <br /> with a formulation of rare and effective Ayurvedic herbs.{" "}
            <br />
            Targets poor skin health, dosha imbalance, and poor blood flow.
          </p>
          <div className="md:w-auto w-full md:mt-5 flex md:flex-col flex-row items-center justify-between md:items-start">
            <Link
              href={"#"}
              className="text-gray-600 flex items-center justify-center md:gap-2 font-medium md:mb-6 hover:font-semibold"
            >
              <RiInstagramFill size={36} />{" "}
              <span className="font-bold md:text-lg text-xl">@sohelali</span>
            </Link>
            <Button
              text="Take A Test Now"
              className="rounded-full md:w-[65%]"
            />
          </div>
        </div>
        <div className="img flex items-center mb-8 justify-center md:w-[50%] w-full md:h-full h-[30vmax] rounded-lg bg-gray-300 ">
          <h1 className="text-gray-600 text-[2vmax]">Dr. Shahid’s photo</h1>
        </div>
      </div>

      <div className="our-team md:mt-24 flex flex-col items-center justify-center">
        <h1 className="font-juanaRegular md:text-[3vmax] text-[4vmax] pt-16  pb-10">
          Our Team
        </h1>
        <VideoDiv text="Skin Aura Team Group Photo " />
      </div>
      <div className="our-teachnical-team md:mt-24 pb-12 flex flex-col items-center justify-center">
        <h1 className="font-juanaRegular md:text-[3vmax] text-[4vmax] pt-16  pb-12">
          Our Technical Team
        </h1>
        <div className="w-full flex flex-wrap gap-10 items-center justify-center">
          <div className="profile-card mx-auto bg-white border border-[#0000003b] shadow-md flex flex-col items-center justify-center w-full max-w-sm lg:max-w-sm p-5 rounded-lg">
            <p className="text-sm lg:text-md mb-3 font-bold text-gray-800 text-center">
              Designer at "<i>SKIN AURA</i>"
            </p>
            <div className="w-32 h-32 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full mb-3 bg-gray-200 flex items-center justify-center overflow-hidden">
              {/* img */}
            </div>
            <h1 className="text-lg md:text-xl lg:text-2xl mb-5 text-gray-800 font-semibold text-center">
              Abhay Agnihotri
            </h1>
            <Link href="#">
              <button className="hover:scale-105 rounded-md font-bold px-4 py-2 bg-blue-500 text-white transition-transform duration-300">
                Linkedin
              </button>
            </Link>
          </div>
          <div className="profile-card mx-auto bg-white border border-[#0000003b] shadow-md flex flex-col items-center justify-center w-full max-w-sm lg:max-w-sm p-5 rounded-lg">
            <p className="text-sm lg:text-md mb-3 font-bold text-gray-800 text-center">
              Designer at "<i>SKIN AURA</i>"
            </p>
            <div className="w-32 h-32 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full mb-3 bg-gray-200 flex items-center justify-center overflow-hidden">
              {/* img */}
            </div>
            <h1 className="text-lg md:text-xl lg:text-2xl mb-5 text-gray-800 font-semibold text-center">
              Abhay Agnihotri
            </h1>
            <Link href="#">
              <button className="hover:scale-105 rounded-md font-bold px-4 py-2 bg-blue-500 text-white transition-transform duration-300">
                Linkedin
              </button>
            </Link>
          </div>
          <div className="profile-card mx-auto bg-white border border-[#0000003b] shadow-md flex flex-col items-center justify-center w-full max-w-sm lg:max-w-sm p-5 rounded-lg">
            <p className="text-sm lg:text-md mb-3 font-bold text-gray-800 text-center">
              Designer at "<i>SKIN AURA</i>"
            </p>
            <div className="w-32 h-32 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full mb-3 bg-gray-200 flex items-center justify-center overflow-hidden">
              {/* img */}
            </div>
            <h1 className="text-lg md:text-xl lg:text-2xl mb-5 text-gray-800 font-semibold text-center">
              Abhay Agnihotri
            </h1>
            <Link href="#">
              <button className="hover:scale-105 rounded-md font-bold px-4 py-2 bg-blue-500 text-white transition-transform duration-300">
                Linkedin
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="google-reviews overflow-hidden w-full flex flex-wrap items-center justify-center gap-16 pt-[8vmax] pb-[5vmax]">
          <GoogleReviewSwiper />
        </div>
    </div>
  );
};

export default About;
