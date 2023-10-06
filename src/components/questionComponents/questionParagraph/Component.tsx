import React, { FC } from 'react'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './type'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { title, isCenter } = { ...QuestionParagraphDefaultProps, ...props }

  const textList = title.split('\n')

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start' }}>
      {textList.map((t, index) => {
        if (index > 0) {
          return (
            <span key={index}>
              <br />
              {t}
            </span>
          )
        }
        return <span key={index}>{t}</span>
      })}
    </Paragraph>
  )
}

export default Component
