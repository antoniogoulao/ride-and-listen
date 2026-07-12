# Privacy Policy Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Privacy Policy page accessible via `?page=privacy`, with policy content and a button to clear the two localStorage keys the app writes.

**Architecture:** Extends the existing custom routing by treating `'privacy'` as a third special string in `currentViewAtom` (alongside `'landing'`). `syncFromUrl` in `App.tsx` checks `?page=privacy` before `?v=`. A new `PrivacyPolicy` component provides the page. A footer link on `LandingPage` provides navigation to it.

**Tech Stack:** React 18, TypeScript, MUI v5, Jotai, Vitest + @testing-library/react

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/hooks/useNavigate.ts` | Add `navigateToPrivacy()` helper |
| Modify | `src/hooks/useNavigate.test.ts` | Test `navigateToPrivacy` |
| Create | `src/privacy/index.tsx` | PrivacyPolicy page component |
| Create | `src/privacy/PrivacyPolicy.test.tsx` | Tests for PrivacyPolicy |
| Modify | `src/App.tsx` | Wire `?page=privacy` route and render branch |
| Modify | `src/landing/index.tsx` | Add footer with Privacy Policy link |
| Modify | `src/landing/LandingPage.test.tsx` | Test footer renders |

---

### Task 1: Add `navigateToPrivacy` to `useNavigate`

**Files:**
- Modify: `src/hooks/useNavigate.ts`
- Modify: `src/hooks/useNavigate.test.ts`

- [ ] **Step 1: Write the failing test**

Add inside the `describe('useNavigate', ...)` block in `src/hooks/useNavigate.test.ts`:

```ts
test('navigateToPrivacy sets currentViewAtom to privacy and pushes URL', () => {
  const { result } = renderHook(() => useNavigate());

  act(() => {
    result.current.navigateToPrivacy();
  });

  expect(getDefaultStore().get(currentViewAtom)).toBe('privacy');
  expect(pushStateSpy).toHaveBeenCalledWith(null, '', '?page=privacy');
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn test
```

Expected: FAIL — `result.current.navigateToPrivacy is not a function`

- [ ] **Step 3: Implement `navigateToPrivacy`**

Replace the full content of `src/hooks/useNavigate.ts`:

```ts
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

  const navigateToPrivacy = useCallback(() => {
    setCurrentView('privacy');
    window.history.pushState(null, '', '?page=privacy');
  }, [setCurrentView]);

  return { navigateToVideo, navigateToLanding, navigateToPrivacy };
};
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
yarn test
```

Expected: all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useNavigate.ts src/hooks/useNavigate.test.ts
git commit -m "feat: add navigateToPrivacy to useNavigate"
```

---

### Task 2: Create `PrivacyPolicy` component

**Files:**
- Create: `src/privacy/index.tsx`
- Create: `src/privacy/PrivacyPolicy.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/privacy/PrivacyPolicy.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { PrivacyPolicy } from './index';

const navigateToLandingMock = vi.fn();

vi.mock('../hooks/useNavigate', () => ({
  useNavigate: () => ({
    navigateToLanding: navigateToLandingMock,
  }),
}));

const theme = createTheme();
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('PrivacyPolicy', () => {
  beforeEach(() => {
    navigateToLandingMock.mockClear();
  });

  test('renders the page title', () => {
    renderWithTheme(<PrivacyPolicy />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  test('renders the no personal data paragraph', () => {
    renderWithTheme(<PrivacyPolicy />);
    expect(
      screen.getByText(/does not collect, store, or share any personal data/)
    ).toBeInTheDocument();
  });

  test('renders the localStorage paragraph', () => {
    renderWithTheme(<PrivacyPolicy />);
    expect(
      screen.getByText(/localStorage to remember your settings/)
    ).toBeInTheDocument();
  });

  test('renders a link to YouTube privacy policy', () => {
    renderWithTheme(<PrivacyPolicy />);
    const link = screen.getByRole('link', { name: /youtube's privacy policy/i });
    expect(link).toHaveAttribute('href', 'https://policies.google.com/privacy');
  });

  test('back button calls navigateToLanding', () => {
    renderWithTheme(<PrivacyPolicy />);
    fireEvent.click(screen.getByLabelText('back to landing page'));
    expect(navigateToLandingMock).toHaveBeenCalledTimes(1);
  });

  test('clear local data button removes RECENTLY_PLAYED and VOLUME from localStorage', () => {
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');
    localStorage.setItem('RECENTLY_PLAYED', '{}');
    localStorage.setItem('VOLUME', '80');

    renderWithTheme(<PrivacyPolicy />);
    fireEvent.click(screen.getByRole('button', { name: /clear local data/i }));

    expect(removeItemSpy).toHaveBeenCalledWith('RECENTLY_PLAYED');
    expect(removeItemSpy).toHaveBeenCalledWith('VOLUME');
    removeItemSpy.mockRestore();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
yarn test
```

Expected: FAIL — `Cannot find module './index'`

- [ ] **Step 3: Implement the component**

Create `src/privacy/index.tsx`:

```tsx
import { ArrowBack, Delete, VerifiedUser } from '@mui/icons-material';
import { Box, Button, Card, IconButton, Link, Typography } from '@mui/material';
import { useSetAtom } from 'jotai';
import { radioVolumeAtom, selectedRadioAtom } from '../atoms';
import { useNavigate } from '../hooks/useNavigate';
import { RADIOS } from '../radios';

export const PrivacyPolicy = () => {
  const { navigateToLanding } = useNavigate();
  const setSelectedRadio = useSetAtom(selectedRadioAtom);
  const setVolume = useSetAtom(radioVolumeAtom);

  const handleClearData = () => {
    localStorage.removeItem('RECENTLY_PLAYED');
    localStorage.removeItem('VOLUME');
    setSelectedRadio(RADIOS[0]);
    setVolume(50);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        <IconButton onClick={navigateToLanding} aria-label="back to landing page">
          <ArrowBack />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 8,
          px: 2,
        }}
      >
        <Box sx={{ bgcolor: 'grey.200', borderRadius: '50%', p: 2, mb: 2 }}>
          <VerifiedUser sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Privacy Policy
        </Typography>
        <Card variant="outlined" sx={{ maxWidth: 600, width: '100%', p: 3, mb: 3 }}>
          <Typography paragraph>
            This site does not collect, store, or share any personal data. No cookies or
            tracking technologies are used.
          </Typography>
          <Typography paragraph>
            Your last played radio station and volume preference are saved in your
            browser's localStorage to remember your settings between visits. This data
            never leaves your device.
          </Typography>
          <Typography>
            Video playback uses YouTube embeds, which are subject to{' '}
            <Link
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener"
            >
              YouTube's Privacy Policy
            </Link>
            .
          </Typography>
        </Card>
        <Button variant="contained" color="error" startIcon={<Delete />} onClick={handleClearData}>
          Clear local data
        </Button>
      </Box>
    </Box>
  );
};
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
yarn test
```

Expected: all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/privacy/index.tsx src/privacy/PrivacyPolicy.test.tsx
git commit -m "feat: add PrivacyPolicy component"
```

---

### Task 3: Wire `?page=privacy` route in `App.tsx`

No existing App tests. Modify routing logic and render switch directly.

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update `syncFromUrl` to handle `?page=privacy`**

Replace the `syncFromUrl` arrow function inside the `useEffect` (currently reads `const videoId = new URLSearchParams(window.location.search).get('v'); setCurrentView(videoId ?? 'landing');`):

```ts
const syncFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('page') === 'privacy') {
    setCurrentView('privacy');
  } else {
    setCurrentView(params.get('v') ?? 'landing');
  }
};
```

- [ ] **Step 2: Add `PrivacyPolicy` import**

Add to the import block at the top of `src/App.tsx`:

```ts
import { PrivacyPolicy } from './privacy';
```

- [ ] **Step 3: Update the render switch and back-arrow condition**

Replace the existing render block (the `{currentView === 'landing' ? <LandingPage /> : <YoutubeWrapper />}` expression and the back-arrow `Box` that follows) with:

```tsx
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
```

- [ ] **Step 4: Run type check and tests**

```bash
npx tsc --noEmit && yarn test
```

Expected: no type errors, all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire privacy route in App"
```

