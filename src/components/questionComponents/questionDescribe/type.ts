export type QuestionDescribePropsType = {
  title?: string
  desc?: string

  // PropsComponent使用的属性
  onChange?: (newProps: QuestionDescribePropsType) => void
  disabled?: boolean
}

export const QuestionDescribeDefaultProps = {
  title: '问卷标题',
  desc: '问卷的描述',
}
