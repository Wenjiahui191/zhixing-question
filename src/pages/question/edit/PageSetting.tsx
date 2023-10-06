import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '@/store/pageReducer'

const { TextArea } = Input

const PageSetting: FC = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const pageInfo = useGetPageInfo()
  const { title, desc, js, css } = pageInfo

  useEffect(() => {
    form.setFieldsValue({ title, desc, js, css })
  }, [title, desc, js, css])

  function handleValuesChange() {
    const newPageInfo = form.getFieldsValue()

    dispatch(resetPageInfo(newPageInfo))
  }

  return (
    <Form
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={{ title, desc, js, css }}
      form={form}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <Input />
      </Form.Item>
      <Form.Item label="js" name="js">
        <TextArea />
      </Form.Item>
      <Form.Item label="css" name="css">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
