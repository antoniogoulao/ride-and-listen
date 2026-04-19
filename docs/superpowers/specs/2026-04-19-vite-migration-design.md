# CRA → Vite Migration — Design Spec

**Date:** 2026-04-19  
**Status:** Approved

---

## Overview

Replace Create React App (`react-scripts`) with Vite and Vitest. Eliminates the Node 22 + OpenSSL 3 incompatibility, gives near-instant dev server startup, and puts the project on an actively maintained build toolchain. No changes to application source code or logic.

---

## 1. Package Changes

### Remove
- `react-scripts` — replaced by Vite
- `web-vitals` — CRA performance monitoring, not needed
- `@types/jest` — replaced by Vitest's built-in TypeScript types

### Add (devDependencies)
- `vite` — build tool and dev server
- `@vitejs/plugin-react` — React JSX transform + Fast Refresh
- `vitest` — test runner (Jest-compatible API)
- `jsdom` — browser-like environment for Vitest tests

### Keep unchanged
- All `@testing-library/*` packages — work identically with Vitest
- All application dependencies (MUI, Jotai, react-youtube, etc.)

---

## 2. New Config Files

### `vite.config.ts` (project root)

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

`globals: true` makes `describe`, `test`, `expect`, `vi`, `beforeEach`, etc. available without imports — matching how CRA's Jest was configured.

### `vitest.setup.ts` (project root)

```typescript
import '@testing-library/jest-dom';
```

Registers jest-dom matchers (`toBeInTheDocument`, `toHaveText`, etc.) for all test files.

### `index.html` (project root — moved from `public/index.html`)

Vite requires `index.html` at the project root. Changes from the CRA version:
- `%PUBLIC_URL%` replaced with empty string (`href="/favicon.ico"` etc.)
- Add before `</body>`: `<script type="module" src="/src/index.tsx"></script>`

The `public/` folder stays in place — Vite serves its contents as static assets at `/`.

### `src/vite-env.d.ts` (new)

```typescript
/// <reference types="vite/client" />
```

Provides TypeScript types for Vite-specific features (SVG imports, `import.meta.env`, etc.).

---

## 3. File Modifications

### `tsconfig.json`

| Setting | Before | After | Reason |
|---------|--------|-------|--------|
| `target` | `"es5"` | `"ES2020"` | Vite handles browser targets via `build.target`; ES2020 is correct for the TS compiler |
| `moduleResolution` | `"node"` | `"bundler"` | Correct resolution strategy for Vite/ESM bundlers |
| `types` | _(absent)_ | `["vitest/globals"]` | Tells TypeScript about `describe`, `test`, `vi`, etc. |

### `src/index.tsx`

Remove the `reportWebVitals` import and call. The rest of the file is unchanged.

Before:
```tsx
import reportWebVitals from "./reportWebVitals";
// ...
reportWebVitals();
```

After: those two lines deleted.

### Test files — `jest` → `vi`

Vitest exposes `vi` globally (not `jest`). Two test files need updates:

**`src/hooks/useNavigate.test.ts`:**
- `jest.spyOn` → `vi.spyOn`

**`src/landing/LandingPage.test.tsx`:**
- `jest.mock` → `vi.mock`

**`src/App.test.js`:** no changes needed.

---

## 4. Files to Delete

| File | Reason |
|------|--------|
| `src/react-app-env.d.ts` | Replaced by `src/vite-env.d.ts` |
| `src/reportWebVitals.js` | CRA performance monitoring, not applicable |
| `public/index.html` | Moved to project root as `index.html` |

---

## 5. Scripts & Deployment

### `package.json` scripts

| Script | Before | After |
|--------|--------|-------|
| `start` | `react-scripts start` | `vite` |
| `build` | `react-scripts build` | `vite build` |
| `test` | `react-scripts test` | `vitest run` |
| `eject` | `react-scripts eject` | _(removed)_ |
| `predeploy` | `npx browserslist@latest --update-db && rm -rf build && yarn build` | `rm -rf dist && vite build` |
| `deploy` | `gh-pages -d build` | `gh-pages -d dist` |

Vite outputs to `dist/` by default (CRA used `build/`). The deploy target is updated accordingly.

### `eslintConfig` in `package.json`

Remove the `"react-app"` and `"react-app/jest"` extends — they depend on `react-scripts`. ESLint continues to work without them.

### `browserslist` in `package.json`

Remove. Browser compatibility targets are handled by Vite's default `build.target: 'es2015'`, which covers all modern browsers and is equivalent to the old production list.

---

## 6. Out of Scope

- ESLint config update (the removal of `react-app` extends is sufficient; a full ESLint config overhaul is a separate task)
- Vitest coverage reporting setup
- Any changes to application logic or components