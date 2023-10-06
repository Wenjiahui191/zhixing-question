import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import ComponentLab from './ComponentLab'
import { Tabs } from 'antd'
import Layers from './Layers'

enum TAB_KEYS {
  LAB_KEYS = 'componentLab',
  LAYER_KEYS = 'layer',
}

const LeftPanel: FC = () => {
  const TabItems = [
    {
      key: TAB_KEYS.LAB_KEYS,
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: <ComponentLab />,
    },
    {
      key: TAB_KEYS.LAYER_KEYS,
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <Layers />,
    },
  ]

  return (
    <div>
      <Tabs items={TabItems} defaultActiveKey={TAB_KEYS.LAB_KEYS} />
    </div>
  )
}

export default LeftPanel
