# Landing Page & Jotai Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the discontinued Recoil library with Jotai and add a scrollable landing page with video thumbnails and a search bar, with client-side view routing that never remounts the radio player or bottom bar.

**Architecture:** A new `currentViewAtom` (Jotai) is the single source of truth for the active view — either `'landing'` or a YouTube video ID string. URL is kept in sync via `window.history.pushState`. `LandingPage` and `YoutubeWrapper` are conditionally rendered; `NavBar` and `RadioWrapper` stay mounted throughout. YouTube thumbnails are fetched from `img.youtube.com`.

**Tech Stack:** React 18, TypeScript, Jotai v2 (with `jotai/utils`), MUI v5, react-youtube, react-audio-player, Create React App, GitHub Pages

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `package.json` | swap `recoil` → `jotai` |
| Rewrite | `src/atoms.ts` | all Jotai atoms including `currentViewAtom` |
| Delete | `src/localStorage.ts` | replaced by `atomWithStorage` from `jotai/utils` |
| Create | `src/hooks/useNavigate.ts` | view transitions + URL sync via `pushState` |
| Modify | `src/types.ts` | add `keywords?: string[]` to `Video` |
| Rewrite | `src/App.tsx` | remove RecoilRoot, URL init on mount, view switching, back button |
| Modify | `src/video/index.tsx` | read videoId from `currentViewAtom`; update `onEndVideo` |
| Modify | `src/radio/index.tsx` | Recoil → Jotai hooks |
| Modify | `src/navbar/index.tsx` | Recoil → Jotai; hide VideoSelector + mute button on landing |
| Modify | `src/navbar/components/VideoSelector/index.tsx` | use `currentViewAtom` + `useNavigate` |
| Modify | `src/navbar/components/RadioSelector/index.tsx` | Recoil → Jotai; remove `radioSelector` |
| Modify | `src/navbar/components/Volume/index.tsx` | Recoil → Jotai; remove `SetterOrUpdater` |
| Create | `src/landing/index.tsx` | header, search bar, responsive video grid |

---

## Task 1: Install Jotai, remove Recoil

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Swap the packages**

```bash
yarn remove recoil && yarn add jotai
```

Expected: completes without error; `node_modules/jotai` exists.

- [ ] **Step 2: Verify package.json**

Confirm `"jotai"` is in `"dependencies"` and `"recoil"` is gone.

---

## Task 2: Rewrite src/atoms.ts with Jotai

**Files:**
- Rewrite: `src/atoms.ts`

> **Important:** After this step every component that imports from `atoms.ts` will have TypeScript errors until Tasks 3–9 are complete. The app won't compile mid-migration — complete all migration tasks before running it.

- [ ] **Step 1: Replace the entire file**

```typescript
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { RADIOS } from './radios';
import { Radio, Speed, Video } from './types';
import { VIDEOS } from './videos';

export const showBottomBarAtom = atom<boolean>(true);

// 'landing' = show landing page; any other string = videoId to play
export const currentViewAtom = atom<'landing' | string>('landing');

export const videosAtom = atom<Video[]>(VIDEOS);

export const selectedRadioAtom = atomWithStorage<Radio>(
  'RECENTLY_PLAYED',
  RADIOS[0]
);

export const radiosAtom = atom<Radio[]>(RADIOS);

export const radioVolumeAtom = atomWithStorage<number>('VOLUME', 50);

export const radioPlayAtom = atom<boolean>(false);

export const videoMuteAtom = atom<boolean>(true);

export const videoSpeedAtom = atom<Speed>(1);
```

Old → new atom name mapping:
- `showBottomBarState` → `showBottomBarAtom`
- `selectedVideoState` → **removed** (use `currentViewAtom`)
- `videosState` → `videosAtom`
- `selectedRadioState` → `selectedRadioAtom`
- `radiosState` → `radiosAtom`
- `radioVolumeState` → `radioVolumeAtom`
- `radioPlayState` → `radioPlayAtom`
- `videoMuteState` → `videoMuteAtom`
- `videoSpeedState` → `videoSpeedAtom`
- `radioSelector` → **removed** (was a no-op pass-through)

---

## Task 3: Create src/hooks/useNavigate.ts

**Files:**
- Create: `src/hooks/useNavigate.ts`
- Create: `src/hooks/useNavigate.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/hooks/useNavigate.test.ts`:

