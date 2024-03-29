export type OptionType = {
  text: string
  value: string
  checked: boolean
}

export type QuestionCheckboxPropsType = {
  title?: string
  list?: OptionType[]
  isVertical?: boolean

  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean
}

export const QuestionCheckboxDefaultProps = {
  title: '多选标题',
  isVertical: false,
  list: [
    { text: '选项1', value: 'item1', checked: false },
    { text: '选项2', value: 'item2', checked: false },
    { text: '选项3', value: 'item3', checked: false },
  ],
}

export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}

export const QuestionCheckboxStatDefaultProps = {
  stat: [],
}
