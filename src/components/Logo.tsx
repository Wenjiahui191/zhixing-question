import { Space, Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import LOGO from '../images/问卷星.svg'
import styles from './Logo.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useGetUserInfo } from '@/hooks/useGetUserInfo'
import { MANAGELIST_PATHNAME } from '@/router'

const { Title } = Typography
const Logo: FC = () => {
  const nav = useNavigate()
  const [pathname, setPathname] = useState('/')
  const { username } = useGetUserInfo()

  useEffect(() => {
    if (username) {
      setPathname(MANAGELIST_PATHNAME)
      return
    }
  }, [])

  return (
    <Link to={'/'}>
      <div className={styles.container}>
        <img className={styles.logo} src={LOGO} alt="" />
        <Title className={styles.them}>智星问卷</Title>
      </div>
    </Link>
  )
}

export default Logo
