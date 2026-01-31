import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DotState, type PatternPositions } from '../../models/patterns'
import { FretboardGrid } from '../FretboardGrid'

describe('FretboardGrid', () => {
  it('renders a 6xN grid of fret cells', () => {
    const frets = 4
    render(<FretboardGrid frets={frets} />)

    const cells = screen.getAllByTestId('fret-cell')
    expect(cells).toHaveLength(6 * frets)
  })

  it('renders dots for provided positions', () => {
    const frets = 4
    const dots: PatternPositions = [
      [1, 4],
      [1, 4],
      [1, 3],
      [1, 3],
      [1, 3],
      [1, 4],
    ]

    render(<FretboardGrid frets={frets} dots={dots} />)

    const dotCount = dots.reduce((sum, positions) => sum + positions.length, 0)
    const renderedDots = screen.getAllByTestId('fret-dot')
    expect(renderedDots).toHaveLength(dotCount)
  })

  it('renders dot states when provided', () => {
    const frets = 4
    const dotStates = [
      [DotState.Default, undefined, undefined, DotState.Selected],
      [undefined, DotState.Correct, undefined, undefined],
      [undefined, undefined, DotState.Incorrect, undefined],
      [DotState.Missing, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
    ]

    render(<FretboardGrid frets={frets} dotStates={dotStates} />)

    const dots = screen.getAllByTestId('fret-dot')
    const states = dots.map((dot) => dot.getAttribute('data-state'))
    expect(states).toEqual(
      expect.arrayContaining([
        DotState.Default,
        DotState.Selected,
        DotState.Correct,
        DotState.Incorrect,
        DotState.Missing,
      ]),
    )
  })
})
