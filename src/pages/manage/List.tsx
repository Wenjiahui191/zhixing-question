import React, { FC } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { Spin, Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_WORD } from '@/constants'
import { useInfiniteScroll, useDebounceFn } from 'ahooks'
import { getQuestionListService } from '@/services/question'

const { Title } = Typography

const List: FC = () => {
  const [searchParams] = useSearchParams()

  async function handleLoadMore() {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_WORD) || ''
    const data = await getQuestionListService({ keyword })

    const { list = [], total } = data
    return { list, total }
  }

  const { data, loading, loadingMore, noMore } = useInfiniteScroll(handleLoadMore, {
    target: document,
    isNoMore: d => d?.list.length > d?.total,
    reloadDeps: [searchParams],
  })

  const { list = [] } = data || {}

  return (
    <>
      <div className={styles.header}>
        <Title level={3} className={styles.left}>
          我的问卷
        </Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <Spin tip="Loading..." spinning={loading}>
        <div className={styles.content}>
          {list.map((item: any) => {
            return <QuestionCard key={item._id} {...item} />
          })}
          <div className={styles.footer}>{loadingMore && <Spin />}</div>
          <div className={styles.footer}>{noMore && '加载完毕'}</div>
        </div>
        <div className={styles.footer}>{/* <ListPagination total={total} /> */}</div>
      </Spin>
    </>
  )
}

export default List
