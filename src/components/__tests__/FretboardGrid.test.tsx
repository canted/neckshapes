import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { PatternPositions } from '../../models/patterns'
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
})
