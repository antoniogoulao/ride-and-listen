import { YoutubeWrapper } from './video';
import { RadioWrapper } from './radio';
import { NavBar } from './navbar';
import { lightBlue, yellow } from '@mui/material/colors';
import { Box, createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { createContext, useMemo, useState } from 'react';
import { AppStateProvider } from './context/AppStateProvider';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const App = ({ locale }: { locale: string }) => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: yellow[700],
          },
          secondary: {
            main: lightBlue[900],
          },
          text: {
            primary: lightBlue[900],
          },
        },
      }),
    [mode],
  );

  return (
    <AppStateProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Box sx={{ height: '100vh', display: 'flex' }}>
            <YoutubeWrapper />
            <NavBar locale={locale} />
            <RadioWrapper />
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppStateProvider>
  );
};
