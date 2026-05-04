# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the landing page with MUI Card-based video cards (play overlay on hover, region badge), fix dark mode propagation to the landing page, and add a `region` field to the Video data model.

**Architecture:** Three focused changes — data model update (`types.ts` + `videos.ts`), new tests for the card UI (`LandingPage.test.tsx`), then the full landing page implementation (`landing/index.tsx`). TDD order: types → failing tests → implementation.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, MUI v5, Jotai

---

## File Map

| File | Change |
|------|--------|
| `src/types.ts` | Add required `region: string` to `Video` |
| `src/videos.ts` | Add `region` value to every entry |
| `src/landing/LandingPage.test.tsx` | Add tests for region badge and play overlay |
| `src/landing/index.tsx` | Dark mode fix + full card redesign |

---

### Task 1: Add `region` to Video type and all videos

**Files:**
- Modify: `src/types.ts`
- Modify: `src/videos.ts`

- [ ] **Step 1: Update Video type**

Replace the contents of `src/types.ts` with:

```ts
export type Video = {
  videoId: string;
  name: string;
  region: string;
  keywords?: string[];
};

export type Radio = {
  id: number;
  url: string;
  name: string;
};

export type Speed = 1 | 1.5 | 2;
```

- [ ] **Step 2: Add `region` to every video in `src/videos.ts`**

Replace the contents of `src/videos.ts` with:

```ts
import { Video } from './types';

export const VIDEOS: Video[] = [
  {
    name: 'Portagem (Marvão) -> Castelo de Vide, Alentejo',
    videoId: 'rFshlSZQ7cU',
    region: 'Alentejo',
  },
  {
    name: 'Glória -> Santarém, Ribatejo',
    videoId: 'wcFrsemxPu8',
    region: 'Ribatejo',
  },
  {
    name: 'Caldas da Rainha -> Ferraria de São João, Centro',
    videoId: 'HQpDZfXMIu4',
    region: 'Centro',
  },
  {
    name: 'Setúbal -> Arrábida -> Sesimbra, AML',
    videoId: 'B58KZ1koOOg',
    region: 'AML',
  },
  {
    name: "Serra D'Arga, Minho",
    videoId: 'p_TaRrCR1O0',
    region: 'Minho',
  },
  {
    name: 'Sierra de las Nieves, Espanha',
    videoId: '0rwRDGOXShM',
    region: 'Espanha',
  },
  {
    name: 'Subida da Serra de Montejunto, Estremadura',
    videoId: 'Czlcw_A3anQ',
    region: 'Estremadura',
  },
  {
    name: 'Passeio Festas da Glória 2023, Ribatejo',
    videoId: 'gGwBYDZUVqM',
    region: 'Ribatejo',
  },
  {
    name: 'N621 até Riaño, Espanha',
    videoId: 'RyqlEspPze8',
    region: 'Espanha',
  },
  {
    name: 'Passeio da Liberdade 2024, Ribatejo',
    videoId: 'WsZmnbmZmxw',
    region: 'Ribatejo',
  },
  {
    name: 'Muge -> Cartaxo -> Santarém, Ribatejo',
    videoId: '42Lu81wmQOY',
    region: 'Ribatejo',
  },
  {
    name: 'Fátima -> Alcanena, Ribatejo',
    videoId: 'C3019-dH1KA',
    region: 'Ribatejo',
  },
  {
    name: 'N222 - Parte 1, Norte',
    videoId: 'jeOMmeKCHPg',
    region: 'Norte',
  },
  {
    name: 'N222 - Parte 2, Norte',
    videoId: 'GpE0HKhnodw',
    region: 'Norte',
  },
  {
    name: 'N118 -> Salvaterra de Magos -> Santarém, Ribatejo',
    videoId: 'JHtkB4itAQ0',
    region: 'Ribatejo',
  },
];
```

- [ ] **Step 3: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no output (zero errors).

- [ ] **Step 4: Verify existing tests still pass**

```bash
yarn test
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/types.ts src/videos.ts
git commit -m "feat: add region field to Video type and all video entries"
```

