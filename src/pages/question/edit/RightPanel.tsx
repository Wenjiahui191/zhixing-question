import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import React, { FC, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import ComponentProps from './ComponentProps'
import useGetComponentsList from '@/hooks/useGetComponentsList'
import PageSetting from './PageSetting'

// 枚举tab类型
enum TAB_KEYS {
  PROPS_KEY = 'props',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROPS_KEY)
  const { selectedId } = useGetComponentsList()

  useEffect(() => {
    if (!selectedId) {
      setActiveKey(TAB_KEYS.SETTING_KEY)
    } else {
      setActiveKey(TAB_KEYS.PROPS_KEY)
    }
  }, [selectedId])

  const TabItems = [
    {
      key: TAB_KEYS.PROPS_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProps />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          设置
        </span>
      ),
      children: <PageSetting />,
    },
  ]

  return (
    <div>
      <Tabs
        items={TabItems}
        activeKey={activeKey}
        onTabClick={(key: string) => setActiveKey(key as TAB_KEYS)}
      />
    </div>
  )
}

export default RightPanel
