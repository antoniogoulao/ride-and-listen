'use client';

import {
  DarkMode,
  LightMode,
  PauseCircleOutline,
  PlayCircleOutline,
  VisibilityOffOutlined,
  VisibilityOutlined,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { ColorModeContext } from '@/App';
import { About } from './components/About';
import { RadioSelector } from './components/RadioSelector';
import { VideoSelector } from './components/VideoSelector';
import { Volume } from './components/Volume';
import { useAppState } from '@/context/AppStateProvider';
import { getLocale, getTranslations } from '@/i18n';

export const NavBar = ({ locale }: { locale: string }) => {
  const { showBottomBar, radioPlay, setShowBottomBar, setRadioPlay, videoMute, setVideoMute } =
    useAppState();
  const activeLocale = getLocale(locale);
  const t = getTranslations(activeLocale);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleVideoSoundToggle = () => {
    if (videoMute) {
      setRadioPlay(false);
    }
    setVideoMute(!videoMute);
  };

  const handleRadioActionToggle = () => {
    if (!radioPlay) {
      setVideoMute(true);
    }
    setRadioPlay(!radioPlay);
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
          zIndex: 2,
        }}>
        <IconButton
          aria-label="open controls bar"
          onClick={() => setShowBottomBar(true)}
          sx={{ backgroundColor: '#ffffff40' }}>
          <VisibilityOutlined />
        </IconButton>
      </Box>
    );
  }

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, overflowX: 'scroll' }}>
      <Toolbar sx={{ flex: 1, justifyContent: 'space-between', paddingBottom: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton aria-label="hide controls bar" onClick={() => setShowBottomBar(false)}>
              <VisibilityOffOutlined color="secondary" />
            </IconButton>
            <Typography color="secondary">{t.navigation.hide}</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginX={2}
            minWidth="max-content">
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              aria-label="enable/disable dark mode">
              {theme.palette.mode === 'dark' ? (
                <LightMode color="secondary" />
              ) : (
                <DarkMode color="secondary" />
              )}
            </IconButton>
            <Typography color="secondary" textTransform="capitalize">
              {theme.palette.mode === 'dark' ? t.navigation.lightMode : t.navigation.darkMode}
            </Typography>
          </Box>
          <VideoSelector />
          <IconButton aria-label="mute video sound" onClick={handleVideoSoundToggle}>
            {videoMute ? <VolumeOff color="secondary" /> : <VolumeUp color="secondary" />}
          </IconButton>
        </Box>
        <About />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="play/pause radio" onClick={handleRadioActionToggle}>
            {radioPlay ? (
              <PauseCircleOutline color="secondary" />
            ) : (
              <PlayCircleOutline color="secondary" />
            )}
          </IconButton>
          <RadioSelector />
          <Volume />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
