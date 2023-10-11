import React, { FC, useState, MouseEvent, ChangeEvent } from 'react'
import useGetComponentsList from '@/hooks/useGetComponentsList'
import { Button, Input, Space, message } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import {
  changeComponentTitle,
  changeSelectedId,
  hideComponent,
  resetComponentList,
  toggleComponentLock,
} from '@/store/componentsReducer'
import SortableContainer from '@comp/dragSortable/SortableContainer'
import SortableItem from '@comp/dragSortable/SortableItem'
import styles from './Layers.module.scss'

const Layers: FC = () => {
  const dispatch = useDispatch()
  const { componentList, selectedId } = useGetComponentsList()
  const [currentSelectedId, setCurrentSelectedId] = useState('')

  // 点击选中标题
  function handleClickTitle(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.warning('隐藏的组件不可选中')
      return
    }

    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id))
      setCurrentSelectedId('')
      return
    }

    setCurrentSelectedId(fe_id)
  }

  // 修改标题
  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle || !changeSelectedId) return

    dispatch(changeComponentTitle({ fe_id: currentSelectedId, newTitle }))
  }

  //   显示/隐藏
  function handleHide(fe_id: string, isHidden: boolean) {
    dispatch(hideComponent({ fe_id, isHidden: !isHidden }))
  }

  // 锁定/解锁
  function handleLock(fe_id: string) {
    dispatch(toggleComponentLock({ fe_id }))
  }

  // 拖拽结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    console.log('DragEnd', oldIndex, newIndex)
    dispatch(resetComponentList({ oldIndex, newIndex }))
  }

  const componentListWithId = componentList.map(item => {
    return {
      ...item,
      id: item.fe_id,
    }
  })

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map(c => {
        const { fe_id, title, type, isHidden, isLocked } = c

        const defaultWapperClass = styles.wrapper
        const selectedWrapperClass = styles.selected
        const wrapperClass = classnames({
          [defaultWapperClass]: true,
          [selectedWrapperClass]: selectedId === fe_id,
        })

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div key={fe_id} className={wrapperClass}>
              <div className={styles.title} onClick={() => handleClickTitle(fe_id)}>
                {currentSelectedId && currentSelectedId === fe_id && selectedId === fe_id ? (
                  <Input
                    autoFocus
                    value={title}
                    onPressEnter={() => setCurrentSelectedId('')}
                    onBlur={() => setCurrentSelectedId('')}
                    onChange={e => handleTitleChange(e)}
                  />
                ) : (
                  title
                )}
              </div>
              <div className={styles.btn}>
                <Space>
                  <Button
                    type={isHidden ? 'primary' : 'default'}
                    shape="circle"
                    icon={<EyeInvisibleOutlined />}
                    onClick={() => handleHide(fe_id, isHidden)}
                  ></Button>
                  <Button
                    type={isLocked ? 'primary' : 'default'}
                    shape="circle"
                    icon={<LockOutlined />}
                    onClick={() => handleLock(fe_id)}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
