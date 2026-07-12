import { ArrowBack } from '@mui/icons-material';
import { Box, createTheme, CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { currentViewAtom } from './atoms';
import { useNavigate } from './hooks/useNavigate';
import { LandingPage } from './landing';
import { NavBar } from './navbar';
import { PrivacyPolicy } from './privacy';
import { RadioWrapper } from './radio';
import { YoutubeWrapper } from './video';

const oswald = { fontFamily: 'Oswald, "Arial Narrow", sans-serif' };

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0D0F12', paper: '#14171C' },
    primary: { main: '#F5A623' },
    secondary: { main: '#EAE6DC' },
    text: { primary: '#EAE6DC', secondary: 'rgba(234,230,220,0.6)' },
    divider: '#23272E',
  },
  typography: { h1: oswald, h2: oswald, h3: oswald, h4: oswald },
});

export const App = () => {
  const currentView = useAtomValue(currentViewAtom);
  const setCurrentView = useSetAtom(currentViewAtom);
  const { navigateToLanding } = useNavigate();

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('page') === 'privacy') {
        setCurrentView('privacy');
      } else {
        setCurrentView(params.get('v') ?? 'landing');
      }
    };
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [setCurrentView]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', position: 'relative' }}>
        {currentView === 'landing' ? (
          <LandingPage />
        ) : currentView === 'privacy' ? (
          <PrivacyPolicy />
        ) : (
          <YoutubeWrapper />
        )}
        {currentView !== 'landing' && currentView !== 'privacy' && (
          <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>
            <IconButton
              onClick={navigateToLanding}
              aria-label="back to landing page"
              sx={{ backgroundColor: '#ffffff40' }}
            >
              <ArrowBack />
            </IconButton>
          </Box>
        )}
        <NavBar />
        <RadioWrapper />
      </Box>
    </ThemeProvider>
  );
};

export default App;
