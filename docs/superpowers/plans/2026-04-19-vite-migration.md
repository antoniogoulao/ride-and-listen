# Vite Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Create React App (`react-scripts`) with Vite and Vitest, eliminating the Node 22 + OpenSSL 3 incompatibility and moving to an actively maintained build toolchain.

**Architecture:** Swap the build tool (react-scripts → vite), test runner (jest via react-scripts → vitest), and update the handful of CRA-specific files (index.html location, env type reference, reportWebVitals). Application source code and logic are untouched except for two test files that use `jest.*` instead of `vi.*`.

**Tech Stack:** Vite 6, @vitejs/plugin-react, Vitest, jsdom, React 18, TypeScript, GitHub Pages via gh-pages

---

## File Map

| Action | Path | Change |
|--------|------|--------|
| Create | `vite.config.ts` | Vite + Vitest config |
| Create | `vitest.setup.ts` | jest-dom matcher registration |
| Create | `index.html` | Moved from `public/index.html`, updated for Vite |
| Create | `src/vite-env.d.ts` | Vite client types |
| Delete | `public/index.html` | Moved to project root |
| Delete | `src/react-app-env.d.ts` | Replaced by `src/vite-env.d.ts` |
| Delete | `src/reportWebVitals.js` | CRA-only, not applicable to Vite |
| Modify | `src/index.tsx` | Remove reportWebVitals import and call |
| Modify | `tsconfig.json` | target, moduleResolution, add vitest/globals types |
| Modify | `package.json` | Scripts, remove eslintConfig + browserslist, swap deps |
| Modify | `src/hooks/useNavigate.test.ts` | `jest.*` → `vi.*` |
| Modify | `src/landing/LandingPage.test.tsx` | `jest.*` → `vi.*` |

---

## Task 1: Remove CRA packages, install Vite + Vitest

**Files:**
- Modify: `package.json` (via yarn)

- [ ] **Step 1: Remove CRA-specific packages**

```bash
cd /Users/antoniogoulao/git/ride-and-listen
yarn remove react-scripts web-vitals @types/jest
```

Expected: exits cleanly; none of the three appear in `package.json` afterwards.

- [ ] **Step 2: Install Vite, plugin-react, Vitest, and jsdom**

```bash
yarn add -D vite @vitejs/plugin-react vitest jsdom
```

Expected: all four appear in `devDependencies` in `package.json`.

- [ ] **Step 3: Verify**

```bash
ls node_modules/vite && ls node_modules/vitest
```

Expected: both directories exist.

---

## Task 2: Create vite.config.ts

**Files:**
- Create: `vite.config.ts`

- [ ] **Step 1: Create the file**

Create `/Users/antoniogoulao/git/ride-and-listen/vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
```

`globals: true` makes `describe`, `test`, `expect`, `vi`, `beforeEach` etc. available without imports — matching the existing test files.

---

## Task 3: Create vitest.setup.ts

**Files:**
- Create: `vitest.setup.ts`

- [ ] **Step 1: Create the file**

Create `/Users/antoniogoulao/git/ride-and-listen/vitest.setup.ts`:

```typescript
import '@testing-library/jest-dom';
```

This registers all jest-dom matchers (`toBeInTheDocument`, `toHaveText`, etc.) for every test file.

---

## Task 4: Create root index.html, delete public/index.html

**Files:**
- Create: `index.html` (project root)
- Delete: `public/index.html`

Vite requires `index.html` at the project root, not in `public/`. The `public/` folder itself stays — Vite serves its contents as static assets at `/`.

- [ ] **Step 1: Create `/Users/antoniogoulao/git/ride-and-listen/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="Description"
      content="Ride & Listen - Chill while you listen to some local radios and watch me riding through Portugal"
    />
    <!-- Twitter metadata -->
		<meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Ride & Listen" />
    <meta name="twitter:description" content="Chill while you listen to some local radios and watch me riding through Portugal" />
    <meta name="twitter:image" content="https://raw.githubusercontent.com/antoniogoulao/ride-and-listen/main/assets/banner.png" />

    <!-- Open Graph metadata-->
    <meta property="og:url" content="https://rideandlisten.antoniogoulao.dev"/>
    <meta property="og:title" content="Ride & Listen" />
    <meta property="og:description" content="Chill while you listen to some local radios and watch me riding through Portugal" />
    <meta property="og:image" content="https://raw.githubusercontent.com/antoniogoulao/ride-and-listen/main/assets/banner.png" />

    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>Ride & Listen</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

Changes from `public/index.html`:
- All `%PUBLIC_URL%/` prefixes removed (e.g. `href="%PUBLIC_URL%/favicon.ico"` → `href="/favicon.ico"`)
- HTML comments removed (CRA boilerplate)
- `<script type="module" src="/src/index.tsx"></script>` added before `</body>`

- [ ] **Step 2: Delete `public/index.html`**

```bash
rm /Users/antoniogoulao/git/ride-and-listen/public/index.html
```

- [ ] **Step 3: Verify**

```bash
ls /Users/antoniogoulao/git/ride-and-listen/index.html && ls /Users/antoniogoulao/git/ride-and-listen/public/
```

Expected: `index.html` exists at project root; `public/` still exists but no longer contains `index.html`.

---

## Task 5: Replace src/react-app-env.d.ts with src/vite-env.d.ts

**Files:**
- Create: `src/vite-env.d.ts`
- Delete: `src/react-app-env.d.ts`

- [ ] **Step 1: Create `src/vite-env.d.ts`**

Create `/Users/antoniogoulao/git/ride-and-listen/src/vite-env.d.ts`:

```typescript
/// <reference types="vite/client" />
```

Provides TypeScript types for Vite-specific features: SVG URL imports, `import.meta.env`, etc.

- [ ] **Step 2: Delete `src/react-app-env.d.ts`**

```bash
rm /Users/antoniogoulao/git/ride-and-listen/src/react-app-env.d.ts
```

---

## Task 6: Update src/index.tsx, delete src/reportWebVitals.js

**Files:**
- Modify: `src/index.tsx`
- Delete: `src/reportWebVitals.js`

- [ ] **Step 1: Replace `src/index.tsx`**

```tsx
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
```

- [ ] **Step 2: Delete `src/reportWebVitals.js`**

```bash
rm /Users/antoniogoulao/git/ride-and-listen/src/reportWebVitals.js
```

- [ ] **Step 3: Verify no remaining references**

```bash
grep -r "reportWebVitals" /Users/antoniogoulao/git/ride-and-listen/src/
```

Expected: no output.

---

## Task 7: Update tsconfig.json

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Replace the file**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vitest/globals"]
  },
  "include": [
    "src"
  ]
}
```

