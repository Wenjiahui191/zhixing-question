import { LIST_PAGE_SIZE, LIST_SEARCH_PAGE_KEY, LIST_SEARCH_PAGE_SIZE_KEY } from '@/constants'
import { Pagination } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PaginationType = {
  total: number
}

const ListPagination: FC<PaginationType> = (props: PaginationType) => {
  const { total } = props
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  function handleChangePage(page: number, pageSize: number) {
    searchParams.set(LIST_SEARCH_PAGE_KEY, page.toString())
    searchParams.set(LIST_SEARCH_PAGE_SIZE_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }

  useEffect(() => {
    const currentPage = parseInt(searchParams.get(LIST_SEARCH_PAGE_KEY) || '') || 1
    setPage(currentPage)
    const currentPageSize = parseInt(searchParams.get(LIST_SEARCH_PAGE_SIZE_KEY) || '') || 10
    setPageSize(currentPageSize)
  }, [searchParams])

  return (
    <Pagination
      current={page}
      total={total}
      pageSize={pageSize}
      onChange={handleChangePage}
      hideOnSinglePage={true}
    />
  )
}

export default ListPagination
