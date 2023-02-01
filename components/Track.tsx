import React from 'react'
import { AiOutlinePause } from 'react-icons/ai'
import Image from 'next/image'
import {IoMdShareAlt } from 'react-icons/io'
import { BiPlay, BiPause } from 'react-icons/bi'
import { TrackType } from '@/lib/types'
import { useRef, useState, useEffect } from 'react'

interface TrackProps {
  /* 
  audioRef: React.RefObject<HTMLAudioElement>;
  
  setCurrentTrack: React.Dispatch<React.SetStateAction<any>>; */
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  track: TrackType;
  //currentTrack: TrackType;
  playTrack: (track: TrackType) => void;
  pauseTrack: () => void; 
  //handlePlayPause: (title: string) => void;
  //setCurrentTrack: React.Dispatch<React.SetStateAction<TrackType | null>>;
}

const Track = ({ isPlaying, setIsPlaying, track, playTrack, pauseTrack }: TrackProps): JSX.Element =>  {
  

  /* const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if(isPlaying) {
      audioRef.current!.pause()
    } else {
      audioRef.current!.play()
    }
  } */
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = (track: TrackType) => {
    if (currentTrack === track.title) {
      if (isPlaying) {
        setIsPlaying(false);
        audioRef.current?.pause();
        pauseTrack();
      } else {
        setIsPlaying(true);
        audioRef.current?.play();
        playTrack(track);
      }
    } else {
      setCurrentTrack(track.title);
      setIsPlaying(true);
      audioRef.current!.src = track.source;
      audioRef.current?.play();
      playTrack(track);
    }
  };

  return (
    <div className="w-[88%] left-[6%] h-36 bg-white flex m-3">
      {/* Art/Controls */}
      <div className="w-[30%] h-[69%] bg-slate-400 flex justify-center items-center">
        <button onClick={() =>handlePlayPause(track)}>
          { isPlaying ? <BiPause size={60} /> : <BiPlay size={60}/> }
        </button>
      </div>

      <audio ref={audioRef} />

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