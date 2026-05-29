import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  createTheme,
  IconButton,
  PaletteMode,
  ThemeProvider,
} from '@mui/material';
import { lightBlue, yellow } from '@mui/material/colors';
import { useAtomValue, useSetAtom } from 'jotai';
import { createContext, useEffect, useMemo, useState } from 'react';
import { currentViewAtom } from './atoms';
import { useNavigate } from './hooks/useNavigate';
import { LandingPage } from './landing';
import { NavBar } from './navbar';
import { PrivacyPolicy } from './privacy';
import { RadioWrapper } from './radio';
import { YoutubeWrapper } from './video';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const App = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
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

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: yellow[700] },
          secondary: { main: lightBlue[900] },
          text: { primary: lightBlue[900] },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
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
    </ColorModeContext.Provider>
  );
};

export default App;