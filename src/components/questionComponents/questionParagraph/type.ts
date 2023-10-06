export type QuestionParagraphPropsType = {
  title?: string
  isCenter?: boolean

  // PropsComponent使用的属性
  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}

export const QuestionParagraphDefaultProps = {
  title: '这是一个段落',
}
