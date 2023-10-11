import Component from './Component'
import PropsComponent from './PropsComponent'
import StatComponent from './StatComponent'
import { QuestionRadioDefaultProps } from './type'

export * from './type'

export default {
  title: '单选组件',
  type: 'questionRadio',
  Component,
  PropsComponent,
  StatComponent,
  defaultProps: QuestionRadioDefaultProps,
}
