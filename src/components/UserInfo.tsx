import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { getUserInfoService } from '@/services/user'
import { removeUserToken } from '@/utils/user-token'
import { useGetUserInfo } from '@/hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '@/store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const { username, nickname } = useGetUserInfo()

  function logout() {
    removeUserToken()
    dispatch(logoutReducer())
    message.success('退出登陆成功')
    nav(LOGIN_PATHNAME)
  }

  const User = (
    <>
      <UserOutlined />
      {nickname}
      <Button type="text" style={{ color: '#fff' }} onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = (
    <Button type="primary" color="#fff" onClick={() => nav(LOGIN_PATHNAME)}>
      登录
    </Button>
  )

  return <div>{username ? User : Login}</div>
}

export default UserInfo
