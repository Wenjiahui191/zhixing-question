import { useLoadUserData } from '@/hooks/useLoadUserData'
import useNavPage from '@/hooks/useNavPage'
import { Spin } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  const { waitLoadUserData } = useLoadUserData()
  useNavPage(waitLoadUserData)

  return (
    <div>
      <div>
        {waitLoadUserData ? (
          <div style={{ textAlign: 'center', paddingTop: '100px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}

export default QuestionLayout
