import { createRef } from "react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { radioPlayState, radioVolumeState, selectedRadioState } from "../atoms";

const RadioWrapper = () => {
    const radioVolume = useRecoilValue(radioVolumeState);
    const radioPlay = useRecoilValue(radioPlayState);
    const selectedRadio = useRecoilValue(selectedRadioState);
    const audioRef = createRef<HTMLAudioElement>();

    useEffect(() => {
        const audio = audioRef.current;
        if (audio !== null) {
            audio.volume = (radioVolume / 100);
        }
    }, [audioRef, radioVolume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio !== null) {
            radioPlay ? audio.play() : audio.pause();
        }
    }, [audioRef, radioPlay]);
    console.log(selectedRadio);

    return (
        <audio ref={audioRef} autoPlay id="audio" preload="metadata" src={selectedRadio?.url} title={selectedRadio?.name}><p>Your browser does not support the <code>audio</code> element.</p></audio>
    )
}

export default RadioWrapper;