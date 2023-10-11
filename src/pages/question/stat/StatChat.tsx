import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import useGetComponentsList from '@/hooks/useGetComponentsList'
import { getComponentStatService } from '@/services/stat'
import { getComponentConf } from '@/components/questionComponents'
import { Divider, Spin } from 'antd'

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const StatChart: FC<PropsType> = props => {
  const { id = '' } = useParams()
  const { selectedComponentType, selectedComponentId } = props
  const componentConf = getComponentConf(selectedComponentType)
  const [stat, setStat] = useState([])

  const { loading, run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(data) {
        const { stat } = data
        setStat(stat)
      },
    }
  )

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId])

  function getChartElem() {
    if (!selectedComponentType) return <div>暂未选中组件</div>
    if (!componentConf) return <div>该组件暂无统计图</div>
    const { StatComponent } = componentConf

    if (StatComponent == null) return <div>该组件暂无统计图</div>

    return <StatComponent stat={stat} />
  }

  return (
    <div style={{ width: '376px', height: '300px', outline: 'none' }}>
      {loading && (
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <Spin />
        </div>
      )}
      {!loading && getChartElem()}
    </div>
  )
}

export default StatChart
