import React from 'react'

const VideoDiv = ({ text, imgSrc, videoSrc, ...props }) => {
  return (
    <div className='team-video relative px-5 flex items-center justify-center w-full md:h-[40vmax] h-[55vmax] rounded-lg bg-gray-300 overflow-hidden'>
      <span className='absolute z-10 text-white whitespace-nowrap font-juanaLight md:text-[5vmax] text-[3.5vmax]'>{text}</span>
      {videoSrc ? (
        <video src={videoSrc} controls className='object-cover w-full h-full'></video>
      ) : (
        <img src={imgSrc} alt="img" className='absolute top-0 left-0 w-full h-full object-cover' />
      )}
    </div>
  )
}

export default VideoDiv
