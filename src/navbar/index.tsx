
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { radiosState, selectedRadioState, selectedVideoState, showBottomBarState, videoMuteState, videosState } from '../atoms';
import { FormControl, MenuItem, Select, Typography } from '@material-ui/core';
import Volume from './components/Volume';

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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const NavBar = () => {
    const classes = useStyles();
    const showBottomBar = useRecoilValue(showBottomBarState);
    const selectedVideo = useRecoilValue(selectedVideoState);
    const selectedRadio = useRecoilValue(selectedRadioState);
    const videos = useRecoilValue(videosState);
    const radios = useRecoilValue(radiosState);
    const setShowBottomBar = useSetRecoilState(showBottomBarState);
    const setSelectedVideo = useSetRecoilState(selectedVideoState);
    const setSelectedRadio = useSetRecoilState(selectedRadioState);
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
                <FormControl className={classes.formControl}>
                    <Select
                        value={selectedVideo}
                        onChange={(event) => setSelectedVideo(event.target.value as string)}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Select video' }}
                    >
                        {videos.map(({ videoId, name }) => <MenuItem value={videoId}><Typography>{name}</Typography></MenuItem>)}

                    </Select>
                </FormControl>
                <IconButton edge="end" color="inherit" onClick={() => setVideoMute(isVideoMute === 1 ? 0 : 1)}>
                    {isVideoMute === 1 ? <VolumeUpIcon /> : <VolumeOffIcon />}
                </IconButton>
                <FormControl className={classes.formControl}>
                    <Select
                        value={selectedRadio}
                        onChange={(event) => setSelectedRadio(event.target.value as string)}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Select video' }}
                    >
                        {radios.map(({ url, name }) => <MenuItem value={url}><Typography>{name}</Typography></MenuItem>)}

                    </Select>
                </FormControl>
                <Volume />
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;