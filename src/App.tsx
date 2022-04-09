import { RecoilRoot } from 'recoil';
import YoutubeWrapper from './video';
import RadioWrapper from './radio';
import NavBar from './navbar';
import { lightBlue, yellow } from '@mui/material/colors';
import { Box, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
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
});

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Box sx={{ height: '100vh', display: 'flex' }}>
          <YoutubeWrapper />
          <NavBar />
          <RadioWrapper />
        </Box>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
