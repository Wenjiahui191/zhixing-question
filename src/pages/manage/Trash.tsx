import React, { FC, useState } from 'react'
import { Button, Empty, Space, Table, Tag, Typography, Modal, message, Spin } from 'antd'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import useGetQuestionListData from '@/hooks/useGetQuestionListData'
import ListPagination from '@/components/ListPagination'
import { useRequest } from 'ahooks'
import { deleteQuestionService, updateQuestionService } from '@/services/question'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const { loading, data = {}, error, refresh } = useGetQuestionListData({ isDeleted: true })
  const { list = [], total } = data

  const { run: recoverHandler } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      onSuccess() {
        message.success('恢复成功')
        refresh()
        setSelectedIds([])
      },
    }
  )

  const delHandler = () => {
    confirm({
      title: '是否彻底删除选中问卷？',
      okText: '确认',
      cancelText: '取消',
      onOk: delQuestions,
    })
  }

  const { run: delQuestions } = useRequest(async () => await deleteQuestionService(selectedIds), {
    manual: true,
    onSuccess() {
      message.success('删除成功')
      refresh()
      setSelectedIds([])
    },
  })

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '发布状态',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷数量',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  const TableItem = (
    <>
      <div>
        <Space style={{ marginBottom: '16px' }}>
          <Button
            type="primary"
            onClick={recoverHandler}
            disabled={selectedIds.length === 0 ? true : false}
          >
            恢复
          </Button>
          <Button danger onClick={delHandler} disabled={selectedIds.length === 0 ? true : false}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
        style={{ marginBottom: '16px' }}
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <Title level={3} className={styles.left}>
          回收站
        </Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <Spin spinning={loading}>
        <div className={styles.content}>
          {list.length === 0 && !loading && <Empty description="暂无内容" />}
          {list.length > 0 && TableItem}
        </div>
        <div className={styles.footer}>
          <ListPagination total={total} />
        </div>
      </Spin>
    </>
  )
}

export default Trash
