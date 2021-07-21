import { createRef } from "react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { radioVolumeState, selectedRadioState } from "../atoms";

const RadioWrapper = () => {
    const radioVolume = useRecoilValue(radioVolumeState);
    const audioRef = createRef<HTMLAudioElement>();

    useEffect(() => {
        const audio = audioRef.current;
        if (audio !== null) {
            audio.volume = (radioVolume / 100);
        }
    }, [audioRef, radioVolume]);

    const selectedRadio = useRecoilValue(selectedRadioState);
    return (
        <audio ref={audioRef} autoPlay id="audio" preload="metadata" src={selectedRadio} title={selectedRadio}><p>Your browser does not support the <code>audio</code> element.</p></audio>
    )
}

export default RadioWrapper;