import React, { FC } from 'react'
import { QuestionRadioPropsType, QuestionRadioDefaultProps, OptionType } from './type'
import { Typography, Radio, Space } from 'antd'

const { Paragraph } = Typography

const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, optionList, isVertical, value } = { ...QuestionRadioDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space wrap direction={isVertical ? 'vertical' : 'horizontal'}>
          {optionList.map((opt: OptionType) => {
            const { text, value } = opt
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default Component
