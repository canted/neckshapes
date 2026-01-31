import { useRef } from 'react'
import { DotState, type PatternPositions } from '../models/patterns'

type FretboardGridProps = {
  frets: number
  dots?: PatternPositions
  dotStates?: (DotState | undefined)[][]
  onCellToggle?: (stringIndex: number, fretIndex: number) => void
  onCellPaintAdd?: (stringIndex: number, fretIndex: number) => void
  onCellPaintRemove?: (stringIndex: number, fretIndex: number) => void
  interactive?: boolean
}

const STRINGS = 6

export function FretboardGrid({
  frets,
  dots,
  dotStates,
  onCellToggle,
  onCellPaintAdd,
  onCellPaintRemove,
  interactive = true,
}: FretboardGridProps) {
  const columns = Array.from({ length: frets }, (_, i) => i + 1)
  const rows = Array.from({ length: STRINGS }, (_, i) => i)
  const isPaintingRef = useRef(false)
  const paintModeRef = useRef<'add' | 'remove' | null>(null)
  const getState = (stringIndex: number, fretIndex: number) =>
    dotStates?.[stringIndex]?.[fretIndex - 1]

  const getDotClasses = (state?: DotState) => {
    if (!state || state === DotState.Default) {
      return 'bg-emerald-400'
    }

    if (state === DotState.Selected) {
      return 'bg-slate-500 ring-[5px] ring-emerald-300/90'
    }

    if (state === DotState.Correct) {
      return 'bg-emerald-400'
    }

    if (state === DotState.Incorrect) {
      return 'bg-rose-500'
    }

    return 'bg-transparent ring-0'
  }

  const getDotSizeClasses = (state?: DotState) =>
    state === DotState.Selected ? 'h-[1.3125rem] w-[1.3125rem]' : 'h-7 w-7'

  return (
    <div
      data-testid="fretboard-grid"
      className="inline-flex flex-col gap-0 rounded-xl bg-slate-900/90 p-4 shadow-lg"
      onPointerUp={() => {
        isPaintingRef.current = false
        paintModeRef.current = null
      }}
      onPointerLeave={() => {
        isPaintingRef.current = false
        paintModeRef.current = null
      }}
      onPointerCancel={() => {
        isPaintingRef.current = false
        paintModeRef.current = null
      }}
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
            const state = getState(stringIndex, fretIndex)
            const showDot =
              dots?.[stringIndex]?.includes(fretIndex) || state !== undefined
            return (
              <button
                type="button"
                key={`${stringIndex}-${fretIndex}`}
                data-testid="fret-cell"
                data-string={stringIndex}
                data-fret={fretIndex}
                onPointerDown={(event) => {
                  if (!interactive) return
                  if (event.button !== 0) return
                  isPaintingRef.current = true
                  const currentState = getState(stringIndex, fretIndex)
                  const isSelected = currentState === DotState.Selected
                  paintModeRef.current = isSelected ? 'remove' : 'add'
                  onCellToggle?.(stringIndex, fretIndex)
                }}
                onPointerEnter={() => {
                  if (!interactive) return
                  if (!isPaintingRef.current) return
                  if (paintModeRef.current === 'remove') {
                    onCellPaintRemove?.(stringIndex, fretIndex)
                  } else {
                    onCellPaintAdd?.(stringIndex, fretIndex)
                  }
                }}
                className={[
                  'relative h-8 w-24 bg-slate-800/70',
                  'border-l border-slate-600/80',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300/80',
                  isLast ? 'border-r border-slate-600/80' : '',
                ].join(' ')}
              >
                {showDot ? (
                  <>
                    <div
                      data-testid="fret-dot"
                      data-state={state ?? DotState.Default}
                      className={[
                        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
                        getDotSizeClasses(state),
                        getDotClasses(state),
                      ].join(' ')}
                    />
                    {state === DotState.Missing ? (
                      <span className="pointer-events-none absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-dotted border-rose-400/90" />
                    ) : null}
                    {state === DotState.Incorrect ? (
                      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] text-[1.375rem] font-bold leading-none text-slate-900/90">
                        ×
                      </span>
                    ) : null}
                  </>
                ) : null}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
