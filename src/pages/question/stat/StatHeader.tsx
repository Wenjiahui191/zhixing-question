import React, { FC, useRef, useState } from 'react'
import { Typography, Space, Button, Input, Tooltip, Popover, InputRef, message } from 'antd'
import styles from './StatHeader.module.scss'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { useNavigate, useParams } from 'react-router-dom'
import QrCode from 'qrcode.react'

const { Title } = Typography

const QrCodeComponent: FC = () => {
  const { id } = useParams()
  const inputRef = useRef<InputRef>(null)
  const { isPublished } = useGetPageInfo()
  const url = `http://localhost:3000/question/${id}`

  const handleCopy = () => {
    const iptElem = inputRef.current
    iptElem?.select()

    document.execCommand('copy')
    message.success('拷贝成功')
  }

  if (!isPublished) return null

  const QrcodeElement = (
    <>
      <QrCode value={url} size={150} style={{ textAlign: 'center' }} />
    </>
  )

  return (
    <div>
      <Space>
        <Input value={url} ref={inputRef} />
        <Tooltip title="拷贝链接">
          <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
        </Tooltip>
        <Popover placement="bottom" content={QrcodeElement}>
          <Button shape="circle" icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    </div>
  )
}

const StateHeader: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { title } = useGetPageInfo()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <QrCodeComponent />
        </div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StateHeader
