import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layout/MainLayout'
import ManageLayout from '../layout/ManageLayout'
import Home from '../Home'
import Login from '../Login'
import Register from '../Register'
import NotFound from '../NotFound'
import Edit from '../question/edit'
import Stat from '../question/stat'
import Star from '../manage/Star'
import Trash from '../manage/Trash'
import List from '../manage/List'
import QuestionLayout from '../layout/QuestionLayout'

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
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
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
