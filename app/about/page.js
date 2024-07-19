import { RiFacebookBoxFill, RiInstagramFill, RiYoutubeFill } from '@remixicon/react';
import React from 'react';
import Button from '../components/button/button';
import VideoDiv from '../components/videoDiv/VideoDiv';
import Link from 'next/link';
import GoogleRiviewCard from '../components/googleRiviewCard/GoogleRiviewCard';

const About = () => {
  return (
    <div className='w-[85vmax] sm:px-5 md:px-5 min-h-screen mx-auto'>
      <div className='w-full py-6 pb-5 mb-12 flex items-center border-b border-[#0000008b] justify-between'>
        <div>
          <h1 className='text-[3vmax] leading-[0.7vmax] border-b border-[#0000008b] text-primary font-juanaSemibold py-8'>About Us</h1>
          <p className='leading-[0.3vmax] text-primary font-juanaRegular py-8'>Follow the SKIN AURA Socials</p>
        </div>
        <div className='flex items-center justify-between gap-5'>
          <RiInstagramFill size={36} />
          <RiYoutubeFill size={36} />
          <RiFacebookBoxFill size={36} />
        </div>
      </div>
      <VideoDiv text='Complete team video'/>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-gray-600 text-[2.5vmax] text-center leading-tight mt-12'>UNCOVER, TREAT <br /> GLOW</h1>
        <p className='text-gray-600 mb-10 text-center w-[35%] mt-8'>
          Nourishes skin internally with essential supplements with a formulation of rare and effective Ayurvedic herbs.
        </p>
        <Button text='Take A Test Now' className='rounded-full' />
      </div>
      <div className='our-achivements flex flex-col items-center justify-center'>
         <h1 className='font-juanaRegular text-[3vmax] pt-16  pb-10'>
         Our Achivements
         </h1>
         <VideoDiv text='Certificates and Proof'/>
      </div>
      <div className='shaid w-full mt-40 flex items-center justify-between h-[30vmax]'>
        <div className='content flex flex-col  '>
         <h1 className='text-gray-600 text-[3vmax] font-semibold mb-3'>Dr. Shahid Ali</h1>
         <h6 className='text-gray-600 mb-6'>CEO & Skin Specialist</h6>
         <h6 className='text-gray-600 mb-6 font-semibold'>Degree : B.Sc , PHD , </h6>
         <p className='text-gray-600 text-sm mb-6'>Nourishes skin internally with essential supplements<br/> with a formulation of rare and effective Ayurvedic herbs. <br/>Targets poor skin health, dosha imbalance, and poor blood flow.</p>
         <Link href={'#'} className='text-gray-600 font-medium mb-6 hover:font-semibold'>
         Link : Instagram
         </Link>
         <Button text='Take A Test Now' className='rounded-full w-[65%]' />
        </div>
        <div className='img flex items-center justify-center w-[50%] h-full rounded-lg bg-gray-300 '>
         <h1 className='text-gray-600 text-[2vmax]'>Dr. Shahid’s photo</h1>
        </div>
      </div>
      <div className='sohel w-full mt-40 flex items-center justify-between h-[30vmax]'>
      <div className='img flex items-center justify-center w-[50%] h-full rounded-lg bg-gray-300 '>
         <h1 className='text-gray-600 text-[2vmax]'>Dr. Shoel's photo</h1>
        </div>
        <div className='content flex flex-col  '>
         <h1 className='text-gray-600 text-[3vmax] font-semibold mb-3'>Dr. Shoel Ali</h1>
         <h6 className='text-gray-600 mb-6'>CEO & Skin Specialist</h6>
         <h6 className='text-gray-600 mb-6 font-semibold'>Degree : B.Sc , PHD , </h6>
         <p className='text-gray-600 text-sm mb-6'>Nourishes skin internally with essential supplements<br/> with a formulation of rare and effective Ayurvedic herbs. <br/>Targets poor skin health, dosha imbalance, and poor blood flow.</p>
         <Link href={'#'} className='text-gray-600 font-medium mb-6 hover:font-semibold'>
         Link : Instagram
         </Link>
         <Button text='Take A Test Now' className='rounded-full w-[65%]' />
        </div>
      </div>
      <div className='our-team mt-24 flex flex-col items-center justify-center'>
         <h1 className='font-juanaRegular text-[3vmax] pt-16  pb-10'>
         Our Achivements
         </h1>
         <VideoDiv text='Skin Aura Team Group Photo '/>
      </div>
      <div className='our-teachnical-team mt-24 pb-12 flex flex-col items-center justify-center'>
         <h1 className='font-juanaRegular text-[3vmax] pt-16  pb-12'>
         Our Technical Team
         </h1>
        <div className='w-full flex items-center justify-between'>
           <div className='profile-card bg-white border-[1px] border-[#0000003b] shadow-md flex flex-col items-center justify-center w-[24vmax] h-[32vmax] rounded-lg'>
           <p className='text-md mb-3 font-bold text-gray-800'>Designer at "<i>SKIN AURA</i>"</p>
           <div className='w-[16vmax] h-[18vmax] rounded-md mb-3 bg-gray-200'>
                {/* img */}
              </div>
              <h1 className='text-[1.3vmax] mb-5 text-gray-800 font-semibold'>
                Abhay Agnihotri
              </h1>
              <Link href={'#'}>
              <Button text='Linkedin' className='hover:scale-105 rounded-md font-bold px-8 py-1'/>
              </Link>
           </div>
           <div className='profile-card bg-white border-[1px] border-[#0000003b] shadow-md flex flex-col items-center justify-center w-[24vmax] h-[32vmax] rounded-lg'>
           <p className='text-md mb-3 font-bold text-gray-800'>Designer at "<i>SKIN AURA</i>"</p>
           <div className='w-[16vmax] h-[18vmax] rounded-md mb-3 bg-gray-200'>
                {/* img */}
              </div>
              <h1 className='text-[1.3vmax] mb-5 text-gray-800 font-semibold'>
                Abhay Agnihotri
              </h1>
              <Link href={'#'}>
              <Button text='Linkedin' className='hover:scale-105 rounded-md font-bold px-8 py-1'/>
              </Link>
           </div>
           <div className='profile-card bg-white border-[1px] border-[#0000003b] shadow-md flex flex-col items-center justify-center w-[24vmax] h-[32vmax] rounded-lg'>
           <p className='text-md mb-3 font-bold text-gray-800'>Designer at "<i>SKIN AURA</i>"</p>
           <div className='w-[16vmax] h-[18vmax] rounded-md mb-3 bg-gray-200'>
                {/* img */}
              </div>
              <h1 className='text-[1.3vmax] mb-5 text-gray-800 font-semibold'>
                Abhay Agnihotri
              </h1>
              <Link href={'#'}>
              <Button text='Linkedin' className='hover:scale-105 rounded-md font-bold px-8 py-1'/>
              </Link>
           </div>
        </div>
      </div>
      <div className='google-reviews w-full flex items-center justify-center gap-16 py-16'>
        <GoogleRiviewCard reviewer={'Abhay'}/>
        <GoogleRiviewCard reviewer={'Abhishek'}/>
        <GoogleRiviewCard reviewer={'Naman'}/>
      </div>
    </div>
  );
}

export default About;