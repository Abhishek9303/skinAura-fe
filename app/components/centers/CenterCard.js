import React from 'react';
import Button from '../button/Button';

const CenterCard = ({ center }) => {
  const { image, name, location, rating, totalReviews, address, phone, additionalInfo, mapLink } = center;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 group flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
          <span className="text-[#DF9D43] text-sm">★</span>
          <span className="font-juanaBold text-[#6A4D6F] text-sm">{rating}</span>
          <span className="text-gray-400 text-xs font-juanaMedium">({totalReviews})</span>
        </div>
        {/* Google Maps Shortcut */}
        <a 
          href={mapLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 bg-[#DF9D43] hover:bg-[#c98d3c] text-white p-3 rounded-2xl shadow-xl transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </a>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4">
          <span className="text-[10px] uppercase tracking-widest font-juanaBold text-[#DF9D43] bg-[#DF9D43]/10 px-3 py-1 rounded-full">{location}</span>
          <h3 className="text-2xl font-juanaSemibold text-[#6A4D6F] mt-3 group-hover:text-[#4b334f] transition-colors duration-300">{name}</h3>
        </div>

        <div className="space-y-4 mb-8 text-gray-600 flex-grow font-juanaRegular">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <p className="text-sm leading-relaxed">{address}</p>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p className="text-sm font-juanaMedium">{phone}</p>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-gray-500 italic">"{additionalInfo}"</p>
          </div>
        </div>

        {center.showBookingButton !== false && (
          <Button text="Book Appointment" className="w-full rounded-2xl" />
        )}
      </div>
    </div>
  );
};

export default CenterCard;
