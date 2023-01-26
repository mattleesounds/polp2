import React from 'react'
import { AiOutlinePause } from 'react-icons/ai'
import Image from 'next/image'
import {IoMdShareAlt } from 'react-icons/io'
import { BiPlay, BiPause } from 'react-icons/bi'
import { createRef } from 'react'


const Track = () => {
  /* States */
  const [isPlaying, setIsPlaying] = React.useState(false)

  /* References */
  const audioPlayer = createRef<HTMLAudioElement>()

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if(isPlaying) {
      audioPlayer.current!.pause()
    } else {
      audioPlayer.current!.play()
    }
  }

  return (
    <div className="w-[88%] left-[6%] h-36 bg-white flex m-3">
      {/* Audio */}
      <audio ref={audioPlayer} src="/song1.mp3" />

      {/* Art/Controls */}
      <div className="w-[30%] h-[69%] bg-slate-400 flex justify-center items-center">
        <button onClick={togglePlayPause}>
          { isPlaying ? <BiPause size={60} /> : <BiPlay size={60}/> }
        </button>
      </div>

      {/* Info/Progress */}
      <div className="flex-col w-[70%] h-full">
        <div className="h-[60%]">
          <h2 className="p-2 text-xl">
            Orange Song
          </h2>
          <h3 className="p-2 pt-0 pb-1 text-lg">      
            Lil Citrus
          </h3>
        </div>
        <div className="h-[40%] flex justify-end mr-6 mt-0">
          <button className="h-12 w-24 bg-cream ml-[25px] border-polp-orange border-solid border-2 flex place-content-center items-center">
            <p className="m-1">Share</p>
            <IoMdShareAlt size={20} className="m-1"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Track