import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography

const rowQuestionList = [
  {
    _id: '2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createdAt: '2月22 下午4点11分',
  },
  {
    _id: '3',
    title: '问卷3',
    isPublished: true,
    isStar: true,
    answerCount: 0,
    createdAt: '5月11 上午8点10分',
  },
  {
    _id: '4',
    title: '问卷4',
    isPublished: false,
    isStar: true,
    answerCount: 9,
    createdAt: '3月13 上午6点10分',
  },
]

const Star: FC = () => {
  const [questionList, setQuestionList] = useState(rowQuestionList)

  return (
    <>
      <div className={styles.header}>
        <Title level={3} className={styles.left}>
          星标问卷
        </Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.map(item => {
          return <QuestionCard key={item._id} {...item} />
        })}
      </div>
      <div className={styles.footer}>底部</div>
    </>
  )
}

export default Star
