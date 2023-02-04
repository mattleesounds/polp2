import React from 'react'
import Track from './Track'
import { TrackType } from '@/lib/types'

interface FeedProps {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  tracks: TrackType[];
  currentTrack: string | null;
  setCurrentTrack: React.Dispatch<React.SetStateAction<any>>; 
  isPlaying: boolean;
  handlePlayPause: (trackSource: string) => void;
  audioRefs: React.MutableRefObject<Map<string, HTMLAudioElement>>;
  durRefs: React.MutableRefObject<Map<string, number>>;
}

const Feed = ({ isPlaying, setIsPlaying, handlePlayPause, tracks, currentTrack, setCurrentTrack, audioRefs, durRefs }: FeedProps): JSX.Element =>  {
  

  return (
    <div className="flex flex-col place-items-center mb-2 bg-cream h-full z-0 m-2 pb-24">
      {tracks.map(track => (
        <Track
          key={track.title}
          track={track}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          handlePlayPause={handlePlayPause}
          audioRefs={audioRefs}
          durRefs={durRefs}
        />
      ))}
    </div>
  )
}

export default Feed