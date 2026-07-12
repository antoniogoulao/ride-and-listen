<p align="center"><img src="https://raw.githubusercontent.com/antoniogoulao/ride-and-listen/main/assets/yamaha_logo.jpeg"/></p>

<a href="https://rideandlisten.antoniogoulao.dev/"><h1 align="center">Ride & Listen</h1></a>

Chill while you listen to local radios and watch me riding through Portugal and Spain. Inspired by [Drive and Listen](https://driveandlisten.herokuapp.com).

**Live at [rideandlisten.antoniogoulao.dev](https://rideandlisten.antoniogoulao.dev/)**

## Features

- Real motorcycle rides through Portuguese and Spanish back roads, filterable by region
- Portuguese radio stations streaming alongside the video (video sound and radio are mutually exclusive)
- Available in 6 languages (pt-PT, pt-BR, es-ES, fr-FR, en-GB, en-US), auto-detected from your browser
- No backend, no tracking — your radio and volume preferences live in localStorage

## Tech

React 18 · TypeScript · Vite · Vitest · MUI v5 · Jotai · react-i18next · react-youtube

The video and radio catalogues are static arrays in `src/videos.ts` and `src/radios.ts` — adding content is appending to those files.

## Development

```bash
yarn          # install
yarn start    # dev server at http://localhost:5173
yarn test     # run the test suite
yarn build    # production build → dist/
yarn deploy   # build + publish to GitHub Pages
```

## Trivia

### How did I get the radio URLs?

By looking at the source code of [radiowebsites.org](https://radiowebsites.org/), which lists radios from around the world and calls an API exposing each station's stream URL.

### How did I disable YouTube's play/pause on click?

One line of CSS on the iframe player:

```css
.youtube-player {
  pointer-events: none;
}
```
