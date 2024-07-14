import React from 'react'
import ServiceCard from '../components/serviceCard/ServiceCard';

const Services = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="py-5 flex justify-between items-center w-[80vw] border-b-2 my-5 ">
          <div>
            <h1 className="text-4xl">Our Services</h1>
            <hr className=" bg-black" />
            <h5>Follow the SKIN AURA routine</h5>
          </div>
          <button className="h-[6vh] w-[45vw] lg:h-[8vh] lg:w-[15vw] bg-red-300 rounded-lg ">
            Take a Test Now
          </button>
        </div>
        <div className="h-[90vh] w-[80vw] bg-black"></div>
        <div className="py-5 my-8 flex flex-col gap-10  items-center justify-center">
          <h1 className="text-[3vmax] text-center w-[18vw] leading-none">
            Uncover,Treat Glow
          </h1>
          <p className="text-xl text-center w-[25vw]">
            Nourishes skin internally with essential supplements with a
            formulation of rare and effective Ayurvedic herbs.
          </p>
          <button className="h-[6vh] w-[45vw] lg:h-[8vh] lg:w-[15vw] bg-red-300 rounded-lg ">
            Take a Test Now
          </button>
        </div>
        <div className="py-5 my-2 flex flex-col items-center justify-center gap-5">
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