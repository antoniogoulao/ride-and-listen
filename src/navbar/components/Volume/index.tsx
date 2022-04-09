import Slider from '@mui/material/Slider';
import { VolumeUp, VolumeDown } from '@mui/icons-material';
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { radioVolumeState } from '../../../atoms';
import { Box } from '@mui/system';
import { Grid, IconButton } from '@mui/material';


const handleVolumeChange = (setVolume: SetterOrUpdater<number>) => (_: any, value: number | number[]) => {
    if (value > 100)
        value = 100
    if (value < 0)
        value = 0
    setVolume(value as number);
}

const Volume = () => {
    const volume = useRecoilValue(radioVolumeState);
    const setVolume = useSetRecoilState(radioVolumeState);

    return (
        <Box sx={{ width: 200 }} display="flex" alignItems="center">
            <IconButton onClick={() => handleVolumeChange(setVolume)(null, volume - 10)}>
                <VolumeDown color='secondary' />
            </IconButton>

            <Slider min={0} max={100} value={volume} onChange={handleVolumeChange(setVolume)} aria-labelledby="Volume" color="secondary" />

            <IconButton onClick={() => handleVolumeChange(setVolume)(null, (volume + 10))}>
                <VolumeUp color='secondary' />
            </IconButton>

        </Box>)
}

export default Volume;