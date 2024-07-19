import React from 'react'

const VideoDiv = ({text,src,...props}) => {
  return (
    <div className='team-video px-5 flex items-center justify-center w-full min-h-[40vmax] rounded-lg bg-gray-300'>
        <span className='text-gray-600 text-[3vmax]'>{text}</span>
        {/* <video src={src}></video> */}
        {/* <img src="" alt="" /> */}
      </div>
  )
}

export default VideoDiv