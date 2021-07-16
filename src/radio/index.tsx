import { useRecoilValue } from "recoil";
import { selectedRadioState } from "../atoms";

const RadioWrapper = () => {

    const selectedRadio = useRecoilValue(selectedRadioState);
    return (
        <audio autoPlay id="audio" preload="metadata" src={selectedRadio} title={selectedRadio}><p>Your browser does not support the <code>audio</code> element.</p></audio>
    )
}

export default RadioWrapper;