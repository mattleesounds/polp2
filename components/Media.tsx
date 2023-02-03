import React from 'react'
import { TrackType } from '@/lib/types'
import { useState, useRef } from 'react'
import Feed from './Feed'
import ControlBar from './ControlBar'

const Media = (): JSX.Element =>  {
  const tracks: TrackType[] = [
    {
      title: '50 Ways to Leave Your Lover',
      artist: 'Paul Simon',
      source: 'song1.mp3'
    },
    {
      title: 'So Fresh, So Clean',
      artist: 'Outkast',
      source: 'song2.mp3'
    }
  ];
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  const handlePlayPause = (trackSource: string) => {
    if (currentTrack === trackSource) {
      const audioElement = audioRefs.current.get(trackSource);
      if (audioElement) {
        if (audioElement.paused) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }
    } else {
      audioRefs.current.forEach((audioElement) => {
        audioElement.pause();
      });
      const audioElement = audioRefs.current.get(trackSource);
      if (audioElement) {
        audioElement.play();
      }
      setCurrentTrack(trackSource);
    }
  };

  /* const playTrack = (track: TrackType) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    audioRef.current!.src = track.source
    audioRef.current!.play()
  }

  const pauseTrack = () => {
    setIsPlaying(false)
  } */

  return (
    <div>
      <Feed 
          /* tracks={tracks}
          
          
          audioRef={audioRef} */
          tracks={tracks}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          /* playTrack={playTrack}
          pauseTrack={pauseTrack} */
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          handlePlayPause={handlePlayPause}
          audioRefs={audioRefs}
        />
      <ControlBar />
    </div>
  )
}

export default Media