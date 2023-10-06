/**
 * @description 获取用户token
 * @author wenjiahui
 */

const USER_TOKEN_KEY = 'USER_TOKEN'

export function getUserToken() {
  return localStorage.getItem(USER_TOKEN_KEY)
}

export function setUserToken(token: string) {
  localStorage.setItem(USER_TOKEN_KEY, token)
}

export function removeUserToken() {
  localStorage.removeItem(USER_TOKEN_KEY)
}
