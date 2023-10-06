import React, { FC } from 'react'
import styles from './index.module.scss'
import StatHeader from './StatHeader'

const Stat: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <StatHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>左侧</div>
          <div className={styles.main}>中间</div>
          <div className={styles.right}>右侧</div>
        </div>
      </div>
    </div>
  )
}

export default Stat
