import React, { FC } from 'react'
import { QuestionDescribePropsType, QuestionDescribeDefaultProps } from './type'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

const Component: FC<QuestionDescribePropsType> = (props: QuestionDescribePropsType) => {
  const { title, desc } = { ...QuestionDescribeDefaultProps, ...props }

  const descList = desc.split('\n')

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px', marginBottom: '0' }}>{title}</Title>
      <Paragraph>
        {descList.map((t, index) => {
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
    </div>
  )
}

export default Component
