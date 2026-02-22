import React from 'react'

const BeforeAfterReview = ({ 
  beforeImage, 
  afterImage, 
  title = "Amazing Results", 
  name = "Verified Customer", 
  rating = 5, 
  date = "Recent", 
  description = "I'm extremely happy with the results of my treatment. The change is visible and I feel much more confident now." 
}) => {

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 flex flex-col h-full border border-gray-100/50 w-full sm:w-[350px] lg:w-[320px]">
      <div className="p-4 flex gap-3 relative">
        <div className="relative flex-1 aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#6A4D6F]/60 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold rounded-md z-10">Before</div>
          <img src={beforeImage} alt="Before" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="relative flex-1 aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#DF9D43]/80 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold rounded-md z-10">After</div>
          <img src={afterImage} alt="After" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-sm ${i < rating ? "text-[#DF9D43]" : "text-gray-200"}`}>★</span>
          ))}
          <span className="ml-2 text-[10px] text-gray-400 font-sans font-medium tracking-widest uppercase">{date}</span>
        </div>

        <h3 className="text-xl font-juanaSemibold text-[#6A4D6F] mb-3 leading-tight group-hover:text-[#4b334f] transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed italic mb-6 line-clamp-4 flex-grow font-juanaRegular">
          "{description}"
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6A4D6F]/10 to-[#6A4D6F]/20 flex items-center justify-center text-[#6A4D6F] font-juanaBold text-xs">
              {name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-juanaBold text-gray-800 leading-none">{name}</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter font-juanaMedium">Verified Patient</p>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
             <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterReview