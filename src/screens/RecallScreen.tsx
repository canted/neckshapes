import { FretboardGrid } from '../components/FretboardGrid'
import type { Pattern, PatternSet } from '../models/patterns'
import { gradeRecall } from '../utils/gradeRecall'

type RecallScreenProps = {
  patternSet: PatternSet
  pattern: Pattern
  selected: Set<string>
  submitted: boolean
  onToggleCell: (stringIndex: number, fretIndex: number) => void
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
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Recall Mode
          </p>
          <h1 className="mt-3 text-3xl font-semibold">{patternSet.title}</h1>
          <p className="mt-2 text-lg text-slate-300">{pattern.title}</p>
        </header>

        <FretboardGrid
          frets={pattern.spanFrets}
          dotStates={states}
          onCellClick={onToggleCell}
        />

        <div className="flex flex-wrap items-center justify-center gap-3">
          {onSwitchMode ? (
            <button
              type="button"
              onClick={onSwitchMode}
              className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Viewer
            </button>
          ) : null}
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
