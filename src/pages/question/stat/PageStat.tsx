import React, { FC, useState } from 'react'
import { Pagination, Spin, Table, Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getStatListService } from '@/services/stat'
import { useParams } from 'react-router-dom'
import useGetComponentsList from '@/hooks/useGetComponentsList'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (fe_id: string) => void
  setSelectedComponentType: (type: string) => void
}

const PageStat: FC<PropsType> = props => {
  const { selectedComponentId, setSelectedComponentType, setSelectedComponentId } = props

  const { id = '' } = useParams()
  const { componentList } = useGetComponentsList()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { loading, data = {} } = useRequest(
    async () =>
      await getStatListService(id, {
        page,
        pageSize,
      }),
    { debounceWait: 100, refreshDeps: [page, pageSize] }
  )
  const { total = 0, list = [] } = data

  const columns = componentList.map(c => {
    const { fe_id, title, props, type } = c

    const tableTitle = props!.title || title
    return {
      dataIndex: fe_id,
      title: (
        <span
          style={{
            color: fe_id === selectedComponentId ? '#0099ff' : 'inherit',
            cursor: 'pointer',
          }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          {tableTitle}
        </span>
      ),
      key: fe_id,
    }
  })

  const tableElement = (
    <>
      <Table dataSource={list} columns={columns} rowKey="_id" pagination={false} />
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={current => setPage(current)}
          onShowSizeChange={(current, size) => {
            setPage(current)
            setPageSize(size)
          }}
        />
      </div>
    </>
  )

  return (
    <Spin spinning={loading}>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {!loading && tableElement}
    </Spin>
  )
}

export default PageStat
