
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { radioPlayState, showBottomBarState, videoMuteState } from '../atoms';
import Volume from './components/Volume';
import {  PauseCircleOutline, PlayCircleOutline } from '@material-ui/icons';
import RadioSelector from './components/RadioSelector';
import VideoSelector from './components/VideoSelector';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            top: 'auto',
            bottom: 0,
        },
        grow: {
            flexGrow: 1,
        },
        hiddenBar: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            margin: theme.spacing(1, 3),
        },
    }),
);

const NavBar = () => {
    const classes = useStyles();
    const showBottomBar = useRecoilValue(showBottomBarState);
    const isRadioPlay = useRecoilValue(radioPlayState);
    const setShowBottomBar = useSetRecoilState(showBottomBarState);
    const setRadioPlay = useSetRecoilState(radioPlayState);
    const isVideoMute = useRecoilValue(videoMuteState);
    const setVideoMute = useSetRecoilState(videoMuteState);

    if (!showBottomBar) {
        return (
            <div className={classes.hiddenBar}>
                <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={() => setShowBottomBar(true)}>
                    <VisibilityIcon />
                </IconButton>
            </div>
        )
    }

    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={() => setShowBottomBar(false)}>
                    <VisibilityOffIcon />
                </IconButton>
                <VideoSelector />
                <IconButton edge="end" color="inherit" onClick={() => setVideoMute(isVideoMute === 1 ? 0 : 1)}>
                    {isVideoMute === 1 ? <VolumeUpIcon /> : <VolumeOffIcon />}
                </IconButton>
                <IconButton edge="end" color="inherit" onClick={() => setRadioPlay(!isRadioPlay)}>
                    {isRadioPlay ? <PauseCircleOutline /> : <PlayCircleOutline />}
                </IconButton>
                <RadioSelector />
                <Volume />
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;