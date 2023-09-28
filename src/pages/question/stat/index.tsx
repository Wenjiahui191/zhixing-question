import useGetQuestionData from '@/hooks/useGetQuestionData'
import React, { FC } from 'react'

const Stat: FC = () => {
  const { loading, data, error } = useGetQuestionData()

  return (
    <div>
      <div>{loading ? 'loading...' : JSON.stringify(data)}</div>
    </div>
  )
}

export default Stat
