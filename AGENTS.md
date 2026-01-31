# AGENTS.md

## Project summary
A small mobile-first, client-only web app (PWA) to help guitarists memorize fretboard patterns (e.g., five-position systems). The app renders patterns on a 6‑string fretboard grid with a configurable number of frets (default 4), supports multiple display states for dots (training vs. quiz feedback), and can later add quizzes and spaced‑repetition style drills. Built in TypeScript with Vite and hosted on GitHub Pages. Data lives in local memory (no progress persistence yet).

## Tech stack
- TypeScript
- Vite (PWA-friendly setup)
- Vitest
- React
- Tailwind
- Client-only (no backend)
- Hosting target: GitHub Pages
- Data: in‑memory + optional localStorage for persistence

## Development approach
test driven development
ask clarifying questions as needed, multiple choice or open ended

## Core concepts
- **Fretboard grid:** 6 strings × N frets (N is configurable; start with 4).
- **Pattern:** a named set of valid finger positions for each string.
- **Pattern set / collection:** a named grouping (e.g., “Minor Pentatonic – 5 Positions”) containing multiple patterns.
- **Dot states:** visual states for a position (e.g., default/training, user-selected, correct, incorrect, missing).

## Data model (initial sketch)
```ts
// String order: high e -> low E, index 0..5 (low E is last)
export type StringIndex = 0 | 1 | 2 | 3 | 4 | 5;

// Fret index is 1-based within the current pattern span (e.g., 1..N)
export type FretIndex = number;

// For each string, list valid fret positions
export type PatternPositions = [
  FretIndex[],
  FretIndex[],
  FretIndex[],
  FretIndex[],
  FretIndex[],
  FretIndex[]
];

export interface Pattern {
  id: string;
  title: string; // e.g., "Position 1"
  positions: PatternPositions;
  spanFrets: number; // N, default 4, can vary later
  // Offset from Position 1, used to align overlapping positions
  // (e.g., offset 2 means fret 1 here maps to fret 3 in Position 1)
  offsetFromPosition1: number;
}

export interface PatternSet {
  id: string;
  title: string; // e.g., "Minor Pentatonic (5 Positions)"
  description?: string;
  patterns: Pattern[];
}
```

## UI / UX phases (draft)
1. **Viewer mode:** Show pattern dots and title, swipe/next through patterns.
2. **Reveal mode:** Show dots, hide title until reveal.
3. **Recall mode (quiz):** Show title, user taps fret positions, submit; show correct/incorrect feedback.

## Minimal screen flow (draft)
1. **Home / Set picker**
   - Choose a scale/pattern set (e.g., “Minor Pentatonic – 5 Positions”).
   - Primary actions: Start Viewer, Start Reveal, Start Recall.
2. **Viewer**
   - Shows pattern title + fretboard with dots.
   - Controls: Previous/Next, Random, Switch mode.
3. **Reveal (gradual)**
   - Shows fretboard with dots; title hidden.
   - A reveal button sits below each fret column; tapping reveals all dots in that column.
   - Reveal buttons clearly indicate “Reveal” mode.
   - Reveal buttons support paint activation (tap and swipe across columns to reveal multiple).
   - Controls: Reveal title, Previous/Next, Switch mode.
4. **Recall (Quiz)**
   - Shows title; empty fretboard.
   - User taps to toggle dots.
   - Submit shows: correct (green), incorrect (red), missing (outline).
   - Controls: Reset, Submit, Next.

## Rendering rules (draft)
- Board has 6 horizontal strings and N vertical frets.
- Each fret position can render a dot with state styling:
  - `default` (training)
  - `selected` (user input)
  - `correct`
  - `incorrect`
  - `missing`
 - Low E renders at the bottom.

## Dot state enum + render rules (draft)
```ts
export enum DotState {
  Default = "default",
  Selected = "selected",
  Correct = "correct",
  Incorrect = "incorrect",
  Missing = "missing",
}
```

Render rules
- **Default:** solid dark dot; used in Viewer and Reveal for revealed columns.
- **Selected:** solid neutral dot with a subtle ring/highlight; used for user input before grading.
- **Correct:** solid green dot; used after submit for correct user selections.
- **Incorrect:** solid red dot with an “X” overlay (shape + label); used after submit for incorrect selections.
- **Missing:** hollow dot (ring/outline) with a faint “+” overlay; used after submit for expected positions the user did not select.
- **Reveal mode:** only revealed columns show dots; unrevealed columns show empty cells.
- **Recall mode (pre-submit):** only `Selected` dots render; no correctness colors.
- **Post-submit:** render `Correct`, `Incorrect`, and `Missing` together; keep `Selected` only for correct/incorrect mapping (not visually distinct).

## Clarified requirements
- String ordering: low E at the bottom; low E is last in arrays.
- Fret indexing: relative to the pattern span (1..N within the pattern).
- Dot states: support both `missing` and `incorrect`.
- Input method: tap‑to‑toggle.
- Pattern data: TypeScript modules.
- PWA: offline caching enabled.
- Persistence: no progress persistence yet.
- Initial scope: multiple scales at launch.
- Accessibility: use colors plus shapes/labels (color‑blind safe).

## Non-goals (for v1)
- No server or user accounts.
- No audio playback or MIDI.
- No advanced analytics.

## Repo conventions
- Keep rendering logic separate from data definitions.
- Avoid hard‑coding the number of frets; use the pattern’s `spanFrets`.
- Keep UI state (viewer/reveal/quiz) isolated from data models.

## A color palette

{ 'bubblegum_pink': { DEFAULT: '#ef476f', 100: '#390511', 200: '#720a22', 300: '#ac0f34', 400: '#e51445', 500: '#ef476f', 600: '#f26d8c', 700: '#f591a9', 800: '#f9b6c5', 900: '#fcdae2' }, 'golden_pollen': { DEFAULT: '#ffd166', 100: '#473200', 200: '#8f6400', 300: '#d69600', 400: '#ffbc1f', 500: '#ffd166', 600: '#ffda85', 700: '#ffe3a3', 800: '#ffedc2', 900: '#fff6e0' }, 'emerald': { DEFAULT: '#06d6a0', 100: '#012b20', 200: '#02563f', 300: '#03805f', 400: '#04ab7f', 500: '#06d6a0', 600: '#1cf9be', 700: '#55fbce', 800: '#8efcdf', 900: '#c6feef' }, 'ocean_blue': { DEFAULT: '#118ab2', 100: '#031b23', 200: '#073747', 300: '#0a526a', 400: '#0d6e8e', 500: '#118ab2', 600: '#18b5e9', 700: '#51c8ef', 800: '#8bdaf4', 900: '#c5edfa' }, 'dark_teal': { DEFAULT: '#073b4c', 100: '#010c0f', 200: '#03171e', 300: '#04232d', 400: '#062e3c', 500: '#073b4c', 600: '#0e7699', 700: '#16b3e7', 800: '#62cdf0', 900: '#b1e6f8' } }

## Font
Host Grotesk

## Design vibe
vibrant, playful, clean. Non-white background.
