import type { Meta, StoryObj } from '@storybook/react'
import { pentatonic } from '../data/patternSets/pentatonic'
import { ViewerScreen } from './ViewerScreen'

const meta: Meta<typeof ViewerScreen> = {
  title: 'Screens/ViewerScreen',
  component: ViewerScreen,
}

export default meta

type Story = StoryObj<typeof ViewerScreen>

export const Default: Story = {
  args: {
    patternSet: pentatonic,
    pattern: pentatonic.patterns[0],
    onPrev: () => {},
    onNext: () => {},
  },
}