Changes from before:
- `target`: `"es5"` → `"ES2020"` (Vite handles browser compat via `build.target`)
- `moduleResolution`: `"node"` → `"bundler"` (correct for Vite/ESM)
- `types`: added `["vitest/globals"]` (TypeScript knows about `describe`, `test`, `vi`, etc.)

---

## Task 8: Update package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update scripts**

Replace the `"scripts"` section with:

```json
"scripts": {
  "start": "vite",
  "build": "vite build",
  "test": "vitest run",
  "predeploy": "rm -rf dist && vite build",
  "deploy": "gh-pages -d dist"
}
```

- [ ] **Step 2: Remove `eslintConfig` section**

Delete this entire block from `package.json`:

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
},
```

`react-app` ESLint config is part of `react-scripts` and no longer available.

- [ ] **Step 3: Remove `browserslist` section**

Delete this entire block from `package.json`:

```json
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
},
```

Vite uses its own default `build.target: 'es2015'` which covers all modern browsers.

- [ ] **Step 4: Verify package.json is valid JSON**

```bash
node -e "require('./package.json'); console.log('valid')"
```

Expected: `valid`

---

## Task 9: Update test files — jest → vi

**Files:**
- Modify: `src/hooks/useNavigate.test.ts`
- Modify: `src/landing/LandingPage.test.tsx`

With `globals: true` in `vite.config.ts`, Vitest exposes `vi` globally (not `jest`). Two files need updating.

- [ ] **Step 1: Replace `src/hooks/useNavigate.test.ts`**

```typescript
import { renderHook, act } from '@testing-library/react';
import { getDefaultStore } from 'jotai';
import { currentViewAtom } from '../atoms';
import { useNavigate } from './useNavigate';

const pushStateSpy = vi
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

Only change: `jest.spyOn` → `vi.spyOn` on line 6.

- [ ] **Step 2: Replace `src/landing/LandingPage.test.tsx`**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { LandingPage } from './index';

vi.mock('../hooks/useNavigate', () => ({
  useNavigate: () => ({ navigateToVideo: vi.fn() }),
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

Changes: `jest.mock` → `vi.mock`, `jest.fn()` → `vi.fn()` (lines 5–7).

---

## Task 10: Verify everything works and commit

**Files:** all

- [ ] **Step 1: Run tests**

```bash
cd /Users/antoniogoulao/git/ride-and-listen && yarn test
```

Expected: 3 test suites, 7 tests, all passing. Output resembles:

```
 ✓ src/App.test.js (1)
 ✓ src/hooks/useNavigate.test.ts (2)
 ✓ src/landing/LandingPage.test.tsx (4)

 Test Files  3 passed (3)
      Tests  7 passed (7)
```

If any test fails, diagnose before proceeding.

- [ ] **Step 2: Run production build**

```bash
yarn build
```

Expected: exits cleanly, `dist/` directory created with `index.html`, JS bundles, and assets. No TypeScript errors. No `NODE_OPTIONS` workaround needed.

- [ ] **Step 3: Start the dev server and smoke-test manually**

```bash
yarn start
```

Open `http://localhost:5173` (Vite's default port, not 3000) and verify:

| Check | Expected |
|-------|----------|
| Landing page loads | Logo, title, search bar, video grid visible |
| Click a video thumbnail | Player opens, URL changes to `?v={videoId}` |
| Back button | Returns to landing page |
| Dark mode toggle | Works |
| Radio selector | Plays audio |

Press `Ctrl+C` to stop the dev server when done.

- [ ] **Step 4: Commit**

```bash
cd /Users/antoniogoulao/git/ride-and-listen
git add -A && git commit -m "$(cat <<'EOF'
chore: migrate from CRA to Vite + Vitest

- Replace react-scripts with Vite (no more NODE_OPTIONS workaround)
- Replace Jest (via react-scripts) with Vitest
- Move index.html to project root, update for Vite
- Replace react-app-env.d.ts with vite-env.d.ts
- Remove reportWebVitals (CRA-only)
- Update tsconfig: ES2020 target, bundler moduleResolution
- Update deploy script: gh-pages -d dist (was build)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```