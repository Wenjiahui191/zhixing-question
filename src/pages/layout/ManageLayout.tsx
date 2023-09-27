import React, { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Button, Divider, Space } from 'antd'
import {
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import styles from './Manage.module.scss'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => nav('/question/edit')}
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