```typescript
import { renderHook, act } from '@testing-library/react';
import { getDefaultStore } from 'jotai';
import { currentViewAtom } from '../atoms';
import { useNavigate } from './useNavigate';

const pushStateSpy = jest
  .spyOn(window.history, 'pushState')
  .mockImplementation(() => {});

beforeEach(() => {
  getDefaultStore().set(currentViewAtom, 'landing');
  pushStateSpy.mockClear();
});

describe('useNavigate', () => {
  test('navigateToVideo sets currentViewAtom to the videoId and pushes URL', () => {
    const { result } = renderHook(() => useNavigate());

    act(() => {
      result.current.navigateToVideo('abc123');
    });

    expect(getDefaultStore().get(currentViewAtom)).toBe('abc123');
    expect(pushStateSpy).toHaveBeenCalledWith(null, '', '?v=abc123');
  });

  test('navigateToLanding sets currentViewAtom to landing and pushes URL', () => {
    getDefaultStore().set(currentViewAtom, 'abc123');
    const { result } = renderHook(() => useNavigate());

    act(() => {
      result.current.navigateToLanding();
    });

    expect(getDefaultStore().get(currentViewAtom)).toBe('landing');
    expect(pushStateSpy).toHaveBeenCalledWith(null, '', '/');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn test --watchAll=false --testPathPattern="useNavigate"
```

Expected: FAIL — `Cannot find module './useNavigate'`

- [ ] **Step 3: Create `src/hooks/useNavigate.ts`**

```typescript
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { currentViewAtom } from '../atoms';

export const useNavigate = () => {
  const setCurrentView = useSetAtom(currentViewAtom);

  const navigateToVideo = useCallback(
    (videoId: string) => {
      setCurrentView(videoId);
      window.history.pushState(null, '', `?v=${videoId}`);
    },
    [setCurrentView]
  );

  const navigateToLanding = useCallback(() => {
    setCurrentView('landing');
    window.history.pushState(null, '', '/');
  }, [setCurrentView]);

  return { navigateToVideo, navigateToLanding };
};
```

- [ ] **Step 4: Run test to verify it passes**

```bash
yarn test --watchAll=false --testPathPattern="useNavigate"
```

Expected: PASS — 2 tests passing

---

## Task 4: Migrate src/radio/index.tsx to Jotai

**Files:**
- Modify: `src/radio/index.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { createRef, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useAtomValue } from 'jotai';
import { radioPlayAtom, radioVolumeAtom, selectedRadioAtom } from '../atoms';

export const RadioWrapper = () => {
  const radioVolume = useAtomValue(radioVolumeAtom);
  const isRadioPlay = useAtomValue(radioPlayAtom);
  const selectedRadio = useAtomValue(selectedRadioAtom);
  const audioRef = createRef<ReactAudioPlayer>();

  useEffect(() => {
    isRadioPlay
      ? audioRef.current?.audioEl.current?.play()
      : audioRef.current?.audioEl.current?.pause();
  }, [audioRef, isRadioPlay]);

  return (
    <ReactAudioPlayer
      key={selectedRadio?.name}
      ref={audioRef}
      id="audio"
      src={selectedRadio?.url}
      autoPlay={isRadioPlay}
      volume={radioVolume / 100.0}
      controls={false}
    />
  );
};
```

---

## Task 5: Migrate src/navbar/components/Volume/index.tsx to Jotai

**Files:**
- Modify: `src/navbar/components/Volume/index.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/system';
import { useAtom } from 'jotai';
import { radioVolumeAtom } from '../../../atoms';

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export const Volume = () => {
  const [volume, setVolume] = useAtom(radioVolumeAtom);

  const handleSliderChange = (_: unknown, value: number | number[]) => {
    if (typeof value === 'number') setVolume(clamp(value));
  };

  return (
    <Box sx={{ width: 200 }} display="flex" alignItems="center">
      <IconButton
        onClick={() => setVolume(clamp(volume - 10))}
        aria-label="volume down"
      >
        <VolumeDown color="secondary" />
      </IconButton>

      <Slider
        min={0}
        max={100}
        value={volume}
        onChange={handleSliderChange}
        aria-labelledby="Volume"
        color="secondary"
      />

      <IconButton
        onClick={() => setVolume(clamp(volume + 10))}
        aria-label="volume up"
      >
        <VolumeUp color="secondary" />
      </IconButton>
    </Box>
  );
};
```

