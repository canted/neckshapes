import type { Meta, StoryObj } from '@storybook/react'
import { DotState } from '../models/patterns'
import { pentatonic } from '../data/patternSets/pentatonic'
import { FretboardGrid } from './FretboardGrid'

const meta: Meta<typeof FretboardGrid> = {
  title: 'Fretboard/FretboardGrid',
  component: FretboardGrid,
}

export default meta

type Story = StoryObj<typeof FretboardGrid>

export const Empty: Story = {
  args: {
    frets: 4,
  },
}

export const Position1: Story = {
  args: {
    frets: pentatonic.patterns[0].spanFrets,
    dots: pentatonic.patterns[0].positions,
  },
}

export const DotStates: Story = {
  args: {
    frets: 4,
    dotStates: [
      [DotState.Default, undefined, undefined, DotState.Selected],
      [undefined, DotState.Correct, undefined, undefined],
      [undefined, undefined, DotState.Incorrect, undefined],
      [DotState.Missing, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
    ],
  },
}
