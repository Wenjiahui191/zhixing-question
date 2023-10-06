import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './questionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './questionTitle'
import QuestionDescribeConf, { QuestionDescribePropsType } from './questionDescribe'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './questionParagraph'
import QuestionTextAreaConf, { QuestionTextAreaPropsType } from './questionTextArea'
import QuestionRadioConf, { QuestionRadioPropsType } from './questionRadio'
import QuestionCheckboxConf, { QuestionCheckboxPropsType } from './questionCheckbox'

// 组件属性 type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionDescribePropsType &
  QuestionParagraphPropsType &
  QuestionTextAreaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType
// 组件配置 type
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropsComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 组件列表
const ComponentConfList: ComponentConfType[] = [
  QuestionTitleConf,
  QuestionInputConf,
  QuestionDescribeConf,
  QuestionParagraphConf,
  QuestionTextAreaConf,
  QuestionCheckboxConf,
  QuestionRadioConf,
]

// 根据type获取当前组件的配置
export function getComponentConf(type: string) {
  return ComponentConfList.find(c => c.type === type)
}

export const ComponentGroup = [
  {
    id: 'componentText',
    title: '文本显示',
    children: [QuestionDescribeConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    id: 'componentInput',
    title: '用户输入',
    children: [QuestionInputConf, QuestionTextAreaConf, QuestionRadioConf, QuestionCheckboxConf],
  },
]
