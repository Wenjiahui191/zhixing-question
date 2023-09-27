import { Button, Result } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { HOME_PATHNAME } from '../router'
import styles from './NotFound.module.scss'

const NotFound: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在."
        extra={
          <Button type="primary" onClick={() => nav(HOME_PATHNAME)}>
            返回首页
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
