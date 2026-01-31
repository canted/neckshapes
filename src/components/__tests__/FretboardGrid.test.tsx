import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FretboardGrid } from '../FretboardGrid'

describe('FretboardGrid', () => {
  it('renders a 6xN grid of fret cells', () => {
    const frets = 4
    render(<FretboardGrid frets={frets} />)

    const cells = screen.getAllByTestId('fret-cell')
    expect(cells).toHaveLength(6 * frets)
  })
})