---

### Task 4: Add Privacy Policy footer to `LandingPage`

**Files:**
- Modify: `src/landing/index.tsx`
- Modify: `src/landing/LandingPage.test.tsx`

- [ ] **Step 1: Update the `useNavigate` mock in `LandingPage.test.tsx`**

Replace line 6–8 (the existing `vi.mock` call):

```tsx
vi.mock('../hooks/useNavigate', () => ({
  useNavigate: () => ({ navigateToVideo: vi.fn(), navigateToPrivacy: vi.fn() }),
}));
```

- [ ] **Step 2: Write the failing footer test**

Add inside the `describe('LandingPage', ...)` block:

```tsx
test('renders a Privacy Policy button in the footer', () => {
  renderWithTheme(<LandingPage />);
  expect(
    screen.getByRole('button', { name: /privacy policy/i })
  ).toBeInTheDocument();
});
```

- [ ] **Step 3: Run to verify it fails**

```bash
yarn test
```

Expected: FAIL — button not found

- [ ] **Step 4: Add footer to `LandingPage`**

In `src/landing/index.tsx`:

1. Add `Button` to the MUI import block:

```tsx
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
```

2. Destructure `navigateToPrivacy` from `useNavigate`:

```tsx
const { navigateToVideo, navigateToPrivacy } = useNavigate();
```

3. Append the footer `Box` after the video grid `Box` (the `<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>` block) and before the closing `</Box>` of the scrollable container:

```tsx
<Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
  <Button variant="text" onClick={navigateToPrivacy}>
    Privacy Policy
  </Button>
</Box>
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
yarn test
```

Expected: all tests PASS

- [ ] **Step 6: Run type check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 7: Commit**

```bash
git add src/landing/index.tsx src/landing/LandingPage.test.tsx
git commit -m "feat: add privacy policy footer to landing page"
```