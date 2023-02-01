import React from 'react'
import Track from './Track'
import { TrackType } from '@/lib/types'

interface FeedProps {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  //audioRef: React.RefObject<HTMLAudioElement>;
  //tracks: TrackType[];
  //currentTrack: TrackType;
  //setCurrentTrack: React.Dispatch<React.SetStateAction<any>>; 
  isPlaying: boolean;
  playTrack: (track: TrackType) => void;
  pauseTrack: () => void;
}

const Feed = ({ isPlaying, setIsPlaying, playTrack, pauseTrack }: FeedProps): JSX.Element =>  {
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

  return (
    <div className="flex flex-col place-items-center mb-2 bg-cream h-screen z-0 m-2">
      {tracks.map(track => (
        <Track
          key={track.title}
          track={track}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}

          playTrack={playTrack}
          pauseTrack={pauseTrack}
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