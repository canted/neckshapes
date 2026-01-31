import { FretboardGrid } from '../components/FretboardGrid'
import type { Pattern, PatternSet } from '../models/patterns'

type ViewerScreenProps = {
  patternSet: PatternSet
  pattern: Pattern
  onPrev: () => void
  onNext: () => void
  onSwitchMode?: () => void
}

export function ViewerScreen({
  patternSet,
  pattern,
  onPrev,
  onNext,
  onSwitchMode,
}: ViewerScreenProps) {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Viewer Mode
          </p>
          <h1 className="mt-3 text-3xl font-semibold">{patternSet.title}</h1>
          <p className="mt-2 text-lg text-slate-300">{pattern.title}</p>
        </header>

        <FretboardGrid frets={pattern.spanFrets} dots={pattern.positions} />

        <div className="flex flex-wrap items-center justify-center gap-3">
          {onSwitchMode ? (
            <button
              type="button"
              onClick={onSwitchMode}
              className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Recall
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
        </div>
      </main>
    </div>
  )
}
