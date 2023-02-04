import React from 'react'
import { useState, useRef, useEffect, createRef } from 'react'
import { GiPauseButton, GiPlayButton } from 'react-icons/gi'
import { BsFillSkipEndFill, BsFillSkipStartFill } from 'react-icons/bs'

interface Props {}

interface AudioRef {
  current: HTMLAudioElement | null;
  currentTime: number;
}

interface KnobRef extends HTMLDivElement{
  current: HTMLDivElement | null;
  parentElement: HTMLElement | null;
}

const ControlBar = ({}: Props): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  /* const knobRef = useRef<KnobRef>({ current: null, parentElement: null }); */
  const knobRef = createRef<KnobRef>()

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const progress = (event.currentTarget.currentTime / event.currentTarget.duration) * 100;
    setProgress(progress);
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const progress = (event.clientX / event.currentTarget.clientWidth) * 100;
    setProgress(progress);
    audioRef.current!.currentTime = (progress / 100) * audioRef.current!.duration;
  }

  const handleKnobMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setStartX(event.clientX);
    setStartProgress(progress);
  }

  

  const handleKnobMouseUp = () => {
    setStartX(null);
    setStartProgress(null);
  }

  const [startX, setStartX] = useState<number | null>(null);
  const [startProgress, setStartProgress] = useState<number | null>(null);

  useEffect(() => {
    const handleKnobMouseMove = (event: MouseEvent) => {
      const progress = startProgress! + (event.clientX - startX!) / knobRef.current!.parentElement!.clientWidth * 100;
      setProgress(progress);
      audioRef.current!.currentTime = (progress / 100) * audioRef.current!.duration;
    }

    if (startX && startProgress) {
      window.addEventListener('mousemove', handleKnobMouseMove);
      window.addEventListener('mouseup', handleKnobMouseUp);
    } else {
      window.removeEventListener('mousemove', handleKnobMouseMove);
      window.removeEventListener('mouseup', handleKnobMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleKnobMouseMove);
      window.removeEventListener('mouseup', handleKnobMouseUp);
    };
  }, [knobRef, startX, startProgress]);
  
  
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
          <BsFillSkipStartFill size={40} />
          <GiPauseButton size={35} className="mt-[3px]"/>
          <BsFillSkipEndFill size={40} />
        </div>
       
        {/* % progress */}


        
        {/* Progress Bar */}
        <div className="absolute w-[90%] left-[5%] h-2 bottom-2 bg-cream rounded cursor-pointer" onMouseDown={handleMouseDown}>
          <div className="h-full bg-black" style={{width:`${progress}%`}} ></div>
        </div>
        {/* Knob */}
        <div ref={knobRef} className="" onMouseDown={handleKnobMouseDown}></div>
      </div>
    </div>
  )
}


export default ControlBar