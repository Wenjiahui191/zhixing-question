import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { LOGIN_PATHNAME } from '../router'

const UserInfo: FC = () => {
  const nav = useNavigate()

  return (
    <>
      <Button type="primary" color="#fff" onClick={() => nav(LOGIN_PATHNAME)}>
        登录
      </Button>
    </>
  )
}

export default UserInfo
