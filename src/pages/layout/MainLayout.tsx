import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Button, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo'
import UserInfo from '../../components/UserInfo'
import styles from './MainLayout.module.scss'
import { useLoadUserData } from '@/hooks/useLoadUserData'
import useNavPage from '@/hooks/useNavPage'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  const nav = useNavigate()

  const { waitLoadUserData } = useLoadUserData()
  useNavPage(waitLoadUserData)

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.content}>
        <Content>
          {waitLoadUserData ? (
            <div className={styles.loading}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
      <Footer className={styles.footer}>智星问卷@2023 Design By wenjiahui</Footer>
    </Layout>
  )
}

export default MainLayout
