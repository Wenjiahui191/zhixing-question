export type OptionType = {
  text: string
  value: string
}

export type QuestionRadioPropsType = {
  title?: string
  optionList?: OptionType[]
  isVertical?: boolean
  value?: string

  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps = {
  title: '单选标题',
  isVertical: false,
  value: '',
  optionList: [
    { text: '选项1', value: 'item1' },
    { text: '选项2', value: 'item2' },
    { text: '选项3', value: 'item3' },
  ],
}