---

### Task 2: Write failing tests for card redesign

**Files:**
- Modify: `src/landing/LandingPage.test.tsx`

- [ ] **Step 1: Add two new tests to `src/landing/LandingPage.test.tsx`**

Append inside the `describe('LandingPage')` block, after the last existing test:

```tsx
  test('renders a region badge for each distinct region', () => {
    renderWithTheme(<LandingPage />);
    expect(screen.getByText('Alentejo')).toBeInTheDocument();
    expect(screen.getAllByText('Ribatejo').length).toBeGreaterThan(0);
    expect(screen.getByText('Centro')).toBeInTheDocument();
    expect(screen.getByText('AML')).toBeInTheDocument();
    expect(screen.getByText('Minho')).toBeInTheDocument();
    expect(screen.getAllByText('Espanha').length).toBeGreaterThan(0);
    expect(screen.getByText('Estremadura')).toBeInTheDocument();
    expect(screen.getAllByText('Norte').length).toBeGreaterThan(0);
  });

  test('renders a play overlay element for every video card', () => {
    const { container } = renderWithTheme(<LandingPage />);
    const overlays = container.querySelectorAll('.play-overlay');
    expect(overlays.length).toBe(15);
  });
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
yarn test
```

Expected: 2 tests fail — `renders a region badge for each distinct region` and `renders a play overlay element for every video card`. All 4 existing tests still pass.

- [ ] **Step 3: Commit**

```bash
git add src/landing/LandingPage.test.tsx
git commit -m "test: add failing tests for region badges and play overlay"
```

---

### Task 3: Implement card redesign and dark mode fix

**Files:**
- Modify: `src/landing/index.tsx`

- [ ] **Step 1: Replace `src/landing/index.tsx` with the new implementation**

```tsx
import { PlayArrow, Search } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import {
  amber,
  green,
  indigo,
  lightBlue,
  orange,
  purple,
  red,
  teal,
} from '@mui/material/colors';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import logo from '../logo.svg';
import { videosAtom } from '../atoms';
import { useNavigate } from '../hooks/useNavigate';

const REGION_COLORS: Record<string, { bg: string; text: string }> = {
  Alentejo: { bg: orange[700], text: '#fff' },
  Ribatejo: { bg: green[700], text: '#fff' },
  Centro: { bg: purple[600], text: '#fff' },
  AML: { bg: lightBlue[700], text: '#fff' },
  Minho: { bg: teal[600], text: '#fff' },
  Espanha: { bg: red[700], text: '#fff' },
  Estremadura: { bg: amber[700], text: '#000' },
  Norte: { bg: indigo[600], text: '#fff' },
};

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
        bgcolor: 'background.default',
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
        {filtered.map(({ videoId, name, region }) => {
          const colors = REGION_COLORS[region] ?? { bg: '#888', text: '#fff' };
          return (
            <Card
              key={videoId}
              onClick={() => navigateToVideo(videoId)}
              sx={{
                m: 1.5,
                cursor: 'pointer',
                width: { xs: 'calc(100vw - 24px)', sm: 400 },
                position: 'relative',
                '&:hover .play-overlay': { opacity: 1 },
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  image={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={name}
                  sx={{ aspectRatio: '4/3', objectFit: 'cover' }}
                />
                <Box
                  className="play-overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0,0,0,0.4)',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <PlayArrow sx={{ fontSize: 64, color: '#fff' }} />
                </Box>
              </Box>
              <CardContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
              >
                <Chip
                  label={region}
                  size="small"
                  sx={{
                    alignSelf: 'flex-start',
                    bgcolor: colors.bg,
                    color: colors.text,
                    fontWeight: 600,
                  }}
                />
                <Typography variant="body1" noWrap>
                  {name}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
```

- [ ] **Step 2: Run all tests**

```bash
yarn test
```

Expected: all 6 tests pass (4 existing + 2 new).

- [ ] **Step 3: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add src/landing/index.tsx
git commit -m "feat: redesign landing page cards with region badges and play overlay"
```