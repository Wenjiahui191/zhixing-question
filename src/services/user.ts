import { useRequest } from 'ahooks'
import axios, { ResDataType, ResType } from './axios'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info'
  const data = (await axios.get(url)) as ResDataType

  return data
}

// 注册
export async function registerService(opt: {
  username: string
  password: string
  nickname?: string
}): Promise<ResDataType> {
  const url = '/api/user/register'
  const { username, password, nickname = username } = opt
  const data = (await axios.post(url, { username, password, nickname })) as ResDataType

  return data
}

// 登录
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = '/api/user/login'
  const data = (await axios.post(url, { username, password })) as ResDataType

  return data
}
