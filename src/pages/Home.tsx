import React, { FC, useEffect } from 'react'
import { Button, Typography } from 'antd'
import styles from './Home.module.scss'
import { MANAGELIST_PATHNAME } from '../router'
import { useNavigate } from 'react-router-dom'
// import Lottie from '@comp/Lottie'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.title}>
          <Title>问卷调查 | 在线投票</Title>
          <Paragraph>累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
        </div>
        <div>
          <Button type="primary" size="large" onClick={() => nav(MANAGELIST_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
      {/* <Lottie /> */}
    </div>
  )
}

export default Home
