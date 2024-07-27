import React from 'react'
import ReviewSwiper from '../swiper/ReviewSwiper';
const   InfluencerSection = () => {
  return (
    <>
      <div className="py-10  flex flex-col justify-center items-center md:gap-5">
        <div className="text-center py-10">
          <h1 className="md:text-[3vmax] text-[3.4vmax] font-juanaRegular">Influencers Adore Skin Glow</h1>
          <p className="w-[80vw] text-center xs:text-sm">
            “give us a chance and let your results speak”
          </p>
        </div>
        <ReviewSwiper />
        
      </div>
    </>
  );
}

export default InfluencerSection