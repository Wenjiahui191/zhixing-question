import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionTextAreaPropsType, QuestionTextAreaDefaultProps } from './type'

const { Paragraph } = Typography
const { TextArea } = Input

const QuesitonInput: FC<QuestionTextAreaPropsType> = (props: QuestionTextAreaPropsType) => {
  const { title, placeholder } = { ...QuestionTextAreaDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong style={{ marginBottom: '5px' }}>
        {title}
      </Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuesitonInput
