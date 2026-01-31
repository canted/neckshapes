export type StringIndex = 0 | 1 | 2 | 3 | 4 | 5;

// Fret index is 1-based within the current pattern span (e.g., 1..N)
export type FretIndex = number;

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
  title: string;
  positions: PatternPositions;
  spanFrets: number;
  // Offset from Position 1, used to align overlapping positions
  offsetFromPosition1: number;
}

export interface PatternSet {
  id: string;
  title: string;
  description?: string;
  patterns: Pattern[];
}
