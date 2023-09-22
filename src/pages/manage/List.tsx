import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './List.module.scss'

const rowQuestionList = [
  {
    id: 'q1',
    title: '问卷1',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '3月13 下午6点10分',
  },
  {
    id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createdAt: '2月22 下午4点11分',
  },
  {
    id: 'q3',
    title: '问卷3',
    isPublished: true,
    isStar: false,
    answerCount: 0,
    createdAt: '5月11 上午8点10分',
  },
  {
    id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: true,
    answerCount: 9,
    createdAt: '3月13 上午6点10分',
  },
]

const List: FC = () => {
  const [questionList, setQuestionList] = useState(rowQuestionList)

  return (
    <>
      <div className={styles.header}>
        <h3 className={styles.left}>问卷列表</h3>
        <div className={styles.right}>【搜索】</div>
      </div>
      <div className={styles.content}>
        {questionList.map(item => {
          return <QuestionCard key={item.id} {...item} />
        })}
      </div>
      <div className={styles.footer}>底部</div>
    </>
  )
}

export default List
