import type { Meta, StoryObj } from '@storybook/react'

import QuestionInput from '../../components/questionComponents/questionInput/Component'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'QuestionInput',
  component: QuestionInput,
} satisfies Meta<typeof QuestionInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const SetProps: Story = {
  args: {
    title: 'woc',
    placeholder: 'fuck',
  },
}
