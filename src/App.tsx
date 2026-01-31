import { useMemo, useState } from 'react'
import { patternSets } from './data/patternSets'
import { RecallScreen } from './screens/RecallScreen'
import { ViewerScreen } from './screens/ViewerScreen'
import './App.css'

type Mode = 'viewer' | 'recall'

function App() {
  const activeSet = useMemo(() => patternSets[0], [])
  const [patternIndex, setPatternIndex] = useState(0)
  const [mode, setMode] = useState<Mode>('viewer')
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const [submitted, setSubmitted] = useState(false)
  const patterns = activeSet.patterns
  const pattern = patterns[patternIndex]

  const clearSelection = () => {
    setSelected(new Set())
    setSubmitted(false)
  }

  const goPrev = () => {
    clearSelection()
    setPatternIndex((current) =>
      current === 0 ? patterns.length - 1 : current - 1,
    )
  }
  const goNext = () => {
    clearSelection()
    setPatternIndex((current) =>
      current === patterns.length - 1 ? 0 : current + 1,
    )
  }

  const handleSelect = (stringIndex: number, fretIndex: number) => {
    const key = `${stringIndex}:${fretIndex}`
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const handlePaintAdd = (stringIndex: number, fretIndex: number) => {
    const key = `${stringIndex}:${fretIndex}`
    setSelected((current) => {
      if (current.has(key)) return current
      const next = new Set(current)
      next.add(key)
      return next
    })
  }

  const handlePaintRemove = (stringIndex: number, fretIndex: number) => {
    const key = `${stringIndex}:${fretIndex}`
    setSelected((current) => {
      if (!current.has(key)) return current
      const next = new Set(current)
      next.delete(key)
      return next
    })
  }

  const submitRecall = () => setSubmitted(true)

  return mode === 'viewer' ? (
    <ViewerScreen
      patternSet={activeSet}
      pattern={pattern}
      onPrev={goPrev}
      onNext={goNext}
      onSwitchMode={() => {
        setMode('recall')
        clearSelection()
      }}
    />
  ) : (
    <RecallScreen
      patternSet={activeSet}
      pattern={pattern}
      selected={selected}
      submitted={submitted}
      onToggleCell={handleSelect}
      onPaintCellAdd={handlePaintAdd}
      onPaintCellRemove={handlePaintRemove}
      onReset={clearSelection}
      onSubmit={submitRecall}
      onPrev={goPrev}
      onNext={goNext}
      onSwitchMode={() => {
        setMode('viewer')
        clearSelection()
      }}
    />
  )
}

export default App
