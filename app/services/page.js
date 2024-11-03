'use client'
import React, { useState } from "react";
import Button from "@/app/components/button/Button";
import VideoDiv from "../components/videoDiv/VideoDiv";
import ServiceCard from "../components/serviceCard/ServiceCard";
import DateTimePickerModal from "../components/datePickerModel/DateTimePickerModal";

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  // Array of services
  const servicesData = [
    {
      cardNumber: "1",
      serviceName: "PRP Treatment",
      serviceDescription: "Even out skin tone and smooth out photodamage.",
      reason: "prp",
    },
    {
      cardNumber: "2",
      serviceName: "Skin Rejuvenation",
      serviceDescription: "Rejuvenate your skin with advanced treatment.",
      reason: "skin",
    },
    {
      cardNumber: "3",
      serviceName: "Hair Restoration",
      serviceDescription: "Revitalize your hair for a fuller, healthier look.",
      reason: "hair",
    },
    {
      cardNumber: "4",
      serviceName: "Glow Treatment",
      serviceDescription: "Achieve a radiant, glowing complexion.",
      reason: "glow",
    },
  ];

  const handleServiceClick = (reason) => {
    setSelectedService(reason);
    setIsModalOpen(true); // Open the modal immediately after setting the selected service
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedService(""); // Clear selected service after closing
  };

  return (
    <>
      <div className="md:w-[85vmax] w-full px-5 min-h-screen mx-auto">
        {/* Page header */}
        <div className="w-full md:py-6 py-3 md:mb-12 mb-8 flex md:flex-row flex-col items-center border-b border-[#0000008b] justify-between">
          <div>
            <h1 className="md:text-[3vmax] text-[4vmax] text-center leading-[0.7vmax] border-b border-[#0000008b] text-primary font-juanaSemibold md:py-8 py-5">
              Our Services
            </h1>
            <p className="leading-[0.3vmax] text-primary font-juanaRegular py-6 md:py-8">
              UNCOVER THE NATURAL YOU
            </p>
          </div>
          <div className="flex items-center justify-between mb-5 gap-5">
            <Button text="Take A Test Now" className="rounded-full" />
          </div>
        </div>

        {/* Video Section */}
        <VideoDiv
          text="Reverse Skin Ageing"
          imgSrc="https://images.unsplash.com/photo-1511945863317-d60e146e9016?q=80&w=2055&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        {/* Services List */}
        <div className="md:py-24 py-12 my-2 flex flex-col items-center justify-center gap-16">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.cardNumber}
              cardNumber={service.cardNumber}
              serviceName={service.serviceName}
              serviceDescription={service.serviceDescription}
              reason={service.reason}
              onClick={() => handleServiceClick(service.reason)} // Pass reason to click handler
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <DateTimePickerModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          reason={selectedService} 
        />
      )}
    </>
  );
};

export default Services;
