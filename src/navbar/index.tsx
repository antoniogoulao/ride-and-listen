import {
  PauseCircleOutlineOutlined,
  PlayCircleOutlineOutlined,
  VolumeUp,
  VolumeOff,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAtom, useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import {
  currentViewAtom,
  radioPlayAtom,
  showBottomBarAtom,
  videoMuteAtom,
} from '../atoms';
import { About } from './components/About';
import { LanguageSelector } from './components/LanguageSelector';
import { RadioSelector } from './components/RadioSelector';
import { VideoSelector } from './components/VideoSelector';
import { Volume } from './components/Volume';

export const NavBar = () => {
  const [showBottomBar, setShowBottomBar] = useAtom(showBottomBarAtom);
  const [isRadioPlay, setRadioPlay] = useAtom(radioPlayAtom);
  const [isVideoMute, setVideoMute] = useAtom(videoMuteAtom);
  const currentView = useAtomValue(currentViewAtom);
  const isOnLanding = currentView === 'landing' || currentView === 'privacy';
  const { t } = useTranslation();

  const handleVideoSoundToggle = () => {
    if (isVideoMute) setRadioPlay(false);
    setVideoMute(!isVideoMute);
  };

  const handleRadioActionToggle = () => {
    if (!isRadioPlay) setVideoMute(true);
    setRadioPlay(!isRadioPlay);
  };

  if (!showBottomBar) {
    return (
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          marginLeft: 6,
          marginBottom: 3,
        }}
      >
        <IconButton
          aria-label="open controls bar"
          onClick={() => setShowBottomBar(true)}
          sx={{ backgroundColor: '#ffffff40' }}
        >
          <VisibilityOutlined />
        </IconButton>
      </Box>
    );
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        overflowX: 'auto',
        bgcolor: 'rgba(20, 23, 28, 0.92)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid #23272E',
        backgroundImage: 'none',
      }}
    >
      <Toolbar
        sx={{ flex: 1, justifyContent: 'space-between', paddingBottom: 1 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
            <IconButton
              aria-label="hide controls bar"
              onClick={() => setShowBottomBar(false)}
            >
              <VisibilityOffOutlined color="secondary" />
            </IconButton>
            <Typography color="secondary" variant="caption">
              {t('hide')}
            </Typography>
          </Box>
          {!isOnLanding && <VideoSelector />}
          {!isOnLanding && (
            <IconButton
              aria-label="mute video sound"
              onClick={handleVideoSoundToggle}
            >
              {isVideoMute ? (
                <VolumeOff color="secondary" />
              ) : (
                <VolumeUp color="secondary" />
              )}
            </IconButton>
          )}
          <LanguageSelector />
        </Box>
        <About />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            aria-label="play/pause radio"
            onClick={handleRadioActionToggle}
            sx={{
              bgcolor: 'primary.main',
              color: '#14110A',
              mr: 1,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            {isRadioPlay ? <PauseCircleOutlineOutlined /> : <PlayCircleOutlineOutlined />}
          </IconButton>
          <RadioSelector />
          <Volume />
        </Box>
      </Toolbar>
    </AppBar>
  );
};