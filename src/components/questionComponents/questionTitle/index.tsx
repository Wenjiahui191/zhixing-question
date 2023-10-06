import Component from './Component'
import { QuestionTitleDefaultProps } from './type'
import PropsComponent from './PropsComponent'

export * from './type'

export default {
  title: '标题',
  type: 'questionTitle',
  Component,
  PropsComponent,
  defaultProps: QuestionTitleDefaultProps,
}
