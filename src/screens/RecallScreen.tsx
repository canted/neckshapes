import { FretboardGrid } from '../components/FretboardGrid'
import type { Pattern, PatternSet } from '../models/patterns'
import { gradeRecall } from '../utils/gradeRecall'

type RecallScreenProps = {
  patternSet: PatternSet
  pattern: Pattern
  selected: Set<string>
  submitted: boolean
  onToggleCell: (stringIndex: number, fretIndex: number) => void
  onPaintCellAdd: (stringIndex: number, fretIndex: number) => void
  onPaintCellRemove: (stringIndex: number, fretIndex: number) => void
  onReset: () => void
  onSubmit: () => void
  onPrev: () => void
  onNext: () => void
  onSwitchMode?: () => void
}

export function RecallScreen({
  patternSet,
  pattern,
  selected,
  submitted,
  onToggleCell,
  onPaintCellAdd,
  onPaintCellRemove,
  onReset,
  onSubmit,
  onPrev,
  onNext,
  onSwitchMode,
}: RecallScreenProps) {
  const states = gradeRecall(pattern, selected, submitted)

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
        <header className="flex w-full flex-col items-center gap-6 text-center">
          {onSwitchMode ? (
            <div className="flex rounded-full border border-slate-700 bg-slate-900/60 p-1">
              <button
                type="button"
                onClick={onSwitchMode}
                className="rounded-full px-5 py-2 text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Review
              </button>
              <button
                type="button"
                className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-900"
              >
                Recall
              </button>
            </div>
          ) : null}
          <div>
            <h1 className="text-3xl font-semibold">{patternSet.title}</h1>
            <p className="mt-2 text-lg text-slate-300">{pattern.title}</p>
          </div>
        </header>

        <FretboardGrid
          frets={pattern.spanFrets}
          dotStates={states}
          onCellToggle={onToggleCell}
          onCellPaintAdd={onPaintCellAdd}
          onCellPaintRemove={onPaintCellRemove}
          interactive={!submitted}
        />

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={onNext}
            className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
          >
            Next
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  )
}
