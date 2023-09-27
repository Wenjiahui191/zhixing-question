import React, { FC, useState } from 'react'
import { Button, Empty, Space, Table, Tag, Typography, Modal, message } from 'antd'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography
const { confirm } = Modal

const rowQuestionList = [
  {
    _id: '1',
    title: '问卷1',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '3月13 下午6点10分',
  },
  {
    _id: '2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createdAt: '2月22 下午4点11分',
  },
]

const Trash: FC = () => {
  const [questionList, setQuestionList] = useState(rowQuestionList)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const recoverHandler = () => {}

  const delHandler = () => {
    confirm({
      title: '是否彻底删除选中问卷？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        message.success('删除成功')
        setSelectedIds([])
      },
    })
  }

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
        dataSource={rowQuestionList}
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
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无内容" />}
        {questionList.length > 0 && TableItem}
      </div>
      <div className={styles.footer}>底部</div>
    </>
  )
}

export default Trash
