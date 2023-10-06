import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionDescribePropsType } from './type'

const { TextArea } = Input

const PropsComponents: FC<QuestionDescribePropsType> = (props: QuestionDescribePropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  function handleChangeProps() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      onValuesChange={handleChangeProps}
      initialValues={{ title, desc }}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropsComponents
