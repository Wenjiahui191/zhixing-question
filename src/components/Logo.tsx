import { Space, Typography } from 'antd'
import React, { FC } from 'react'
import LOGO from '../images/问卷星.svg'
import styles from './Logo.module.scss'
import { Link, useNavigate } from 'react-router-dom'

const { Title } = Typography
const Logo: FC = () => {
  const nav = useNavigate()

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
