import type { Meta, StoryObj } from '@storybook/react'
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
