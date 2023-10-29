import { getUserInfoService } from '@/services/user'
import { useRequest } from 'ahooks'
import { useState, useEffect } from 'react'
import { useGetUserInfo } from './useGetUserInfo'
import { useDispatch } from 'react-redux'
import { loginReducer } from '@/store/userReducer'
import { useLocation } from 'react-router-dom'

export function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitLoadUserData, setWaitLoadUserData] = useState(true)
  const { username } = useGetUserInfo()

  const { run, loading } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      console.log(result)
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitLoadUserData(false)
    },
  })

  useEffect(() => {
    if (username) {
      setWaitLoadUserData(false)
      return
    }
    run()
  }, [username])

  return { waitLoadUserData }
}
