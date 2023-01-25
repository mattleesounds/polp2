import React from 'react'
import { GiPauseButton, GiPlayButton } from 'react-icons/gi'
import { BsFillSkipEndFill, BsFillSkipStartFill } from 'react-icons/bs'

const ControlBar = () => {
  return (
    <div className="fixed leading-none p-0 bottom-0 bg-white h-16 w-full">
      <div className="flex justify-center">


        {/* Now Playing */}
        <div className="absolute left-0">
          <div className="flex flex-col">
            <h2 className="text-lg pl-2">Artist</h2>
            <h3 className="pl-2">Song</h3>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center align-items-top gap-x-6 w-1/2">
          <BsFillSkipStartFill size={50} />
          <GiPauseButton size={45} className="mt-[3px]"/>
          <BsFillSkipEndFill size={50} />
        </div>
       
        {/* % progress */}


        
        {/* Progress Bar */}
        <div className="absolute w-[90%] left-[5%] h-1 bottom-2 bg-cream rounded">
          <div className="w-1/2 h-full bg-black rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default ControlBar