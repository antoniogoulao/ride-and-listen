# ride-and-listen — Claude Code Master Context

## 1. Project & Mission
- **Domain:** Personal side project — motorcycle ride videos through Portugal with local radio streams playing alongside, inspired by [Drive and Listen](https://driveandlisten.herokuapp.com).
- **Deployed at:** https://rideandlisten.antoniogoulao.dev/ (GitHub Pages)
- **Tech Stack:**
  - **Frontend:** React 18, TypeScript (strict)
  - **Build/Test:** Vite 8, Vitest 4
  - **UI:** MUI v5 (Material UI) with Emotion
  - **State:** Jotai (atoms in `src/atoms.ts`; `atomWithStorage` for persistence)
  - **Players:** `react-youtube` (YouTube IFrame API), `react-audio-player` (radio streams)
  - **Deployment:** `gh-pages` — `yarn deploy` builds and pushes to GitHub Pages

## 2. Commands
```bash
yarn start      # dev server (Vite, localhost:5173)
yarn build      # production build → dist/
yarn test       # Vitest run (single pass)
yarn deploy     # build + push to gh-pages
```
Never claim a task is done without running `yarn test` and confirming it passes. For type-level changes also run `npx tsc --noEmit`.

## 3. Architecture & Conventions

### Routing
Custom URL-based routing — no React Router. The active view is stored in `currentViewAtom`:
- `'landing'` → show `<LandingPage />`
- any other string → treat as a YouTube `videoId`, show `<YoutubeWrapper />`

URL is kept in sync via `?v=<videoId>` query param and `popstate` events (see `App.tsx` `useEffect` + `useNavigate` hook).

### State (Jotai)
All global atoms live in `src/atoms.ts`. Persistent atoms use `atomWithStorage` (backed by `localStorage`):
- `selectedRadioAtom` — last played radio (`RECENTLY_PLAYED` key)
- `radioVolumeAtom` — volume level (`VOLUME` key)

### Data
- `src/videos.ts` — static array of `Video` objects (videoId + name + optional keywords)
- `src/radios.ts` — static array of `Radio` objects (id + name + stream URL)
- Adding content = appending to these files. No backend, no API.

### Module Map
```
src/
  App.tsx          # root: theme, color mode context, view routing
  atoms.ts         # all Jotai atoms
  types.ts         # Video, Radio, Speed types
  videos.ts        # video catalogue
  radios.ts        # radio catalogue
  hooks/
    useNavigate.ts # navigateToVideo / navigateToLanding helpers
  landing/         # LandingPage — grid of thumbnails with search
  video/           # YoutubeWrapper — full-screen YouTube IFrame player
  radio/           # RadioWrapper — hidden audio element for radio stream
  navbar/          # NavBar — bottom AppBar with controls (play, volume, selectors, dark mode)
    components/
      About.tsx
      RadioSelector.tsx
      VideoSelector.tsx
      Volume.tsx
```

### Key Invariants
- Video sound and radio are mutually exclusive: enabling one mutes/pauses the other (enforced in `NavBar`).
- YouTube player is always fullscreen; `pointer-events: none` on the iframe prevents default play/pause click.
- The navbar hides itself (`showBottomBarAtom`) and shows a floating button to restore it.

## 4. Memory & Continuity
- **Memory:** `~/.claude/projects/.../memory/` — user, feedback, project, reference files indexed by `MEMORY.md`.
- **Specs:** `docs/superpowers/specs/` (gitignored — local only)
- **Retros:** `docs/superpowers/retros/YYYY-MM-DD-[topic].md` after non-trivial sessions.