"use client"
import React, { useState } from 'react'
import DateTimePickerModal from '../components/datePickerModel/DateTimePickerModal'
import CenterCard from '../components/centers/CenterCard'
import Button from '../components/button/Button'

const offlineCenters = [
  {
    id: 1,
    name: "Fine Aura ",
    location: "Bhopal",
    image: "https://images.unsplash.com/photo-1519494140281-89ac7d4d94d7?q=80&w=800&h=600&fit=crop",
    rating: 4.9,
    totalReviews: 856,
    address: "",
    phone: "+91 98765 43210",
    additionalInfo: "Our flagship center with advanced dermatology wing and private consultation suites.",
    mapLink: "https://goo.gl/maps/example1",
    showBookingButton: false
  },
  {
    id: 2,
    name: "Skin Aura Wellness - Mumbai",
    location: "Bandra West",
    image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?q=80&w=800&h=600&fit=crop",
    rating: 4.8,
    totalReviews: 642,
    address: "Shop No 4, Sea View Apartment, Hill Road, Bandra West, Mumbai - 400050",
    phone: "+91 87654 32109",
    additionalInfo: "Specialized in non-invasive cosmetic procedures and advanced skin rejuvenation.",
    mapLink: "https://goo.gl/maps/example2",
    showBookingButton: false
  },
  {
    id: 3,
    name: "Skin Aura Studio - Bangalore",
    location: "Indiranagar",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&h=600&fit=crop",
    rating: 4.7,
    totalReviews: 438,
    address: "777, 100 Feet Rd, Opposite To Starbucks, HAL 2nd Stage, Indiranagar, Bengaluru - 560038",
    phone: "+91 76543 21098",
    additionalInfo: "State-of-the-art hair restoration unit and organic Ayurvedic treatment rooms.",
    mapLink: "https://goo.gl/maps/example3",
    showBookingButton: false
  }
];

const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const closeModal = () => setIsModalOpen(false);

    return (
      <div className="min-h-screen bg-white py-20 px-4 md:px-12">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-20 text-center">
          <p className="text-[#DF9D43] font-juanaMedium uppercase tracking-[0.3em] text-[10px] mb-4 block">Store Locator</p>
          <h1 className="text-[4.5vmax] md:text-[3.5vmax] font-juanaSemibold text-[#6A4D6F] leading-none">
            Our Offline Centers
          </h1>
          <div className="w-24 h-1 bg-[#DF9D43] mx-auto mt-6"></div>
        </div>

        {/* Grid Section */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {offlineCenters.map((center) => (
              <CenterCard key={center.id} center={center} />
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="max-w-7xl mx-auto mt-32 text-center bg-[#6A4D6F] rounded-3xl py-16 px-8 text-white relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-juanaSemibold mb-6">Need help finding a center?</h2>
          <p className="text-white/80 font-juanaRegular mb-10 max-w-xl mx-auto">Our concierge service is available to help you find the nearest center and book your preferred time slot.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button text="Call Support" className="rounded-full !bg-white !text-[#6A4D6F] hover:!bg-gray-100" />
            <Button text="WhatsApp" className="rounded-full !bg-transparent border-2 border-white hover:!bg-white/10" />
          </div>
        </div>

        {isModalOpen && (
          <DateTimePickerModal isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>
    );
}

export default Page