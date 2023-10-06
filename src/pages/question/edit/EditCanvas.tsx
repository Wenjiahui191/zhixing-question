import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import useGetComponentsList from '@/hooks/useGetComponentsList'
import { ComponentInfoType, changeSelectedId, resetComponentList } from '@/store/componentsReducer'
import { getComponentConf } from '@/components/questionComponents'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import useCanvasKeyPress from '@/hooks/useCanvasKeyPress'
import SortableContainer from '@comp/dragSortable/SortableContainer'
import SortableItem from '@comp/dragSortable/SortableItem'
import styles from './EditCanvas.module.scss'

type PropsType = {
  loading: boolean
}

function getComponent(c: ComponentInfoType) {
  const { type, props } = c
  const ComponentConf = getComponentConf(type)

  if (!ComponentConf) return null
  const { Component } = ComponentConf

  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const dispatch = useDispatch()
  const { componentList, selectedId } = useGetComponentsList()

  function handleSelect(event: MouseEvent, id: string) {
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  // 监听画布键盘事件，快捷操作
  useCanvasKeyPress()

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '40px' }}>
        <Spin />
      </div>
    )
  }

  // 拖拽结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(resetComponentList({ oldIndex, newIndex }))
  }

  const componentListWithId = componentList.map(item => {
    return {
      ...item,
      id: item.fe_id,
    }
  })

  return (
    <div className={styles.container} id="canvas_container">
      <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id, isLocked } = c

            const defaultWapperClass = styles['component-wrapper']
            const selectedClass = styles['selected']
            const lockedClass = styles['locked']
            const wrapperClass = classnames({
              [defaultWapperClass]: true,
              [selectedClass]: fe_id === selectedId,
              [lockedClass]: isLocked,
            })

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClass} onClick={e => handleSelect(e, fe_id)}>
                  <div className={styles.component}>{getComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </SortableContainer>
    </div>
  )
}

export default EditCanvas
