import React, { FC, useState } from 'react'
import styles from './index.module.scss'
import StatHeader from './StatHeader'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { Button, Result, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import ComponentList from './ComponentList'
import PageStat from './PageStat'
import StatChart from './StatChat'

const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  function getContentElement() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="问卷信息不存在"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          />
        </div>
      )
    }

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <StatChart
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    )
  }

  const LoadingElement = (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <Spin />
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <StatHeader />
      </div>
      <div className={styles['content-wrapper']}>
        {loading && LoadingElement}
        {!loading && <div className={styles.content}>{getContentElement()}</div>}
      </div>
    </div>
  )
}

export default Stat
