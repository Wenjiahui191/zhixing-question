import { useEffect } from 'react'
import { useGetUserInfo } from './useGetUserInfo'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LOGIN_PATHNAME,
  MANAGELIST_PATHNAME,
  isLoginOrRegisterPage,
  isNoNeedUserInfo,
} from '@/router'

export default function useNavPage(waitLoadUserData: boolean) {
  const nav = useNavigate()
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  useEffect(() => {
    if (waitLoadUserData) return
    //已登录
    if (username) {
      if (isLoginOrRegisterPage(pathname)) {
        nav(MANAGELIST_PATHNAME)
      }
      return
    }
    //   未登录 在不需要登录的页面
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [username, pathname, waitLoadUserData])
}
