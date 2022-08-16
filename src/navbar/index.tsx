
import { PauseCircleOutline, PlayCircleOutline, VolumeUp, VolumeOff, VisibilityOffOutlined, VisibilityOutlined, Brightness7, Brightness4 } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ColorModeContext } from '../App';
import { radioPlayState, showBottomBarState, videoMuteState } from '../atoms';
import About from './components/About';
import RadioSelector from './components/RadioSelector';
import VideoSelector from './components/VideoSelector';
import Volume from './components/Volume';

const NavBar = () => {
    const showBottomBar = useRecoilValue(showBottomBarState);
    const isRadioPlay = useRecoilValue(radioPlayState);
    const setShowBottomBar = useSetRecoilState(showBottomBarState);
    const setRadioPlay = useSetRecoilState(radioPlayState);
    const isVideoMute = useRecoilValue(videoMuteState);
    const setVideoMute = useSetRecoilState(videoMuteState);
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const handleVideoSoundToggle = () => {
        isVideoMute && setRadioPlay(false);
        setVideoMute(!isVideoMute);
    }

    const handleRadioActionToggle = () => {
        !isRadioPlay && setVideoMute(true);
        setRadioPlay(!isRadioPlay);
    }

    if (!showBottomBar) {
        return (
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                marginLeft: 6,
                marginBottom: 3
            }}>
                <IconButton aria-label="open controls bar" onClick={() => setShowBottomBar(true)} sx={{ backgroundColor: '#ffffff40' }}>
                    <VisibilityOutlined />
                </IconButton>
            </Box>
        )
    }

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, overflowX: 'scroll' }}>
            <Toolbar sx={{ flex: 1, justifyContent: 'space-between', paddingBottom: 1 }} >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box display='flex' flexDirection='column' alignItems='center'>
                        <IconButton aria-label="hide controls bar" onClick={() => setShowBottomBar(false)}>
                            <VisibilityOffOutlined color='secondary' />
                        </IconButton>
                        <Typography color="secondary">Hide</Typography>
                    </Box>
                    <Box display='flex' flexDirection='column' alignItems='center' marginX={2} minWidth='max-content'>
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} aria-label="enable/disable dark mode">
                            {theme.palette.mode === 'dark' ? <Brightness7 color='secondary' /> : <Brightness4 color='secondary' />}
                        </IconButton>
                        <Typography color="secondary" textTransform='capitalize'>{theme.palette.mode} mode</Typography>
                    </Box>
                    <VideoSelector />
                    <IconButton aria-label="mute video sound" onClick={handleVideoSoundToggle}>
                        {isVideoMute ? <VolumeOff color='secondary' /> : <VolumeUp color='secondary' />}
                    </IconButton>
                </Box>
                <About />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton aria-label="play/pause radio" onClick={handleRadioActionToggle}>
                        {isRadioPlay ? <PauseCircleOutline color='secondary' /> : <PlayCircleOutline color='secondary' />}
                    </IconButton>
                    <RadioSelector />
                    <Volume />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;