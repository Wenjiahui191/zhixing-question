import React, { FC, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Button, Divider, Space, Spin, message } from 'antd'
import {
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import styles from './Manage.module.scss'
import { useRequest } from 'ahooks'
import { createQuestionService } from '@/services/question'
import { getUserToken } from '@/utils/user-token'
import { LOGIN_PATHNAME } from '@/router'
import { useLoadUserData } from '@/hooks/useLoadUserData'
import useNavPage from '@/hooks/useNavPage'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const { loading, run: handleCreateQuestion } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: result => {
      const { id = '' } = result
      if (id) {
        nav(`/question/edit/${id}`)
      }
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleCreateQuestion}
          disabled={loading}
        >
          新建问卷
        </Button>

        <Divider />
        <Space wrap>
          <Button
            type={pathname === '/manage/list' ? 'default' : 'text'}
            size="large"
            icon={<UnorderedListOutlined />}
            onClick={() => nav('list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname === '/manage/star' ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname === '/manage/trash' ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
