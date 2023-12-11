import { createBrowserRouter } from 'react-router-dom'
import React, { lazy } from 'react'

import MainLayout from '../pages/layout/MainLayout'
import ManageLayout from '../pages/layout/ManageLayout'
import QuestionLayout from '../pages/layout/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import List from '../pages/manage/List'
import Star from '../pages/manage/Star'
import Trash from '../pages/manage/Trash'
// import Edit from '../pages/question/edit'
// import Stat from '../pages/question/stat'

const Edit = lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/question/edit'))
const Stat = lazy(() => import(/* webpackChunkName: "statPage" */ '../pages/question/stat'))

const routers = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit',
        element: <Edit />,
      },
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
])

export default routers

/* 路径常量 */
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const HOME_PATHNAME = '/'
export const MANAGELIST_PATHNAME = '/manage/list'

// 判断是否在注册或登录页面
export function isLoginOrRegisterPage(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
  return false
}

// 判断在需要登录
export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
  return false
}
