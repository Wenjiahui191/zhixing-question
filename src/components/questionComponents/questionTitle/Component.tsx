import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './type'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { title = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }

  return (
    <Title level={level} style={{ textAlign: isCenter ? 'center' : 'start' }}>
      {title}
    </Title>
  )
}

export default QuestionTitle
