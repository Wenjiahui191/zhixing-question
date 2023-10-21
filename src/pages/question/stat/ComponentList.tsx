import React, { FC } from 'react'
import styles from './Component.module.scss'
import classnames from 'classnames'
import useGetComponentsList from '@/hooks/useGetComponentsList'
import { getComponentConf } from '@/components/questionComponents'
import { ComponentInfoType } from '@/store/componentsReducer'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (fe_id: string) => void
  setSelectedComponentType: (type: string) => void
}

function getComponent(c: ComponentInfoType) {
  const { type, props } = c
  const ComponentConf = getComponentConf(type)

  if (!ComponentConf) return null
  const { Component } = ComponentConf

  return <Component {...props} />
}

const ComponentList: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { componentList = [] } = useGetComponentsList()

  return (
    <>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, isLocked, type } = c

          const defaultWapperClass = styles['component-wrapper']
          const selectedClass = styles['selected']
          const lockedClass = styles['locked']
          const wrapperClass = classnames({
            [defaultWapperClass]: true,
            [selectedClass]: fe_id === selectedComponentId,
            [lockedClass]: isLocked,
          })

          return (
            <div
              key={fe_id}
              className={wrapperClass}
              onClick={() => {
                setSelectedComponentId(fe_id)
                setSelectedComponentType(type)
              }}
            >
              <div className={styles.component}>{getComponent(c)}</div>
            </div>
          )
        })}
    </>
  )
}

export default ComponentList
