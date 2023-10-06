import { getUserInfoService } from '@/services/user'
import { useRequest } from 'ahooks'
import { useState, useEffect } from 'react'
import { useGetUserInfo } from './useGetUserInfo'
import { useDispatch } from 'react-redux'
import { loginReducer } from '@/store/userReducer'

export function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitLoadUserData, setWaitLoadUserData] = useState(true)
  const { username } = useGetUserInfo()

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    debounceWait: 500,
    onSuccess(result) {
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
