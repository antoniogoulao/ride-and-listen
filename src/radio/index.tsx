import { useEffect, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useAtomValue } from 'jotai';
import { radioPlayAtom, radioVolumeAtom, selectedRadioAtom } from '../atoms';

export const RadioWrapper = () => {
  const radioVolume = useAtomValue(radioVolumeAtom);
  const isRadioPlay = useAtomValue(radioPlayAtom);
  const selectedRadio = useAtomValue(selectedRadioAtom);
  const audioRef = useRef<ReactAudioPlayer>(null);

  useEffect(() => {
    isRadioPlay
      ? audioRef.current?.audioEl.current?.play()
      : audioRef.current?.audioEl.current?.pause();
  }, [isRadioPlay]);

  return (
    <ReactAudioPlayer
      key={selectedRadio?.name}
      ref={audioRef}
      id="audio"
      src={selectedRadio?.url}
      autoPlay={isRadioPlay}
      volume={radioVolume / 100.0}
      controls={false}
    />
  );
};