import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionInputDefaultProps, QuestionInputPropsType } from './type'

const { Paragraph } = Typography

const QuesitonInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong style={{ marginBottom: '5px' }}>
        {title}
      </Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuesitonInput
