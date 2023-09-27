import { message } from 'antd'
import axios from 'axios'

const instance = axios.create({
  timeout: 10 * 1000,
})

// 添加响应拦截器
instance.interceptors.response.use(res => {
  const resData = res.data
  const { errno, data, msg } = resData as ResType

  if (errno !== 0) {
    if (msg) message.error(msg)

    throw new Error(msg)
  }

  return data as any
})

export default instance

export type ResType = {
  errno: number
  data: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
