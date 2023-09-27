import { Input } from 'antd'
import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_WORD } from '../constants'

const { Search } = Input

const ListSearch: FC = () => {
  const [value, setValue] = useState('')
  const { pathname } = useLocation()
  const nav = useNavigate()

  //  设置搜索参数到输入框
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const searchVal = searchParams.get(LIST_SEARCH_PARAM_WORD) || ''
    setValue(searchVal)
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_WORD}=${value}`,
    })
  }

  return (
    <>
      <Search
        allowClear
        value={value}
        placeholder="输入问卷标题"
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ width: 200 }}
      />
    </>
  )
}

export default ListSearch
