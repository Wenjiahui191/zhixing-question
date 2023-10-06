import React, { FC } from 'react'
import EditCanvas from './EditCanvas'
import useGetQuestionData from '@/hooks/useLoadQuestionData'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '@/store/componentsReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'

const Edit: FC = () => {
  const dispatch = useDispatch()
  const { loading, error } = useGetQuestionData()

  function cancelSelected() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <EditHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles['canvas-wrapper']} onClick={cancelSelected}>
            <div className={styles.canvas}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
