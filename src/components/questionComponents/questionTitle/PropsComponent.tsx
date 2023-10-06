import React, { FC, useEffect } from 'react'
import { Checkbox, Form, Input, Select } from 'antd'
import { QuestionTitlePropsType } from './type'

const PropsComponents: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { title, level, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, level, isCenter })
  }, [title, level, isCenter])

  function handleChangeProps() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      onValuesChange={handleChangeProps}
      initialValues={{ title, level, isCenter }}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
            { value: 4, text: 4 },
            { value: 5, text: 5 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>是否居中</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponents
