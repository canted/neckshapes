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
        <header className="flex w-full flex-col items-center gap-6 text-center">
          {onSwitchMode ? (
            <div className="flex rounded-full border border-slate-700 bg-slate-900/60 p-1">
              <button
                type="button"
                className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-900"
              >
                Review
              </button>
              <button
                type="button"
                onClick={onSwitchMode}
                className="rounded-full px-5 py-2 text-sm font-semibold text-slate-300 transition hover:text-white"
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

        <FretboardGrid frets={pattern.spanFrets} dots={pattern.positions} />

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
        </div>
      </main>
    </div>
  )
}