---

## Task 6: Migrate src/navbar/components/RadioSelector/index.tsx to Jotai

**Files:**
- Modify: `src/navbar/components/RadioSelector/index.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { radiosAtom, selectedRadioAtom } from '../../../atoms';
import { RADIOS } from '../../../radios';

export const RadioSelector = () => {
  const radios = useAtomValue(radiosAtom);
  const [selectedRadio, setSelectedRadio] = useAtom(selectedRadioAtom);

  const handleRadioChange = useCallback(
    (radioId: number) => {
      const newRadio = RADIOS.find((elem) => elem.id === radioId);
      if (newRadio) setSelectedRadio(newRadio);
    },
    [setSelectedRadio]
  );

  return (
    <FormControl sx={{ margin: 1, minWidth: 120 }}>
      <Select
        value={selectedRadio?.id}
        onChange={(event) => handleRadioChange(event.target.value as number)}
        displayEmpty
        inputProps={{ 'aria-label': 'Select radio' }}
      >
        {radios.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
```

---

## Task 7: Migrate src/navbar/components/VideoSelector/index.tsx to Jotai

**Files:**
- Modify: `src/navbar/components/VideoSelector/index.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import { currentViewAtom, videosAtom } from '../../../atoms';
import { useNavigate } from '../../../hooks/useNavigate';

export const VideoSelector = () => {
  const videos = useAtomValue(videosAtom);
  const currentView = useAtomValue(currentViewAtom);
  const { navigateToVideo } = useNavigate();

  return (
    <FormControl sx={{ margin: 1, minWidth: 120 }}>
      <Select
        value={currentView}
        onChange={(event) => navigateToVideo(event.target.value as string)}
        displayEmpty
        inputProps={{ 'aria-label': 'Select video' }}
      >
        {videos.map(({ videoId, name }) => (
          <MenuItem key={videoId} value={videoId}>
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
```

---

## Task 8: Migrate src/video/index.tsx to Jotai + currentViewAtom

**Files:**
- Modify: `src/video/index.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { useAtomValue } from 'jotai';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { currentViewAtom, videoMuteAtom, videoSpeedAtom } from '../atoms';
import { VIDEOS } from '../videos';
import { useNavigate } from '../hooks/useNavigate';

export const YoutubeWrapper = () => {
  const currentView = useAtomValue(currentViewAtom);
  const isVideoMute = useAtomValue(videoMuteAtom);
  const speed = useAtomValue(videoSpeedAtom);
  const [player, setPlayer] = useState<YouTubePlayer>();
  const { navigateToVideo } = useNavigate();

  useEffect(() => {
    isVideoMute ? player?.mute() : player?.unMute();
  }, [isVideoMute, player]);

  useEffect(() => {
    player?.setPlaybackRate(speed);
    player?.playVideo();
  }, [player, speed]);

  const onReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);
  };

  const onEndVideo = () => {
    const index = VIDEOS.findIndex((elem) => elem.videoId === currentView);
    navigateToVideo(VIDEOS[(index + 1) % VIDEOS.length].videoId);
  };

  return (
    <YouTube
      videoId={currentView as string}
      className="youtube-player"
      onReady={onReady}
      onEnd={onEndVideo}
      opts={{
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
        },
      }}
    />
  );
};
```

`currentView as string` is safe here because `YoutubeWrapper` is only rendered when `currentView !== 'landing'` (enforced in `App.tsx`).

---

## Task 9: Migrate src/navbar/index.tsx to Jotai + hide controls on landing

