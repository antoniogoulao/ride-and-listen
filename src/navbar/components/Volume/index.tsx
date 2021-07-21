import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { radioVolumeState } from '../../../atoms';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: 200,
    },
});

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
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography id="continuous-slider">
                Radio Volume
            </Typography>
            <Grid container spacing={2}>
                <Grid item>
                    <IconButton onClick={() => handleVolumeChange(setVolume)(null, volume - 10)}>
                        <VolumeDown />
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <Slider min={0} max={100} value={volume} onChange={handleVolumeChange(setVolume)} aria-labelledby="continuous-slider" />
                </Grid>
                <Grid item>
                    <IconButton onClick={() => handleVolumeChange(setVolume)(null, (volume + 10))}>
                        <VolumeUp />
                    </IconButton>
                </Grid>
            </Grid>
        </div>)
}

export default Volume;