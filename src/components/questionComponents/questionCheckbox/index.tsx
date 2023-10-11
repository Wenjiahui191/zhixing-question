import Component from './Component'
import { QuestionCheckboxDefaultProps } from './type'
import PropsComponent from './PropsComponent'
import StatComponent from './StatComponent'

export * from './type'

export default {
  title: '复选组件',
  type: 'questionCheckbox',
  Component,
  PropsComponent,
  StatComponent,
  defaultProps: QuestionCheckboxDefaultProps,
}
