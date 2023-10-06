import React, { FC } from 'react'
import { Form, Space, Typography, Input, Button, message } from 'antd'
import styles from './Register.module.scss'
import { UsergroupAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { registerService } from '@/services/user'

const { Title } = Typography

const Register: FC = () => {
  const nav = useNavigate()

  function onFinish(values: any) {
    run(values)
  }

  const { run } = useRequest(
    async values => {
      const data = await registerService(values)
      return data
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功')
        nav(LOGIN_PATHNAME)
      },
    }
  )

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UsergroupAddOutlined />
          </Title>
          <Title level={2}>用户注册</Title>
        </Space>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
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
          <Form.Item
            label="确认密码"
            name="confirm"
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不一致'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 20 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有帐号，去登陆</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
