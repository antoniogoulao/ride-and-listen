import { createRef } from "react";
import { useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useRecoilValue } from "recoil";
import { radioPlayState, radioVolumeState, selectedRadioState } from "../atoms";

export const RadioWrapper = () => {
  const radioVolume = useRecoilValue(radioVolumeState);
  const isRadioPlay = useRecoilValue(radioPlayState);
  const selectedRadio = useRecoilValue(selectedRadioState);
  const audioRef = createRef<ReactAudioPlayer>();

  useEffect(() => {
    isRadioPlay
      ? audioRef.current?.audioEl.current?.play()
      : audioRef.current?.audioEl.current?.pause();
  }, [audioRef, isRadioPlay]);

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
