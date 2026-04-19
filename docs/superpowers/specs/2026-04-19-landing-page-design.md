# Landing Page & Jotai Migration — Design Spec

**Date:** 2026-04-19  
**Status:** Approved

---

## Overview

Add a landing page that showcases all videos in a browsable, searchable grid. Clicking a video transitions to the fullscreen player without remounting the bottom bar or interrupting the radio. Migrate state management from the discontinued Recoil to Jotai.

---

## 1. Jotai Migration

### What changes
- Remove `recoil` package, add `jotai` and `jotai/utils`.
- Delete `RecoilRoot` from `App.tsx` — Jotai requires no Provider.
- Delete `src/localStorage.ts` — replaced by Jotai's `atomWithStorage`.
- Rewrite `src/atoms.ts` using Jotai primitives.
- Delete the `radioSelector` selector — it was a pass-through with no added value.
- Replace all Recoil hooks across components:
  - `useRecoilValue` → `useAtomValue`
  - `useSetRecoilState` → `useSetAtom`
  - `useRecoilState` → `useAtom`

### Atom mapping

| Old (Recoil)             | New (Jotai)                                      | Notes                             |
|--------------------------|--------------------------------------------------|-----------------------------------|
| `showBottomBarState`     | `atom(true)`                                     |                                   |
| `selectedVideoState`     | `atom(random VIDEOS entry)`                      |                                   |
| `videosState`            | `atom(VIDEOS)`                                   |                                   |
| `selectedRadioState`     | `atomWithStorage('RECENTLY_PLAYED', RADIOS[0])`  | replaces localStorageEffect       |
| `radiosState`            | `atom(RADIOS)`                                   |                                   |
| `radioVolumeState`       | `atomWithStorage('VOLUME', 50)`                  | replaces localStorageEffect       |
| `radioPlayState`         | `atom(false)`                                    |                                   |
| `videoMuteState`         | `atom(true)`                                     |                                   |
| `videoSpeedState`        | `atom<Speed>(1)`                                 |                                   |
| `currentViewAtom`        | `atom<'landing' \| string>('landing')`           | new — see Section 2               |

---

## 2. View State & Routing

### Atom
A new `currentViewAtom: atom<'landing' | string>` drives the active view. The string value is the `videoId` of the selected video; `'landing'` shows the landing page.

### URL sync
A `useNavigate` hook (internal helper, not react-router) wraps view transitions:
- **Navigate to video:** sets `currentViewAtom` to `videoId`, calls `window.history.pushState(null, '', '?v={videoId}')`.
- **Navigate to landing:** sets `currentViewAtom` to `'landing'`, calls `window.history.pushState(null, '', '/')`.

On initial app mount, `App.tsx` reads `new URLSearchParams(window.location.search).get('v')` and sets `currentViewAtom` accordingly — enabling direct video links.

### Bottom bar visibility
The bottom bar always renders. The `<VideoSelector>` inside `NavBar` is hidden (via conditional render) when `currentViewAtom === 'landing'`.

---

## 3. Data Model Update

`src/types.ts` — add optional `keywords` field to `Video`:

```ts
export type Video = {
  videoId: string;
  name: string;
  keywords?: string[];
};
```

Existing entries in `videos.ts` remain unchanged. The search logic checks both `name` and `keywords` in a single pass so adding tags to any video immediately makes them searchable.

---

## 4. Landing Page

**File:** `src/landing/index.tsx`

### Layout (top to bottom)
1. **Header** — centered, `logo.svg` + `"Ride & Listen"` in a large MUI `Typography` (`h3` variant). Generous vertical padding.
2. **Search bar** — MUI `TextField` with search adornment icon. Full-width on mobile, max-width 600px on desktop. Centered. Filters the grid as you type (no submit).
3. **Video grid** — flexbox wrap, `justify-content: center`. Each card has a 12px margin on all sides.

### Video card
- Clickable container (cursor pointer, subtle hover effect).
- Thumbnail: `<img src="https://img.youtube.com/vi/{videoId}/hqdefault.jpg" />` rendered at 400×300px, `object-fit: cover`. On screens narrower than ~440px the card scales to `calc(100vw - 24px)` wide with proportional height.
- Title: MUI `Typography` (`body1`), below the image, max-width matching the card, truncated with ellipsis on overflow.
- Click handler: calls `useNavigate` with the video's `videoId`.

### Scrollability
The landing page is a scrollable `<Box>` with `overflow-y: auto`, full viewport height, and `padding-bottom` equal to the MUI `AppBar` height (56px on mobile, 64px on desktop) so cards aren't hidden behind the fixed bottom bar.

---

## 5. Player View

When `currentViewAtom !== 'landing'`, `App.tsx` renders `<YoutubeWrapper />` filling the viewport. The landing page component is unmounted (it has no persistent state that needs preserving — search query is ephemeral).

### Back button
Floating MUI `IconButton` with `ArrowBack` icon, positioned `absolute`, top-left corner (16px from each edge), `z-index` above the player. Calls `useNavigate` back to `'landing'`.

### YouTube player
`selectedVideoState` is set to `currentViewAtom`'s value when navigating to a video, so the existing `<YoutubeWrapper />` plays the correct video with no changes to its internal logic.

---

## 6. Component File Map

```
src/
  atoms.ts              — rewritten with Jotai
  types.ts              — Video gains optional keywords field
  localStorage.ts       — deleted (replaced by atomWithStorage)
  App.tsx               — remove RecoilRoot, add view-switching logic, URL init
  landing/
    index.tsx           — LandingPage component
  navbar/
    index.tsx           — hide VideoSelector when on landing view
  video/
    index.tsx           — unchanged logic; receives videoId from atom
```

---

## 7. Dependencies

- Remove: `recoil`
- Add: `jotai` (stable, actively maintained, atom-based, near-identical API to Recoil)
- No other new dependencies.

---

## 8. Out of Scope

- Server-side rendering or SSG.
- Video keyword data population (type is ready, data entry is future work).
- Animations/transitions between landing and player views.
- Pagination or infinite scroll (all videos load at once — current count is ~15).
