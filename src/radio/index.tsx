'use client';

import { createRef, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useAppState } from '@/context/AppStateProvider';

export const RadioWrapper = () => {
  const { radioVolume, radioPlay, selectedRadio } = useAppState();
  const audioRef = createRef<ReactAudioPlayer>();

  useEffect(() => {
    if (audioRef.current?.audioEl.current) {
      if (radioPlay) {
        audioRef.current.audioEl.current.play();
      } else {
        audioRef.current.audioEl.current.pause();
      }
    }
  }, [audioRef, radioPlay]);

  return (
    <ReactAudioPlayer
      key={selectedRadio?.name}
      ref={audioRef}
      id="audio"
      src={selectedRadio?.url}
      autoPlay={radioPlay}
      volume={radioVolume / 100.0}
      controls={false}
    />
  );
};
