import type { PatternSet } from "../../models/patterns";

export const pentatonic: PatternSet = {
  id: "pentatonic",
  title: "Pentatonic",
  patterns: [
    {
      id: "pentatonic-position-1",
      title: "Position 1",
      spanFrets: 4,
      positions: [
        [1, 4],
        [1, 4],
        [1, 3],
        [1, 3],
        [1, 3],
        [1, 4],
      ],
    },
    {
      id: "pentatonic-position-2",
      title: "Position 2",
      spanFrets: 4,
      positions: [
        [2, 4],
        [2, 4],
        [1, 3],
        [1, 4],
        [1, 4],
        [2, 4],
      ],
    },
    {
      id: "pentatonic-position-3",
      title: "Position 3",
      spanFrets: 5,
      positions: [
        [2, 4],
        [2, 5],
        [1, 4],
        [2, 4],
        [2, 4],
        [2, 4],
      ],
    },
    {
      id: "pentatonic-position-4",
      title: "Position 4",
      spanFrets: 4,
      positions: [
        [1, 4],
        [2, 4],
        [1, 3],
        [1, 3],
        [1, 4],
        [1, 4],
      ],
    },
    {
      id: "pentatonic-position-5",
      title: "Position 5",
      spanFrets: 4,
      positions: [
        [2, 4],
        [2, 4],
        [1, 4],
        [1, 4],
        [2, 4],
        [2, 4],
      ],
    },
  ],
};
