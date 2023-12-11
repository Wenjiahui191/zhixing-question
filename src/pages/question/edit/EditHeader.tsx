import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button, Input, Space, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckOutlined, EditOutlined, LeftOutlined } from '@ant-design/icons'
import EditToolbar from './EditToolbar'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '@/store/pageReducer'
import styles from './EditHeader.module.scss'
import useGetComponentsList from '@/hooks/useGetComponentsList'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '@/services/question'

const { Title } = Typography

// 顶部标题
const TitleButton: FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [editStatus, setEditStatus] = useState(false)

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }

  if (editStatus) {
    return (
      <Input
        value={title}
        autoFocus
        onChange={e => handleTitleChange(e)}
        onPressEnter={() => setEditStatus(false)}
        onBlur={() => setEditStatus(false)}
      />
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button type="text" icon={<EditOutlined />} onClick={() => setEditStatus(true)} />
    </Space>
  )
}

// 保存按钮
const SaveButton: FC = () => {
  const pageInfo = useGetPageInfo()
  const { componentList } = useGetComponentsList()
  const { id } = useParams()

  const { loading, run } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    { manual: true }
  )

  // 保存快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) run()
  })

  // 监听修改自动保存
  useDebounceEffect(
    () => {
      run()
    },
    [pageInfo, componentList],
    { wait: 2000 }
  )

  return (
    <Button icon={<CheckOutlined />} disabled={loading} onClick={run}>
      保存
    </Button>
  )
}

// 发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate()
  const pageInfo = useGetPageInfo()
  const { componentList } = useGetComponentsList()
  const { id } = useParams()

  const { loading, run } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav(`/question/stat/${id}`, { replace: true })
      },
    }
  )
  return (
    <Button type="primary" disabled={loading} onClick={run}>
      发布
    </Button>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleButton />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
