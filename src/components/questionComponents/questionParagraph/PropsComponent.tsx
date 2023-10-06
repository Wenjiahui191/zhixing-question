import React, { FC, useEffect } from 'react'
import { Checkbox, Form, Input } from 'antd'
import { QuestionParagraphPropsType } from './type'

const { TextArea } = Input

const PropsComponents: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { title, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title })
  }, [title])

  function handleChangeProps() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      onValuesChange={handleChangeProps}
      initialValues={{ title }}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="文本内容"
        name="title"
        rules={[{ required: true, message: '文本内容不为空' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>是否居中</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponents
