import React, { FC } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { QuestionCheckboxStatPropsType } from './type'

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({ stat }) => {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <BarChart data={stat}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default StatComponent
