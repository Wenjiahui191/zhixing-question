import { Form, Checkbox, Input, Select, Button, Space } from 'antd'
import React, { FC, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { OptionType, QuestionCheckboxPropsType } from './type'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const PropsComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [], onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, isVertical, list])

  function handleValuesChange() {
    if (onChange == null) return
    const formValue = form.getFieldsValue()

    const { list } = formValue
    if (list.length) {
      list.forEach((opt: OptionType) => {
        if (!opt.value) opt.value = nanoid(5)
      })
    }

    onChange(formValue)
  }

  return (
    <Form
      layout="vertical"
      onValuesChange={handleValuesChange}
      form={form}
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
    >
      <Form.Item
        label="多选标题"
        name="title"
        rules={[{ required: true, message: '多选标题不为空' }]}
      >
        <Input />
      </Form.Item>
      <Form.List name="list">
        {(fields, { add, remove }) => (
          <>
            {fields.map((item, index) => {
              const { key, name } = item
              return (
                <Space wrap align="baseline" key={key}>
                  <Form.Item name={[name, 'checked']} valuePropName="checked">
                    <Checkbox />
                  </Form.Item>
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '选项不能为空' },
                      () => ({
                        validator(_, value) {
                          let num = 0
                          list.forEach((opt: OptionType) => {
                            if (opt.text === value) num++
                          })
                          if (num > 1) {
                            return Promise.reject(new Error('不能存在相同选项'))
                          }
                          return Promise.resolve()
                        },
                      }),
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                </Space>
              )
            })}
            <Form.Item>
              <Button
                type="link"
                icon={<PlusOutlined />}
                block
                onClick={() => add({ text: '', value: '' })}
              >
                添加表单项
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>是否垂直排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
