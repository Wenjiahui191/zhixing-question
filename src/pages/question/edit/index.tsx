import useGetQuestionData from '@/hooks/useGetQuestionData'
import React, { FC } from 'react'

const Edit: FC = () => {
  const { loading, data, error } = useGetQuestionData()

  return (
    <div>
      <div>{loading ? 'loading...' : JSON.stringify(data)}</div>
    </div>
  )
}

export default Edit
