import { ComponentConfType, ComponentGroup } from '@/components/questionComponents'
import React, { FC } from 'react'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'
import styles from './ComponentLab.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '@/store/componentsReducer'

const { Title } = Typography

function getComponent(c: ComponentConfType) {
  const dispatch = useDispatch()
  const { title, type, Component, defaultProps } = c

  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        isHidden: false,
        isLocked: false,
        props: defaultProps,
      })
    )
  }

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component {...defaultProps} />
      </div>
    </div>
  )
}

const ComponentLab: FC = () => {
  return (
    <div>
      {ComponentGroup.map(group => {
        const { title, id, children } = group
        return (
          <div key={id} className={styles['group-container']}>
            <Title level={3} style={{ fontSize: '16px' }}>
              {title}
            </Title>
            <div>{children.map(c => getComponent(c))}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ComponentLab
