import { useMemo, useState } from 'react'
import { FretboardGrid } from './components/FretboardGrid'
import { patternSets } from './data/patternSets'
import './App.css'

function App() {
  const activeSet = useMemo(() => patternSets[0], [])
  const [patternIndex, setPatternIndex] = useState(0)
  const patterns = activeSet.patterns
  const pattern = patterns[patternIndex]

  const goPrev = () =>
    setPatternIndex((current) =>
      current === 0 ? patterns.length - 1 : current - 1,
    )
  const goNext = () =>
    setPatternIndex((current) =>
      current === patterns.length - 1 ? 0 : current + 1,
    )

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Viewer Mode
          </p>
          <h1 className="mt-3 text-3xl font-semibold">{activeSet.title}</h1>
          <p className="mt-2 text-lg text-slate-300">{pattern.title}</p>
        </header>

        <FretboardGrid frets={pattern.spanFrets} dots={pattern.positions} />

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="rounded-full border border-slate-700 px-6 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={goNext}
            className="rounded-full bg-emerald-400 px-6 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
