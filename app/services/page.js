import React from 'react';
import { RiFacebookBoxFill, RiInstagramFill, RiYoutubeFill } from '@remixicon/react';
import Button from '../components/button/button';
import VideoDiv from '../components/videoDiv/VideoDiv';
import Link from 'next/link';
import ServiceCard from '../components/serviceCard/ServiceCard';

const Services = () => {
  return (
    <>
      <div className='md:w-[85vmax] px-8 md:px-5 min-h-screen mx-auto'>
      <div className='w-full py-6 pb-5 mb-12 flex md:flex-row items-center border-b border-[#0000008b] justify-between'>
        <div>
          <h1 className='text-[3vmax] text-center leading-[0.7vmax] border-b border-[#0000008b] text-primary font-juanaSemibold py-8'>Our Srvices</h1>
          <p className='leading-[0.3vmax] text-primary  font-juanaRegular py-6 md:py-8'>Follow the SKIN AURA Socials</p>
        </div>
        <div className='flex items-center justify-between mb-5 gap-5'>
        <Button text='Take A Test Now' className='rounded-full' />
        </div>
      </div>
      <VideoDiv text='Reverse Skin Ageing' imgSrc='https://images.unsplash.com/photo-1511945863317-d60e146e9016?q=80&w=2055&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-gray-600 text-[2.5vmax] text-center leading-tight mt-12'>UNCOVER, TREAT <br /> GLOW</h1>
        <p className='text-gray-600 mb-10 text-center w-[35%] mt-8'>
          Nourishes skin internally with essential supplements with a formulation of rare and effective Ayurvedic herbs.
        </p>
        <Button text='Take A Test Now' className='rounded-full' />
      </div>
        <div className="py-24 my-2 flex flex-col items-center justify-center gap-16">
          <ServiceCard
            cardNumber={"1"}
            serviceName={"Service Name"}
            serviceDescription={
              "Even out skin tone and smooth out photodamage."
            }
            serviceImage = {""}
          />
          <ServiceCard
            cardNumber={"1"}
            serviceName={"Service Name"}
            serviceDescription={
              "Even out skin tone and smooth out photodamage."
            }
            serviceImage = {""}
          />
          <ServiceCard
            cardNumber={"1"}
            serviceName={"Service Name"}
            serviceDescription={
              "Even out skin tone and smooth out photodamage."
            }
            serviceImage = {""}
          />
          <ServiceCard
            cardNumber={"1"}
            serviceName={"Service Name"}
            serviceDescription={
              "Even out skin tone and smooth out photodamage."
            }
            serviceImage = {""}
          />
        </div>
      </div>
    </>
  );
}

export default Services