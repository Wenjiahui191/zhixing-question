import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  return (
    <div>
      <div>QuestionLayout header</div>
      <div>
        <Outlet />
      </div>
      <div>QuestionLayout footer</div>
    </div>
  )
}

export default QuestionLayout
