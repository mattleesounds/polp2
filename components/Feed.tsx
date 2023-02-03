import React from 'react'
import Track from './Track'
import { TrackType } from '@/lib/types'

interface FeedProps {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  //audioRef: React.RefObject<HTMLAudioElement>;
  tracks: TrackType[];
  currentTrack: string | null;
  setCurrentTrack: React.Dispatch<React.SetStateAction<any>>; 
  isPlaying: boolean;
  /* playTrack: (track: TrackType) => void;
  pauseTrack: () => void; */
  handlePlayPause: (trackSource: string) => void;
  audioRefs: React.MutableRefObject<Map<string, HTMLAudioElement>>;
}

const Feed = ({ isPlaying, setIsPlaying, handlePlayPause, tracks, currentTrack, setCurrentTrack, audioRefs }: FeedProps): JSX.Element =>  {
  

  return (
    <div className="flex flex-col place-items-center mb-2 bg-cream h-screen z-0 m-2">
      {tracks.map(track => (
        <Track
          key={track.title}
          track={track}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          /* playTrack={playTrack}
          pauseTrack={pauseTrack} */
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          handlePlayPause={handlePlayPause}
          audioRefs={audioRefs}
        />
      ))}
      {/* <Track />
      <Track />
      <Track />
      <Track />
      <Track />
      <Track /> */}
    </div>
  )
}

export default Feed