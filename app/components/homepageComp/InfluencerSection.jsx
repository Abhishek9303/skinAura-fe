import React from 'react'
import ReviewSwiper from '../swiper/ReviewSwiper';
const InfluencerSection = () => {
  return (
    <>
      <div className="py-10  flex flex-col justify-center items-center gap-5">
        <div className="text-center py-10">
          <h1 className="text-[3vmax] font-juanaRegular">Influencers Adore Skin Glow</h1>
          <p className="w-[80vw] text-center">
            “give us a chance and let your results speak”
          </p>
        </div>
        <ReviewSwiper />
        
      </div>
    </>
  );
}

export default InfluencerSection