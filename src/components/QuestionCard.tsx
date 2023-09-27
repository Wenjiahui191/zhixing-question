import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Divider, Popconfirm, Space, Tag, message, Modal } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

const { confirm } = Modal

type QuestionItem = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const Card: FC<QuestionItem> = (props: QuestionItem) => {
  const { title, isPublished, answerCount, createdAt, _id, isStar } = props

  const nav = useNavigate()

  const copyHandle = () => {
    message.success('复制成功')
  }

  const delHandle = () => {
    confirm({
      title: '是否删除该问卷？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        message.success('删除成功')
      },
    })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Space>
              {isStar ? <StarFilled style={{ color: '#0099ff' }} /> : ''}
              <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
                {title}
              </Link>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
              <span>答卷：{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider
          style={{
            margin: '20px 0',
          }}
        />
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <Space>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                type="text"
                size="small"
                icon={<LineChartOutlined />}
                onClick={() => nav(`/question/stat/${_id}`)}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button type="text" size="small" icon={<StarOutlined />}>
                标星
              </Button>
              <Popconfirm
                title="提示"
                description="是否复制该问卷？"
                onConfirm={copyHandle}
                okText="确认"
                cancelText="取消"
              >
                <Button type="text" size="small" icon={<CopyOutlined />}>
                  复制
                </Button>
              </Popconfirm>

              <Button type="text" size="small" icon={<DeleteOutlined />} onClick={delHandle}>
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
