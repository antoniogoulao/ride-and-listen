import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { radioPlayAtom, radioVolumeAtom, selectedRadioAtom } from '../atoms';

export const RadioWrapper = () => {
  const radioVolume = useAtomValue(radioVolumeAtom);
  const isRadioPlay = useAtomValue(radioPlayAtom);
  const selectedRadio = useAtomValue(selectedRadioAtom);
  const audioRef = useRef<HTMLAudioElement>(null);

  // selectedRadio in the deps: the key-remount creates a fresh element with default volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = radioVolume / 100;
  }, [radioVolume, selectedRadio]);

  useEffect(() => {
    if (isRadioPlay) {
      audioRef.current?.play().catch(() => {});
    } else {
      audioRef.current?.pause();
    }
  }, [isRadioPlay]);

  return (
    <audio
      key={selectedRadio?.name}
      ref={audioRef}
      id="audio"
      src={selectedRadio?.url}
      autoPlay={isRadioPlay}
    />
  );
};
