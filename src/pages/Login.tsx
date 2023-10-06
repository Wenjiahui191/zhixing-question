import React, { FC, useEffect } from 'react'
import styles from './Login.module.scss'
import { Form, Space, Typography, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { MANAGELIST_PATHNAME, REGISTER_PATHNAME } from '../router'
import { loginService } from '@/services/user'
import { useRequest } from 'ahooks'
import { setUserToken } from '@/utils/user-token'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KY = 'PASSWORD'

// 存储用户信息
function saveUserInfoToStorage(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KY, password)
}
// 销毁用户信息
function removeUserInfoFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KY)
}
// 获取用户信息
function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KY),
  }
}

const Login: FC = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()

  function onFinish(values: any) {
    const { username, password, remember } = values
    run(username, password)
    if (remember) {
      saveUserInfoToStorage(username, password)
    } else {
      removeUserInfoFromStorage()
    }
  }

  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result
        setUserToken(token)

        message.success('登录成功')
        nav(MANAGELIST_PATHNAME)
      },
    }
  )

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage() || {}
    form.setFieldsValue({ username, password })
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserOutlined />
          </Title>
          <Title level={2}>登录</Title>
        </Space>
      </div>
      <div>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 16, message: '长度在5-16之间' },
              { pattern: /^[0-9a-zA-Z_]{1,}$/, message: '只允许字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
