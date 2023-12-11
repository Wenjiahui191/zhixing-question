import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import useGetQuestionListData from '@/hooks/useGetQuestionListData'
import ListPagination from '@/components/ListPagination'

const { Title } = Typography

const Star: FC = () => {
  const { loading, data = {}, error } = useGetQuestionListData({ isStar: true })
  const { list = [], total } = data

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
      <Spin spinning={loading}>
        <div className={styles.content}>
          {!list.length && <Empty />}
          {list.map((item: any) => {
            return <QuestionCard key={item._id} {...item} />
          })}
        </div>
        <div className={styles.footer}>
          <ListPagination total={total} />
        </div>
      </Spin>
    </>
  )
}

export default Star
