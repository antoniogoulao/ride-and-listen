import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { radioSelector, radiosState, selectedRadioState } from "../../../atoms";


const RadioSelector = () => {

    const radios = useRecoilValue(radiosState);
    const selectedRadio = useRecoilValue(selectedRadioState);
    const setSelectedRadio = useSetRecoilState(radioSelector);
    
    return (
    <FormControl sx={{margin:1, minWidth: 120}}>
        <Select
            value={selectedRadio?.id}
            onChange={(event) => setSelectedRadio(event.target.value as number)}
            displayEmpty
            inputProps={{ 'aria-label': 'Select radio' }}
        >
            {radios.map(({ id, name }) => <MenuItem key={id} value={id}><Typography>{name}</Typography></MenuItem>)}

        </Select>
    </FormControl>)
}

export default RadioSelector;