import React, { FC, useMemo } from 'react'
import { QuestionRadioStatPropsType } from './type'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CHART_COLOR_LAB } from '@/constants'

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat }) => {
  const sum = useMemo(() => {
    let num = 0
    stat.forEach(i => {
      num += i.count
    })
    return num
  }, [stat])

  function format(count: number) {
    return ((count / sum) * 100).toFixed(2)
  }

  return (
    <ResponsiveContainer height="100%" width="100%">
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          outerRadius={80}
          data={stat}
          dataKey="count"
          nameKey="name"
          fill={'#8884d8'}
          label={i => `${i.name}:${format(i.count)}%`}
        >
          {stat.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLOR_LAB[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${format(value)}%`} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default StatComponent
