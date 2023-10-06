import Component from './Component'
import PropsComponent from './PropsComponent'
import { QuestionDescribeDefaultProps } from './type'

export * from './type'

export default {
  title: '问卷信息',
  type: 'questionDescribe',
  Component,
  PropsComponent,
  defaultProps: QuestionDescribeDefaultProps,
}
