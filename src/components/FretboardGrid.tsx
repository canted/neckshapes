type FretboardGridProps = {
  frets: number
}

const STRINGS = 6

export function FretboardGrid({ frets }: FretboardGridProps) {
  const columns = Array.from({ length: frets }, (_, i) => i + 1)
  const rows = Array.from({ length: STRINGS }, (_, i) => i)

  return (
    <div data-testid="fretboard-grid">
      {rows.map((stringIndex) => (
        <div key={stringIndex} data-testid="string-row">
          {columns.map((fretIndex) => (
            <div
              key={`${stringIndex}-${fretIndex}`}
              data-testid="fret-cell"
              data-string={stringIndex}
              data-fret={fretIndex}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