**Files:**
- Modify: `src/navbar/index.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import {
  PauseCircleOutline,
  PlayCircleOutline,
  VolumeUp,
  VolumeOff,
  VisibilityOffOutlined,
  VisibilityOutlined,
  Brightness7,
  Brightness4,
} from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { ColorModeContext } from '../App';
import {
  currentViewAtom,
  radioPlayAtom,
  showBottomBarAtom,
  videoMuteAtom,
} from '../atoms';
import { About } from './components/About';
import { RadioSelector } from './components/RadioSelector';
import { VideoSelector } from './components/VideoSelector';
import { Volume } from './components/Volume';

export const NavBar = () => {
  const [showBottomBar, setShowBottomBar] = useAtom(showBottomBarAtom);
  const [isRadioPlay, setRadioPlay] = useAtom(radioPlayAtom);
  const [isVideoMute, setVideoMute] = useAtom(videoMuteAtom);
  const currentView = useAtomValue(currentViewAtom);
  const isOnLanding = currentView === 'landing';
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

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
      color="primary"
      sx={{ top: 'auto', bottom: 0, overflowX: 'scroll' }}
    >
      <Toolbar
        sx={{ flex: 1, justifyContent: 'space-between', paddingBottom: 1 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton
              aria-label="hide controls bar"
              onClick={() => setShowBottomBar(false)}
            >
              <VisibilityOffOutlined color="secondary" />
            </IconButton>
            <Typography color="secondary">Hide</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginX={2}
            minWidth="max-content"
          >
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              aria-label="enable/disable dark mode"
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7 color="secondary" />
              ) : (
                <Brightness4 color="secondary" />
              )}
            </IconButton>
            <Typography color="secondary" textTransform="capitalize">
              {theme.palette.mode} mode
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
        </Box>
        <About />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            aria-label="play/pause radio"
            onClick={handleRadioActionToggle}
          >
            {isRadioPlay ? (
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
```

---

## Task 10: Rewrite src/App.tsx — remove RecoilRoot, add view switching, URL init, back button

**Files:**
- Rewrite: `src/App.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
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
import { RadioWrapper } from './radio';
import { YoutubeWrapper } from './video';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const App = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const currentView = useAtomValue(currentViewAtom);
  const setCurrentView = useSetAtom(currentViewAtom);
  const { navigateToLanding } = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get('v');
    if (videoId) setCurrentView(videoId);
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
          {currentView === 'landing' ? <LandingPage /> : <YoutubeWrapper />}
          {currentView !== 'landing' && (
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
```

Note: `RecoilRoot` is gone — Jotai requires no Provider. `export default App` is kept because `App.test.js` imports it as a default import.

---

## Task 11: Delete src/localStorage.ts

**Files:**
- Delete: `src/localStorage.ts`

- [ ] **Step 1: Delete the file**

```bash
rm src/localStorage.ts
```

- [ ] **Step 2: Confirm no remaining imports**

```bash
grep -r "localStorage" src/ --include="*.ts" --include="*.tsx"
```

Expected: no lines importing from `./localStorage` or `../localStorage`. (Lines touching `window.localStorage` from `atomWithStorage` internals are fine.)

---

## Task 12: Update src/types.ts — add keywords to Video

**Files:**
- Modify: `src/types.ts`

- [ ] **Step 1: Replace the file**

```typescript
export type Video = {
  videoId: string;
  name: string;
  keywords?: string[];
};

export type Radio = {
  id: number;
  url: string;
  name: string;
};

export type Speed = 1 | 1.5 | 2;
```

---

## Task 13: Write failing tests for LandingPage

**Files:**
- Create: `src/landing/LandingPage.test.tsx`

- [ ] **Step 1: Write the tests**

Create `src/landing/LandingPage.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { LandingPage } from './index';

jest.mock('../hooks/useNavigate', () => ({
  useNavigate: () => ({ navigateToVideo: jest.fn() }),
}));

const theme = createTheme();
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('LandingPage', () => {
  test('renders the page title', () => {
    renderWithTheme(<LandingPage />);
    expect(screen.getByText('Ride & Listen')).toBeInTheDocument();
  });

  test('renders a thumbnail image for each video', () => {
    renderWithTheme(<LandingPage />);
    // getAllByRole('img') includes the logo — video thumbnails have alt = video name
    expect(screen.getByAltText('Portagem (Marvão) -> Castelo de Vide, Alentejo')).toBeInTheDocument();
    expect(screen.getByAltText('N222 - Parte 1, Norte')).toBeInTheDocument();
  });

  test('search bar filters videos by title', () => {
    renderWithTheme(<LandingPage />);
    const searchInput = screen.getByPlaceholderText('Search videos...');
    fireEvent.change(searchInput, { target: { value: 'N222' } });
    expect(screen.getByAltText('N222 - Parte 1, Norte')).toBeInTheDocument();
    expect(screen.getByAltText('N222 - Parte 2, Norte')).toBeInTheDocument();
    expect(
      screen.queryByAltText('Portagem (Marvão) -> Castelo de Vide, Alentejo')
    ).not.toBeInTheDocument();
  });

  test('search bar shows all videos when query is cleared', () => {
    renderWithTheme(<LandingPage />);
    const searchInput = screen.getByPlaceholderText('Search videos...');
    fireEvent.change(searchInput, { target: { value: 'N222' } });
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(
      screen.getByAltText('Portagem (Marvão) -> Castelo de Vide, Alentejo')
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
yarn test --watchAll=false --testPathPattern="LandingPage"
```

