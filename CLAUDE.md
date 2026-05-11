# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Near-Earth Object (NEO) & Space Weather Tracker — a React portfolio dashboard consuming two NASA free APIs:

- **NASA NeoWs** (`https://api.nasa.gov/neo/rest/v1/feed`) — asteroid close approaches by date range
- **NASA DONKI** (`https://api.nasa.gov/DONKI/`) — geomagnetic storms, solar flares, CMEs

API key is free from [https://api.nasa.gov](https://api.nasa.gov) with a 1,000 calls/day limit. Store it in `.env` as `VITE_NASA_API_KEY` (never commit `.env`).

## Commands

Once scaffolded with Vite:

```
npm run dev       # start dev server (localhost:5173)
npm run build     # production build
npm run preview   # preview production build locally
npm run lint      # ESLint
```

## Architecture

This is a single-page React app (Vite + React). Planned structure:

```
src/
  api/          # NASA API fetch functions (neows.js, donki.js)
  components/   # Reusable UI: cards, charts, filters, timeline
  pages/        # Dashboard page(s)
  hooks/        # Custom hooks for data fetching (useNeoWs, useDonki)
  utils/        # Date helpers, unit conversions (km→miles, size formatting)
```

**Data flow**: custom hooks call `src/api/` functions → transform raw NASA JSON → pass to components as props. No global state manager; React state + context is sufficient.

**Key NASA response shapes:**
- NeoWs `/feed?start_date=&end_date=&api_key=` → `near_earth_objects` keyed by date, each entry has `name`, `estimated_diameter`, `close_approach_data[].miss_distance`, `close_approach_data[].relative_velocity`, `is_potentially_hazardous_asteroid`
- DONKI endpoints return arrays of event objects with `startTime`, `linkedEvents`, and event-specific fields (e.g., `kpIndex` for geomagnetic storms)

## Key Design Decisions

- Date range for NeoWs is capped at **7 days per request** by the API.
- Hazardous asteroids (`is_potentially_hazardous_asteroid: true`) should be visually distinguished (color/icon).
- Size comparisons should normalize `estimated_diameter.kilometers` min/max into a relative visual scale.
- DONKI event types to support: `GST` (geomagnetic storm), `FLR` (solar flare), `CME` (coronal mass ejection).
