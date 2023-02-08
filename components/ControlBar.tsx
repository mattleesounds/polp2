import React, { use } from "react";
import { useState, useRef, useEffect, createRef } from "react";
import { GiPauseButton, GiPlayButton } from "react-icons/gi";
import { BsFillSkipEndFill, BsFillSkipStartFill } from "react-icons/bs";
import { TrackType } from "@/lib/types";
import { BiPlay, BiPause, BiSkipNext, BiSkipPrevious } from "react-icons/bi";

interface Props {}

interface AudioRef {
  current: HTMLAudioElement | null;
  currentTime: number;
}

interface KnobRef extends HTMLDivElement {
  current: HTMLDivElement | null;
  parentElement: HTMLElement | null;
}

interface Props {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentTrack: string | null;
  audioRefs: React.MutableRefObject<Map<string, HTMLAudioElement>>;
  setCurrentTrack: React.Dispatch<React.SetStateAction<any>>;
  durRefs: React.MutableRefObject<Map<string, number>>;
  handlePlayPause: (trackSource: string) => void;
  tracks: TrackType[];
}

const ControlBar = ({
  isPlaying,
  setIsPlaying,
  currentTrack,
  setCurrentTrack,
  audioRefs,
  durRefs,
  handlePlayPause,
  tracks,
}: Props): JSX.Element => {
  const [progress, setProgress] = useState(0);
  //const audioRef = useRef<HTMLAudioElement>(null);
  /* const knobRef = useRef<KnobRef>({ current: null, parentElement: null }); */
  const knobRef = createRef<KnobRef>();
  const audioRefsArray = Array.from(audioRefs.current);
  const track = tracks.find((track) => track.source === currentTrack);
  const [progressMinSec, setProgressMinSec] = useState("");
  const [durationMinSec, setDurationMinSec] = useState("");

  // Progress Bar Hook
  useEffect(() => {
    if (!currentTrack) return;

    const audio = audioRefs.current.get(currentTrack);
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [currentTrack, audioRefs, durRefs]);

  // Duration and Progress Hook
  useEffect(() => {
    if (!currentTrack) return;

    const audio = audioRefs.current.get(currentTrack);
    if (!audio) return;

    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
    setDurationMinSec(
      `${durationMinutes}:${durationSeconds.toString().padStart(2, "0")}`
    );

    const progressMinutes = Math.floor(audio.currentTime / 60);
    const progressSeconds = Math.floor(audio.currentTime % 60);
    setProgressMinSec(
      `${progressMinutes}:${progressSeconds.toString().padStart(2, "0")}`
    );

    console.log(`${progressMinSec}/${durationMinSec}`);
  }, [currentTrack, audioRefs, progress, durationMinSec, progressMinSec]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    /*const progress = (event.clientX / event.currentTarget.clientWidth) * 100;
    setProgress(progress);
    audioRefs.current.get(currentTrack) = (progress / 100) * audioRef.current!.duration; */
    if (!currentTrack) return;

    const audio = audioRefs.current.get(currentTrack);
    if (!audio) return;

    const progressBar = event.currentTarget;
    const mouseX = event.clientX;
    const rect = progressBar.getBoundingClientRect();
    const progress = (mouseX - rect.left) / rect.width;

    audio.currentTime = progress * audio.duration;
  };

  const handlePrevious = (trackSource: string) => {
    const audio = audioRefs.current.get(trackSource);
    if (!audio) return;

    if (audio.currentTime > 1) {
      audio.currentTime = 0;
    } else {
      const currentIndex = audioRefsArray.findIndex(
        (ref) => ref[0] === trackSource
      );
      if (currentIndex === 0) return;

      const previousTrack = audioRefsArray[currentIndex - 1]?.[0];
      console.log("previous track: ", previousTrack);
      setCurrentTrack(previousTrack);
      audioRefs.current.forEach((audioElement) => {
        audioElement.pause();
      });
      handlePlayPause(previousTrack);
      audio.currentTime = 0;
    }
  };

  const handleNext = (trackSource: string) => {
    const audio = audioRefs.current.get(trackSource);
    if (!audio) return;
    const currentIndex = audioRefsArray.findIndex(
      (ref) => ref[0] === trackSource
    );
    if (currentIndex === 0) return;

    const nextTrack = audioRefsArray[currentIndex + 1]?.[0];
    console.log("next track: ", nextTrack);
    setCurrentTrack(nextTrack);
    audioRefs.current.forEach((audioElement) => {
      audioElement.pause();
    });
    handlePlayPause(nextTrack);
    audio.currentTime = 0;
  };

  /* const handlePrevious = (trackSource: string) => {
    const audioRefsArray = Array.from(audioRefs.current?.values());
    
    const currentIndex = audioRefsArray.findIndex(ref => audioRefs.current.src === currentTrack);
    console.log(audioRefsArray[currentIndex - 1].src)
    if (currentIndex > 0) {
      const previousTrack = audioRefsArray[currentIndex - 1].src;
      
      setCurrentTrack(previousTrack);
      //handlePlayPause(currentTrack);
    }
  }; */

  /* 

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const progress = (event.currentTarget.currentTime / event.currentTarget.duration) * 100;
    setProgress(progress);
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
  
   */
  return (
    <div className="fixed leading-none p-0 bottom-0 bg-white h-16 w-full m-0">
      <div className="flex justify-center m-0 p-0">
        {/* Now Playing */}
        <div className="absolute left-1">
          <div className="flex flex-col">
            <h2 className="text-lg pl-2">
              {currentTrack ? track!.artist : ""}
            </h2>
            <h3 className="pl-2">{currentTrack ? track!.title : ""}</h3>
          </div>
        </div>

        {/* Controls */}
        <div className="relative max-w-1/2 m-0 p-0 top-0 bg-white">
          <button
            className="relative"
            onClick={() => handlePrevious(currentTrack!)}
          >
            <BiSkipPrevious size={50} />
          </button>

          <button
            onClick={() => handlePlayPause(currentTrack!)}
            className="focus:outline-none relative top-0"
          >
            {isPlaying ? (
              <BiPause size={50} className="mt-[3px]" />
            ) : (
              <BiPlay size={50} className="mt-[3px]" />
            )}
          </button>

          <button
            className="relative top-0"
            onClick={() => handleNext(currentTrack!)}
          >
            <BiSkipNext size={50} />
          </button>
        </div>
        {/*  <div className="absolute max-w-1/2 m-0 p-0 bg-white top-0">
        </div> */}

        {/* progress */}
        <div className="absolute right-5 top-[15px]">
          {progressMinSec} / {durationMinSec}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="absolute w-[90%] left-[5%] h-[6px] bottom-2 bg-cream cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        <div
          className="h-full bg-black"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Knob */}
      {/* <div ref={knobRef} className="" onMouseDown={handleKnobMouseDown}></div> */}
    </div>
  );
};

export default ControlBar;