Expected: FAIL — `Cannot find module './index'`

---

## Task 14: Create src/landing/index.tsx

**Files:**
- Create: `src/landing/index.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { Search } from '@mui/icons-material';
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import logo from '../logo.svg';
import { videosAtom } from '../atoms';
import { useNavigate } from '../hooks/useNavigate';

export const LandingPage = () => {
  const videos = useAtomValue(videosAtom);
  const { navigateToVideo } = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = videos.filter(({ name, keywords }) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      name.toLowerCase().includes(q) ||
      (keywords ?? []).some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflowY: 'auto',
        pb: '80px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <img
          src={logo}
          alt="Ride & Listen logo"
          style={{ height: 80, marginBottom: 16 }}
        />
        <Typography variant="h3" fontWeight="bold">
          Ride & Listen
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, px: 2 }}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos..."
          sx={{ width: '100%', maxWidth: 600 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filtered.map(({ videoId, name }) => (
          <Box
            key={videoId}
            onClick={() => navigateToVideo(videoId)}
            sx={{
              m: 1.5,
              cursor: 'pointer',
              width: { xs: 'calc(100vw - 24px)', sm: 400 },
              '&:hover img': { opacity: 0.85, transition: 'opacity 0.2s' },
            }}
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={name}
              style={{
                width: '100%',
                aspectRatio: '4/3',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <Typography
              variant="body1"
              sx={{
                mt: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
```

- [ ] **Step 2: Run LandingPage tests to verify they pass**

```bash
yarn test --watchAll=false --testPathPattern="LandingPage"
```

Expected: PASS — 4 tests passing

---

## Task 15: Verify full build and commit

**Files:** all

- [ ] **Step 1: Update src/App.test.js to reflect the new App**

Replace `src/App.test.js` with a smoke test that matches the new landing page:

```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing page on load', () => {
  render(<App />);
  expect(screen.getByText('Ride & Listen')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the full test suite**

```bash
yarn test --watchAll=false
```

Expected: All tests pass. (Any pre-existing failures are outside scope.)

- [ ] **Step 3: Build the app**

```bash
yarn build
```

Expected: build completes with no TypeScript errors. Size warnings are acceptable.

- [ ] **Step 4: Start the dev server and manually verify**

```bash
yarn start
```

Open `http://localhost:3000` and check:

| Scenario | Expected |
|----------|----------|
| Initial load | Landing page: logo, title, search bar, video thumbnails |
| Click a thumbnail | Fullscreen player opens, URL becomes `?v={videoId}` |
| Back button (top-left) | Returns to landing page, URL becomes `/` |
| Load `http://localhost:3000?v=rFshlSZQ7cU` directly | Opens player for that video |
| Bottom bar on landing | No VideoSelector, no mute button; radio controls present |
| Bottom bar on player | VideoSelector and mute button visible |
| Type "N222" in search | Only N222 videos shown |
| Clear search | All videos return |
| Mobile viewport (375px width in DevTools) | Cards fill the screen width |
| Radio play → navigate to player → back | Radio keeps playing throughout |
| Dark mode toggle | Works on both landing and player views |

- [ ] **Step 5: Commit**

```bash
git add src/ && git commit -m "$(cat <<'EOF'
feat: add landing page, replace Recoil with Jotai

- Add scrollable landing page with video thumbnails, header, and search
- Replace discontinued Recoil with Jotai (atomWithStorage for persistence)
- currentViewAtom is single source of truth for active view + URL
- View transitions via pushState — radio and bottom bar never remount
- Bottom bar hides video controls when on landing page
- Back button overlay on player view

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```