import { DotState, type Pattern } from '../models/patterns'

export function gradeRecall(
  pattern: Pattern,
  selected: Set<string>,
  submitted: boolean,
) {
  const expected = new Set<string>()
  pattern.positions.forEach((frets, stringIndex) => {
    frets.forEach((fretIndex) => {
      expected.add(`${stringIndex}:${fretIndex}`)
    })
  })

  const states: (DotState | undefined)[][] = Array.from({ length: 6 }, () =>
    Array.from({ length: pattern.spanFrets }, () => undefined),
  )

  if (!submitted) {
    selected.forEach((key) => {
      const [stringIndex, fretIndex] = key.split(':').map(Number)
      states[stringIndex][fretIndex - 1] = DotState.Selected
    })
    return states
  }

  for (let stringIndex = 0; stringIndex < 6; stringIndex += 1) {
    for (let fretIndex = 1; fretIndex <= pattern.spanFrets; fretIndex += 1) {
      const key = `${stringIndex}:${fretIndex}`
      const isSelected = selected.has(key)
      const isExpected = expected.has(key)
      if (isSelected && isExpected) {
        states[stringIndex][fretIndex - 1] = DotState.Correct
      } else if (isSelected && !isExpected) {
        states[stringIndex][fretIndex - 1] = DotState.Incorrect
      } else if (!isSelected && isExpected) {
        states[stringIndex][fretIndex - 1] = DotState.Missing
      }
    }
  }

  return states
}
