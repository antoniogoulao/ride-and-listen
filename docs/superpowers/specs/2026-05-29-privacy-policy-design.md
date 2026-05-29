# Privacy Policy Page — Design Spec

**Date:** 2026-05-29  
**Status:** Approved

## Overview

Add a Privacy Policy page as a new route in the existing custom routing system. The page is in English, accessible via `?page=privacy`, and includes a "Clear local data" button that wipes the two localStorage keys the app writes.

---

## Routing

- `currentViewAtom` gains `'privacy'` as a third recognised special string (alongside `'landing'`).
- `syncFromUrl` in `App.tsx` checks query params in this order:
  1. If `?page=privacy` → set view to `'privacy'`
  2. Else if `?v=<id>` → set view to the video ID
  3. Else → set view to `'landing'`
- `App.tsx` render switch gains a third branch: `currentView === 'privacy'` renders `<PrivacyPolicy />`.
- The existing back-arrow overlay (shown only when `currentView !== 'landing'`) must be updated to also exclude `'privacy'`; the Privacy Policy page provides its own navigation back to landing.
- `useNavigate.ts` gains a `navigateToPrivacy()` helper that pushes `?page=privacy` and sets `currentViewAtom` to `'privacy'`.

---

## `PrivacyPolicy` Component (`src/privacy/index.tsx`)

Centred, full-viewport layout using MUI `Box`. Theme-aware (`bgcolor: 'background.default'`).

### Structure (top to bottom)

1. **Back button** — top-left `IconButton` with `ArrowBack`, calls `navigateToLanding()`.
2. **Shield icon** — `VerifiedUser` MUI icon centred in a circular grey `Box`, positioned below the back button with some vertical spacing.
3. **Title** — MUI `Typography` variant `h4`, bold, centred: `"Privacy Policy"`.
4. **Content card** — MUI `Card` with `variant="outlined"`, max-width ~600px, centred horizontally, containing three `Typography` paragraphs:
   - *"This site does not collect, store, or share any personal data. No cookies or tracking technologies are used."*
   - *"Your last played radio station and volume preference are saved in your browser's localStorage to remember your settings between visits. This data never leaves your device."*
   - *"Video playback uses YouTube embeds, which are subject to [YouTube's Privacy Policy](https://policies.google.com/privacy)."*
5. **Clear local data button** — MUI `Button` colour `error`, variant `contained`, with a `Delete` icon. On click: removes only the two app localStorage keys (`localStorage.removeItem('RECENTLY_PLAYED')` and `localStorage.removeItem('VOLUME')`) then resets the atoms to their defaults using Jotai's `useSetAtom`.

### Default values for reset
- `selectedRadioAtom` default: `RADIOS[0]` (first radio in the list)
- `radioVolumeAtom` default: `50`

---

## Landing Page Footer

A small `Box` appended inside the existing scrollable container in `src/landing/index.tsx`, below the video grid and above the `pb: '80px'` navbar padding. Contains a centred MUI `Link` (or `Button` variant `text`) labelled `"Privacy Policy"` that calls `navigateToPrivacy()`.

---

## Out of Scope

- i18n / multi-language support
- Analytics disclosure (no analytics in this project)
- Any backend or server-side logic