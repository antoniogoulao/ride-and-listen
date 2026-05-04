# Landing Page Redesign — Design Spec
_2026-05-04_

## Goal
Redesign the landing page to match the visual quality of the Lydia Hallie portfolio site: rich card grid with play-on-hover overlays and region badges, while keeping the existing yellow/lightBlue MUI colour scheme and making the page fully react to the dark/light mode toggle.

---

## 1. Data Layer

### `src/types.ts`
Add a required `region` field to the `Video` type:
```ts
export type Video = {
  videoId: string;
  name: string;
  region: string;
  keywords?: string[];
};
```

### `src/videos.ts`
Add `region` to every video entry:

| videoId | region |
|---------|--------|
| rFshlSZQ7cU | Alentejo |
| wcFrsemxPu8 | Ribatejo |
| HQpDZfXMIu4 | Centro |
| B58KZ1koOOg | AML |
| p_TaRrCR1O0 | Minho |
| 0rwRDGOXShM | Espanha |
| Czlcw_A3anQ | Estremadura |
| gGwBYDZUVqM | Ribatejo |
| RyqlEspPze8 | Espanha |
| WsZmnbmZmxw | Ribatejo |
| 42Lu81wmQOY | Ribatejo |
| C3019-dH1KA | Ribatejo |
| jeOMmeKCHPg | Norte |
| GpE0HKhnodw | Norte |
| JHtkB4itAQ0 | Ribatejo |

---

## 2. Dark Mode — Landing Page

**Problem:** The landing page `Box` has no `bgcolor`, so it uses the browser default (white) regardless of the MUI theme mode.

**Fix:** Add `bgcolor: 'background.default'` to the outermost `Box` in `LandingPage`. All child MUI components (`Typography`, `TextField`, `Card`) already inherit theme colours via `ThemeProvider` — no further changes needed.

---

## 3. Card Redesign

### Card structure (per video)
```
┌─────────────────────────────┐
│  [YouTube thumbnail 4:3]    │  ← CardMedia
│  [Play overlay on hover]    │  ← absolute Box, opacity 0→1
├─────────────────────────────┤
│  [Region Chip]  Title text  │  ← CardContent
└─────────────────────────────┘
```

### Card component details
- **Container:** MUI `Card` with `position: 'relative'`, `cursor: 'pointer'`, `width: { xs: 'calc(100vw - 24px)', sm: 400 }`, `m: 1.5`
- **Hover effect on play overlay:** defined on Card via `sx`: `'&:hover .play-overlay': { opacity: 1 }`
- **`CardMedia`:** `component="img"`, `src=https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, `sx={{ aspectRatio: '4/3', objectFit: 'cover' }}`
- **Play overlay:** absolute `Box` covering the media area, dark semi-transparent background (`rgba(0,0,0,0.4)`), centred `PlayArrow` icon in white, `className="play-overlay"`, `opacity: 0`, `transition: 'opacity 0.2s'`
- **`CardContent`:** `sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}`
  - MUI `Chip` — `size="small"`, `label={region}`, `sx` with background/text colour from `REGION_COLORS` map
  - `Typography` — `variant="body1"`, `noWrap`, `textOverflow: 'ellipsis'`, video title

### Region colour map (`REGION_COLORS`)
Colours chosen from MUI palette to complement the existing yellow[700] / lightBlue[900] scheme:

| Region | Background | Text |
|--------|-----------|------|
| Alentejo | `orange[700]` | `#fff` |
| Ribatejo | `green[700]` | `#fff` |
| Centro | `purple[600]` | `#fff` |
| AML | `lightBlue[700]` | `#fff` |
| Minho | `teal[600]` | `#fff` |
| Espanha | `red[700]` | `#fff` |
| Estremadura | `amber[700]` | `#000` |
| Norte | `indigo[600]` | `#fff` |

### Files changed
- `src/types.ts` — add `region` field
- `src/videos.ts` — add `region` to every entry
- `src/landing/index.tsx` — dark mode fix + full card redesign

No new files. No changes to `atoms.ts`, `App.tsx`, `NavBar`, or any other module.

---

## 4. Out of Scope
- Video player screen changes
- Search behaviour changes
- Any changes to radio, navbar, or routing logic