import { Form, Checkbox, Input, Select, Button, Space } from 'antd'
import React, { FC, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { OptionType, QuestionRadioPropsType } from './type'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const PropsComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, value, isVertical, optionList = [], onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, value, isVertical, optionList })
  }, [title, value, isVertical, optionList])

  function handleValuesChange() {
    if (onChange == null) return
    const formValue = form.getFieldsValue()

    const { optionList } = formValue
    if (optionList.length) {
      optionList.forEach((opt: OptionType) => {
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
      initialValues={{ title, value, isVertical, optionList }}
      disabled={disabled}
    >
      <Form.Item
        label="单选标题"
        name="title"
        rules={[{ required: true, message: '单选标题不为空' }]}
      >
        <Input />
      </Form.Item>
      <Form.List name="optionList">
        {(fields, { add, remove }) => (
          <>
            {fields.map((item, index) => {
              const { key, name } = item
              return (
                <Space wrap align="baseline" key={key}>
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '选项不能为空' },
                      () => ({
                        validator(_, value) {
                          let num = 0
                          optionList.forEach((opt: OptionType) => {
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
                  {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
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
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={optionList.map(({ text, value }) => ({ lable: text || '', value }))}
        />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>是否垂直排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
