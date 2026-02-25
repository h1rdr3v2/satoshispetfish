# 🐠₿ Satoshi's Pet Fish

An interactive crypto aquarium built with Next.js. Feed your fish, watch them mine satoshis, buy rarer breeds, and vibe to the deep-sea crypto aesthetic.

---

## What is this?

Satoshi's Pet Fish is a browser-based idle clicker / aquarium game where:

- **Fish swim freely** around a fully animated deep-ocean tank
- **Click anywhere** to drop food — nearby fish rush toward it
- **Every click earns satoshis**, with a combo multiplier the faster you click
- **Fish passively mine sats** over time based on their hash rate and happiness
- **Treasure items** on the ocean floor give bonus sat drops
- **The Fish Shop** lets you spend your sats on rarer, more powerful fish
- A **fake BTC price ticker** updates in the HUD for the vibes

---

## Features

| Feature         | Details                                                            |
| --------------- | ------------------------------------------------------------------ |
| Animated fish   | Smooth swimming, tail wag, fin wave, eye blink, directional facing |
| Click-to-feed   | Drop food particles on click, attracts nearest fish                |
| Combo system    | Rapid clicks multiply your sat earnings (up to 10x)                |
| Passive mining  | Each fish mines at its own rate × happiness %                      |
| Fish Shop       | 6 fish tiers from Guppy (50 sats) to Whale (1000 sats)             |
| Treasure chests | Clickable floor items that drop bonus sats                         |
| Hover tooltips  | See each fish's name, species, sats mined, and happiness           |
| Ambient FX      | Bubbles, swaying seaweed, coral, light rays, sand bottom           |
| BTC price mock  | Live-ish ticker with randomised price drift                        |

---

## Fish Roster

| Fish       | Cost      | Mining Rate |
| ---------- | --------- | ----------- |
| Guppy      | 50 sats   | 0.5/s       |
| Clownfish  | 150 sats  | 1.0/s       |
| Angelfish  | 300 sats  | 1.5/s       |
| Neon Tetra | 100 sats  | 0.8/s       |
| Golden Koi | 500 sats  | 2.5/s       |
| Whale      | 1000 sats | 5.0/s       |

---

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- Pure CSS animations (no canvas, no WebGL)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
npm run build
npm start
```

---

## Project Structure

```
src/
  app/
    globals.css        # All aquarium CSS & animations
    layout.tsx
    page.tsx
  components/
    Aquarium.tsx       # Main game logic & state
    Fish.tsx           # Animated fish component
    Bubbles.tsx        # Ambient bubble system
    Seaweed.tsx        # Seaweed & coral decorations
    HUD.tsx            # Satoshi counter, ticker, shop button
    Shop.tsx           # Fish purchase panel
    Footer.tsx         # Footer with X link
```

---

## Author

Built by [@h1rdr3v2](https://x.com/h1rdr3v2) — for vibes only.
