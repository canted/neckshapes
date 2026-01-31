import type { PatternPositions } from '../models/patterns'

type FretboardGridProps = {
  frets: number
  dots?: PatternPositions
}

const STRINGS = 6

export function FretboardGrid({ frets, dots }: FretboardGridProps) {
  const columns = Array.from({ length: frets }, (_, i) => i + 1)
  const rows = Array.from({ length: STRINGS }, (_, i) => i)

  return (
    <div
      data-testid="fretboard-grid"
      className="inline-flex flex-col gap-0 rounded-xl bg-slate-900/90 p-4 shadow-lg"
    >
      {rows.map((stringIndex) => (
        <div
          key={stringIndex}
          data-testid="string-row"
          className="relative flex items-center"
        >
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-slate-300/90" />
          {columns.map((fretIndex) => {
            const isLast = fretIndex === frets
            return (
              <div
                key={`${stringIndex}-${fretIndex}`}
                data-testid="fret-cell"
                data-string={stringIndex}
                data-fret={fretIndex}
                className={[
                  'relative h-8 w-24 bg-slate-800/70',
                  'border-l border-slate-600/80',
                  isLast ? 'border-r border-slate-600/80' : '',
                ].join(' ')}
              >
                {dots?.[stringIndex]?.includes(fretIndex) ? (
                  <div
                    data-testid="fret-dot"
                    className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_0_2px_rgba(15,23,42,0.7)]"
                  />
                ) : null}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
