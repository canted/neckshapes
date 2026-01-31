import type { Meta, StoryObj } from '@storybook/react'
import { pentatonic } from '../data/patternSets/pentatonic'
import { RecallScreen } from './RecallScreen'

const meta: Meta<typeof RecallScreen> = {
  title: 'Screens/RecallScreen',
  component: RecallScreen,
}

export default meta

type Story = StoryObj<typeof RecallScreen>

const selected = new Set(['0:1', '1:1', '2:3', '3:2', '4:4'])

export const Default: Story = {
  args: {
    patternSet: pentatonic,
    pattern: pentatonic.patterns[0],
    selected,
    submitted: false,
    onToggleCell: () => {},
    onPaintCellAdd: () => {},
    onPaintCellRemove: () => {},
    onReset: () => {},
    onSubmit: () => {},
    onPrev: () => {},
    onNext: () => {},
  },
}

export const Submitted: Story = {
  args: {
    patternSet: pentatonic,
    pattern: pentatonic.patterns[0],
    selected,
    submitted: true,
    onToggleCell: () => {},
    onPaintCellAdd: () => {},
    onPaintCellRemove: () => {},
    onReset: () => {},
    onSubmit: () => {},
    onPrev: () => {},
    onNext: () => {},
  },
}
