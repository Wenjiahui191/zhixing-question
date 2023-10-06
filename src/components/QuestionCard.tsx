import React, { FC, useState } from 'react'
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
import { useRequest } from 'ahooks'
import { duplicationQuestionService, updateQuestionService } from '@/services/question'

const { confirm } = Modal

type QuestionItem = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  isDeleted: boolean
}

const Card: FC<QuestionItem> = (props: QuestionItem) => {
  const { title, isPublished, answerCount, createdAt, _id, isStar, isDeleted } = props
  const [isStarState, setisStarState] = useState(isStar)
  const [isDeletedState, setIsDeletedState] = useState(isDeleted)
  const nav = useNavigate()

  const { loading: copyLoading, run: duplicateQuestion } = useRequest(
    async () => await duplicationQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success('复制问卷成功')
        nav(`/question/edit/${result.id}`)
      },
    }
  )

  // 标星
  const { loading: starLoading, run: setQuestionStar } = useRequest(
    async () => await updateQuestionService(_id, { isStar: !isStarState }),
    {
      manual: true,
      onSuccess() {
        setisStarState(!isStarState)
        message.success('标星成功')
      },
    }
  )

  const delHandle = () => {
    confirm({
      title: '是否删除该问卷？',
      okText: '确认',
      cancelText: '取消',
      onOk: delQuestion,
    })
  }

  // 删除
  const { loading: delLoading, run: delQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isStar: !isDeletedState }),
    {
      manual: true,
      onSuccess() {
        setIsDeletedState(!isDeletedState)
        message.success('删除')
      },
    }
  )

  if (isDeletedState) {
    return null
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Space>
              {isStarState ? <StarFilled style={{ color: '#0099ff' }} /> : ''}
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
              <Button
                type="text"
                size="small"
                icon={<StarOutlined />}
                disabled={starLoading}
                onClick={setQuestionStar}
              >
                {isStarState ? '取消标星' : '标星'}
              </Button>
              <Popconfirm
                title="提示"
                description="是否复制该问卷？"
                onConfirm={duplicateQuestion}
                okText="确认"
                cancelText="取消"
              >
                <Button type="text" size="small" disabled={copyLoading} icon={<CopyOutlined />}>
                  复制
                </Button>
              </Popconfirm>

              <Button
                type="text"
                size="small"
                icon={<DeleteOutlined />}
                disabled={delLoading}
                onClick={delHandle}
              >
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
