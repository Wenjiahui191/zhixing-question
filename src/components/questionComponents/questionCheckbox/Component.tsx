import React, { FC } from 'react'
import { QuestionCheckboxPropsType, QuestionCheckboxDefaultProps, OptionType } from './type'
import { Typography, Space, Checkbox } from 'antd'

const { Paragraph } = Typography

const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, list, isVertical } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space wrap direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((opt: OptionType) => {
          const { text, value } = opt
          return <Checkbox key={value}>{text}</Checkbox>
        })}
      </Space>
    </div>
  )
}

export default Component
