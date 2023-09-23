import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'
type QuestionItem = {
  id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const Card: FC<QuestionItem> = (props: QuestionItem) => {
  const { title, isPublished, answerCount, createdAt } = props

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <a href="#">{title}</a>
          </div>
          <div className={styles.right}>
            {isPublished ? <span>已发布</span> : <span>未发布</span>}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </div>
        </div>
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <button>编辑问卷</button>
            <button>数据统计</button>
          </div>
          <div className={styles.right}>
            <button>标星</button>
            <button>复制</button>
            <button>删除</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
